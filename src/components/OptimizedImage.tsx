import React from 'react';
import { Box, SxProps, Theme } from '@mui/material';

interface OptimizedImageProps {
  src: string; // Base image name without extension
  alt: string;
  sx?: SxProps<Theme>;
  height?: string | number;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({ src, alt, sx, height = '280px' }) => {
  const baseName = src.replace(/\.[^/.]+$/, ""); // Remove extension
  
  return (
    <Box
      component="picture"
      sx={{
        display: 'block',
        width: '100%',
        height: height,
        ...sx,
      }}
    >
      {/* WebP for modern browsers */}
      <source srcSet={`/${baseName}.webp`} type="image/webp" />
      
      {/* Compressed PNG fallback */}
      <source srcSet={`/${baseName}_compressed.png`} type="image/png" />
      
      {/* Original as final fallback */}
      <Box
        component="img"
        src={`/${src}`}
        alt={alt}
        loading="lazy"
        sx={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center',
        }}
      />
    </Box>
  );
};

export default OptimizedImage; 