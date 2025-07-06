import React from 'react';
import { Box, Button, useTheme } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledButton = styled(Button)<{ active?: boolean }>(({ theme, active }) => ({
  color: theme.palette.text.primary,
  backgroundColor: 'transparent',
  fontWeight: 500,
  padding: theme.spacing(1, 1.5),
  margin: theme.spacing(0, 0.5),
  transition: 'all 0.3s ease',
  textTransform: 'none',
  position: 'relative',
  textDecoration: active ? 'line-through' : 'none',
  textDecorationColor: active ? '#ffffff' : 'transparent',
  textDecorationThickness: active ? '2px' : '1px',
  '&:hover': {
    backgroundColor: 'transparent',
    color: theme.palette.primary.main,
  },
}));

const Separator = styled('div')(({ theme }) => ({
  width: '1px',
  height: '20px',
  backgroundColor: 'white',
  opacity: 0.5,
}));

interface NavigationMenuProps {
  onNavigate: (sectionId: string) => void;
  activeSection: string;
}

const NavigationMenu: React.FC<NavigationMenuProps> = ({ onNavigate, activeSection }) => {
  const theme = useTheme();

  const menuItems = [
    { label: 'about', id: 'about-me' },
    { label: 'experience', id: 'experience' },
    { label: 'projects', id: 'projects' },
    { label: 'contact', id: 'contact' },
  ];

  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'flex-end',
        alignItems: 'center',
        gap: 1,
      }}
    >
      {menuItems.map((item, index) => (
        <React.Fragment key={item.id}>
          <StyledButton
            onClick={() => onNavigate(item.id)}
            variant="text"
            active={activeSection === item.id}
          >
            {item.label}
          </StyledButton>
          {index < menuItems.length - 1 && <Separator />}
        </React.Fragment>
      ))}
    </Box>
  );
};

export default NavigationMenu; 