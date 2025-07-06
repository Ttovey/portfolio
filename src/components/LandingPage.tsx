import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Paper,
  Fade,
  useTheme,
  IconButton,
  TextField,
  Grid,
  Card,
  CardContent,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import DownloadIcon from '@mui/icons-material/Download';
import InstagramIcon from '@mui/icons-material/Instagram';
import EmailIcon from '@mui/icons-material/Email';
import CodeIcon from '@mui/icons-material/Code';
import LaunchIcon from '@mui/icons-material/Launch';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import PsychologyIcon from '@mui/icons-material/Psychology';
import NavigationMenu from './NavigationMenu';
import OptimizedImage from './OptimizedImage';

const StyledContainer = styled(Container)(({ theme }) => ({
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  padding: theme.spacing(3),
  paddingTop: theme.spacing(12), // Account for fixed navbar
}));

const NavBar = styled(Box)(({ theme }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  zIndex: 1000,
  backgroundColor: 'rgba(18, 18, 18, 0.85)',
  backdropFilter: 'blur(20px) saturate(180%)',
  WebkitBackdropFilter: 'blur(20px) saturate(180%)',
  borderBottom: `1px solid rgba(255, 255, 255, 0.1)`,
  padding: theme.spacing(2, 3),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  transition: 'all 0.3s ease',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(135deg, rgba(66, 165, 245, 0.05), rgba(25, 118, 210, 0.02))',
    zIndex: -1,
  }
}));

const BrandSection = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'baseline',
  gap: '8px',
});

const BinaryBackground = styled(Box)({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  overflow: 'hidden',
  zIndex: 1,
  pointerEvents: 'none',
  opacity: 0,
  animation: 'fadeInBinary 2s ease-in-out 0.5s forwards',
  '@keyframes binaryMove': {
    '0%': { transform: 'translateX(-50%)' },
    '100%': { transform: 'translateX(-150%)' },
  },
  '@keyframes fadeInBinary': {
    '0%': { opacity: 0 },
    '100%': { opacity: 1 },
  },
});

const JiuJitsuBackground = styled(Box)({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  overflow: 'hidden',
  zIndex: 1,
  pointerEvents: 'none',
  opacity: 0,
  animation: 'fadeInBinary 2s ease-in-out 0.5s forwards',
  '@keyframes binaryMove': {
    '0%': { transform: 'translateX(-50%)' },
    '100%': { transform: 'translateX(-150%)' },
  },
  '@keyframes fadeInBinary': {
    '0%': { opacity: 0 },
    '100%': { opacity: 1 },
  },
});

const BinaryText = styled(Box)({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  fontSize: '14px',
  fontFamily: 'monospace',
  color: 'rgba(255,255,255,0.1)',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-around',
  '& > div': {
    animation: 'binaryMove 25s linear infinite',
    width: '200%',
    transform: 'translateX(-50%)',
    transition: 'transform 0.15s ease-out',
  },
});

const JiuJitsuText = styled(Box)({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  fontSize: '14px',
  fontFamily: 'monospace',
  color: 'rgba(255,255,255,0.1)',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-around',
  '& > div': {
    animation: 'binaryMove 25s linear infinite',
    width: '200%',
    transform: 'translateX(-50%)',
    transition: 'transform 0.15s ease-out',
  },
});



const LandingContent = styled(Box)({
  position: 'relative',
  zIndex: 10,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '80vh',
  textAlign: 'center',
});

const DownArrow = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  bottom: theme.spacing(4),
  left: '50%',
  transform: 'translateX(-50%)',
  zIndex: 10,
  color: theme.palette.text.secondary,
  animation: 'bounce 2s infinite',
  '&:hover': {
    color: theme.palette.primary.main,
    transform: 'translateX(-50%) scale(1.1)',
  },
  '@keyframes bounce': {
    '0%, 20%, 50%, 80%, 100%': {
      transform: 'translateX(-50%) translateY(0)',
    },
    '40%': {
      transform: 'translateX(-50%) translateY(-10px)',
    },
    '60%': {
      transform: 'translateX(-50%) translateY(-5px)',
    },
  },
}));

const SecondContent = styled(Box)({
  position: 'relative',
  zIndex: 10,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
  textAlign: 'center',
});

const LandingPage: React.FC = () => {
  const theme = useTheme();
  const [showContent, setShowContent] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');
  const [isNavigating, setIsNavigating] = useState(false);
  const [showCards, setShowCards] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [navbarOpacity, setNavbarOpacity] = useState(0.85);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoInView, setVideoInView] = useState(false);
  const [hasAutoPlayedOnce, setHasAutoPlayedOnce] = useState(false);
  const videoRef = React.useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      // Don't update active section if we're currently navigating
      if (isNavigating) return;
      
      const sections = ['about-me', 'experience', 'projects'];
      const navbarHeight = 80;
      const viewportHeight = window.innerHeight;
      
      // Check if user is at the very bottom of the page
      const isAtBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 10;
      
      if (isAtBottom) {
        setActiveSection('contact');
        return;
      }
      
      // Check if user is in the top two landing sections
      const aboutMeElement = document.getElementById('about-me');
      const secondContentElement = document.getElementById('second-content');
      
      if (aboutMeElement && secondContentElement) {
        const aboutMeTop = aboutMeElement.getBoundingClientRect().top + window.pageYOffset;
        const secondContentTop = secondContentElement.getBoundingClientRect().top + window.pageYOffset;
        const secondContentBottom = secondContentElement.getBoundingClientRect().bottom + window.pageYOffset;
        
        // If user is above About Me section (first landing section)
        if (window.scrollY < aboutMeTop - navbarHeight) {
          setActiveSection('');
          return;
        }
        
        // If user is in the second content section (jiu-jitsu section)
        if (window.scrollY >= secondContentTop - navbarHeight && window.scrollY < secondContentBottom - navbarHeight) {
          setActiveSection('');
          return;
        }
      }
      
      let newActiveSection = '';
      let minDistance = Infinity;
      
      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          const sectionTop = rect.top - navbarHeight;
          const sectionCenter = sectionTop + (rect.height / 2);
          const viewportCenter = viewportHeight / 2;
          
          // Calculate distance from section center to viewport center
          const distance = Math.abs(sectionCenter - viewportCenter);
          
          // If section is in viewport and closer to center than previous sections
          if (sectionTop <= viewportHeight && rect.bottom >= navbarHeight && distance < minDistance) {
            minDistance = distance;
            newActiveSection = sectionId;
          }
        }
      }
      
      if (newActiveSection && newActiveSection !== activeSection) {
        setActiveSection(newActiveSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Call once to set initial state
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isNavigating, activeSection]);

  useEffect(() => {
    const aboutMeObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShowCards(true);
          } else {
            // Reset cards when section is not visible
            setShowCards(false);
          }
        });
      },
      { 
        threshold: 0.2,
        rootMargin: '-50px 0px -50px 0px'
      }
    );

    const aboutMeElement = document.getElementById('about-me');
    if (aboutMeElement) {
      aboutMeObserver.observe(aboutMeElement);
    }

    return () => {
      if (aboutMeElement) {
        aboutMeObserver.unobserve(aboutMeElement);
      }
    };
  }, []);

  // Video intersection observer for lazy loading
  useEffect(() => {
    const videoObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVideoInView(true);
            if (!videoLoaded) {
              setVideoLoaded(true);
            }
          } else {
            setVideoInView(false);
          }
        });
      },
      { 
        threshold: 0.3,
        rootMargin: '50px 0px 50px 0px'
      }
    );

    const videoElement = document.getElementById('jiu-jitsu-video');
    if (videoElement) {
      videoObserver.observe(videoElement);
    }

    return () => {
      if (videoElement) {
        videoObserver.unobserve(videoElement);
      }
    };
  }, [videoLoaded]);

  // Auto-play video only once when first seen, always pause when out of view
  useEffect(() => {
    const video = videoRef.current;
    if (video && videoLoaded) {
      if (videoInView) {
        // Only autoplay if this is the first time seeing the video
        if (!hasAutoPlayedOnce) {
          video.play().catch(() => {
            console.log('Auto-play was prevented');
          });
          setHasAutoPlayedOnce(true);
        }
      } else {
        // Always pause when video goes out of view
        video.pause();
      }
    }
  }, [videoInView, videoLoaded, hasAutoPlayedOnce]);

  // Pause video when user navigates away from the page
  useEffect(() => {
    const handleVisibilityChange = () => {
      const video = videoRef.current;
      if (video) {
        if (document.hidden) {
          video.pause();
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  // Cleanup video on unmount
  useEffect(() => {
    return () => {
      const video = videoRef.current;
      if (video) {
        video.pause();
        video.src = '';
        video.load();
      }
    };
  }, []);

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollProgress(scrollPercent);
      
      // Dynamic navbar opacity based on scroll position
      const opacity = Math.min(0.95, Math.max(0.75, 0.75 + (scrollTop / 1000) * 0.2));
      setNavbarOpacity(opacity);
    };

    window.addEventListener('scroll', updateScrollProgress);
    updateScrollProgress(); // Initial calculation

    return () => window.removeEventListener('scroll', updateScrollProgress);
  }, []);

  const scrollToSection = (sectionId: string) => {
    // Set navigating flag and active section immediately
    setIsNavigating(true);
    setActiveSection(sectionId);
    
    if (sectionId === 'contact') {
      // Scroll to the very bottom of the page for contact
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth'
      });
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        const navbarHeight = 80; // Approximate navbar height
        const additionalOffset = -75; // Extra padding to show section farther down
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - navbarHeight - additionalOffset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
    
    // Re-enable scroll detection after navigation completes
    setTimeout(() => {
      setIsNavigating(false);
    }, 1000); // Give enough time for smooth scroll to complete
  };

  const generateBinaryString = (length: number) => {
    return Array.from({ length }, () => Math.random() > 0.5 ? '1' : '0').join(' ');
  };

  const generateJiuJitsuString = (length: number) => {
    return Array.from({ length }, () => 'jiu jitsu').join(' ');
  };

  return (
    <>
      {/* Scroll Progress Indicator */}
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '3px',
          zIndex: 1002,
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
        }}
      >
        <Box
          sx={{
            height: '100%',
            width: `${scrollProgress}%`,
            background: 'linear-gradient(90deg, #42a5f5, #1976d2, #0d47a1)',
            transition: 'width 0.1s ease-out',
            boxShadow: '0 0 10px rgba(66, 165, 245, 0.5)',
          }}
        />
      </Box>

      <NavBar
        sx={{
          backgroundColor: `rgba(18, 18, 18, ${navbarOpacity})`,
        }}
      >
        <BrandSection>
          <Typography 
            variant="h5" 
            component="h1" 
            sx={{ 
              fontFamily: 'Playfair Display, serif',
              fontWeight: 700,
              background: 'linear-gradient(135deg, #42a5f5 0%, #1976d2 50%, #0d47a1 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 0 20px rgba(66, 165, 245, 0.3)',
              mb: 0,
            }}
          >
            Tanner Tovey
          </Typography>
          <Typography 
            variant="subtitle1" 
            component="h2"
            sx={{ 
              color: theme.palette.text.secondary,
              fontWeight: 300,
              mb: 0,
              lineHeight: 1,
            }}
          >
            - Full Stack Engineer
          </Typography>
        </BrandSection>
        <NavigationMenu onNavigate={scrollToSection} activeSection={activeSection} />
      </NavBar>

      <BinaryBackground>
        <BinaryText>
          {Array.from({ length: 20 }, (_, i) => (
            <div 
              key={i} 
              style={{ 
                animationDelay: `${i * 0.18}s`,
              }}
            >
              {generateBinaryString(400)} {generateBinaryString(400)}
            </div>
          ))}
        </BinaryText>
      </BinaryBackground>

      <StyledContainer maxWidth={false}>
        <LandingContent>
          <Fade in={showContent} timeout={2000}>
            <Box sx={{ textAlign: 'center', maxWidth: '900px' }}>
              <Typography
                variant="h2"
                sx={{
                  color: theme.palette.text.primary,
                  fontWeight: 300,
                  fontSize: { xs: '2.5rem', md: '3.5rem', lg: '4rem' },
                  lineHeight: 1.2,
                  letterSpacing: '0.02em',
                  textShadow: '0 0 30px rgba(33, 150, 243, 0.3)',
                  mb: 2,
                  fontFamily: '"Playfair Display", "Georgia", serif',
                }}
              >
                I grapple with code
              </Typography>
              <Typography
                variant="h4"
                sx={{
                  color: theme.palette.text.secondary,
                  fontWeight: 200,
                  fontSize: { xs: '1.5rem', md: '2rem' },
                  letterSpacing: '0.05em',
                  opacity: 0.8,
                  fontStyle: 'italic',
                  textShadow: '0 0 20px rgba(255, 255, 255, 0.1)',
                }}
              >
                in the digital world...
              </Typography>
            </Box>
          </Fade>
          <DownArrow onClick={() => scrollToSection('second-content')}>
            <KeyboardArrowDownIcon sx={{ fontSize: '2rem' }} />
          </DownArrow>
        </LandingContent>
      </StyledContainer>

      {/* Second Content Section */}
      <Box id="second-content" sx={{ 
        minHeight: '100vh', 
        background: `linear-gradient(180deg, ${theme.palette.background.default} 0%, ${theme.palette.background.default} 70%, rgba(25, 25, 25, 0.95) 85%, rgba(40, 40, 40, 0.9) 100%)`,
        position: 'relative' 
      }}>
        <JiuJitsuBackground>
          <JiuJitsuText>
            {Array.from({ length: 20 }, (_, i) => (
              <div 
                key={i} 
                style={{ 
                  animationDelay: `${i * 0.18}s`,
                }}
              >
                {generateJiuJitsuString(50)} {generateJiuJitsuString(50)}
              </div>
            ))}
          </JiuJitsuText>
        </JiuJitsuBackground>
        
        <SecondContent>
          <Box sx={{ textAlign: 'center', maxWidth: '900px' }}>
            <Typography
              variant="h2"
              sx={{
                color: theme.palette.text.primary,
                fontWeight: 300,
                fontSize: { xs: '2.5rem', md: '3.5rem', lg: '4rem' },
                lineHeight: 1.2,
                letterSpacing: '0.02em',
                textShadow: '0 0 30px rgba(33, 150, 243, 0.3)',
                mb: 2,
                fontFamily: '"Playfair Display", "Georgia", serif',
              }}
            >
              And I grapple with people
            </Typography>
            <Typography
              variant="h4"
              sx={{
                color: theme.palette.text.secondary,
                fontWeight: 200,
                fontSize: { xs: '1.5rem', md: '2rem' },
                letterSpacing: '0.05em',
                opacity: 0.8,
                fontStyle: 'italic',
                textShadow: '0 0 20px rgba(255, 255, 255, 0.1)',
                mb: 4,
              }}
            >
              in the physical world...
            </Typography>
            <Box
              sx={{
                mt: 4,
                display: 'flex',
                justifyContent: 'center',
                maxWidth: '800px',
                width: '100%',
                position: 'relative',
              }}
            >
              {videoLoaded ? (
                <video
                  id="jiu-jitsu-video"
                  ref={videoRef}
                  controls
                  autoPlay={false}
                  muted
                  loop
                  preload="metadata"
                  playsInline
                  style={{
                    width: '100%',
                    maxWidth: '600px',
                    height: 'auto',
                    borderRadius: '12px',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                    border: `1px solid ${theme.palette.divider}`,
                  }}
                  onLoadedData={() => {
                    // Video is ready to play - autoplay logic handled in useEffect
                  }}
                  onError={() => {
                    console.error('Video failed to load');
                  }}
                >
                  <source src={`${process.env.PUBLIC_URL}/toro_cup_optimized.mp4`} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <Box
                  id="jiu-jitsu-video"
                  sx={{
                    width: '100%',
                    maxWidth: '600px',
                    height: '338px', // Approximate video height
                    borderRadius: '12px',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                    border: `1px solid ${theme.palette.divider}`,
                    bgcolor: 'rgba(0, 0, 0, 0.8)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    backgroundImage: 'linear-gradient(45deg, rgba(66, 165, 245, 0.1), rgba(25, 118, 210, 0.1))',
                  }}
                >
                  <Box sx={{ textAlign: 'center', color: theme.palette.text.secondary }}>
                    <Typography variant="h6" sx={{ mb: 1 }}>
                      🥋
                    </Typography>
                    <Typography variant="body2">
                      Video loading...
                    </Typography>
                  </Box>
                </Box>
              )}
            </Box>
          </Box>
        </SecondContent>
      </Box>

      {/* About Me Section */}
      <Box id="about-me" sx={{ 
        minHeight: '100vh', 
        p: 3, 
        background: `linear-gradient(180deg, rgba(40, 40, 40, 0.9) 0%, rgba(25, 25, 25, 0.95) 20%, ${theme.palette.background.default} 40%, ${theme.palette.background.default} 60%, rgba(25, 25, 25, 0.95) 80%, rgba(40, 40, 40, 0.9) 100%)`,
        position: 'relative',
        overflow: 'hidden'
      }}>
        <Box sx={{ textAlign: 'center', pt: 6, pb: 2 }}>
          <Typography
            variant="h2"
            sx={{
              fontFamily: 'Playfair Display, serif',
              fontWeight: 700,
              fontSize: { xs: '2.5rem', md: '3.5rem', lg: '4rem' },
              background: 'linear-gradient(135deg, #42a5f5 0%, #1976d2 50%, #0d47a1 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 0 40px rgba(66, 165, 245, 0.3)',
              mb: 2,
              position: 'relative',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: '-10px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '80px',
                height: '3px',
                background: 'linear-gradient(90deg, transparent, #42a5f5, transparent)',
                borderRadius: '2px',
              }
            }}
          >
            About Me
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: 'rgba(255, 255, 255, 0.7)',
              fontWeight: 300,
              fontSize: { xs: '1rem', md: '1.2rem' },
              fontStyle: 'italic',
              letterSpacing: '0.5px',
              mt: 2,
            }}
          >
            The story behind the code
          </Typography>
        </Box>
        
        <Container maxWidth="lg">
          <Grid container spacing={4} sx={{ mt: 2 }}>
            {/* Journey Card */}
            <Grid item xs={12} md={4}>
              <Card
                sx={{
                  background: 'linear-gradient(135deg, rgba(45, 45, 45, 0.95), rgba(35, 35, 35, 0.95))',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(66, 165, 245, 0.3)',
                  borderRadius: 3,
                  p: 3,
                  height: '100%',
                  opacity: showCards ? 1 : 0,
                  transform: showCards ? 'translateY(0)' : 'translateY(30px)',
                  transition: 'all 0.3s ease',
                  transitionDelay: showCards ? '0.1s' : '0s',
                  '&:hover': {
                    transform: showCards ? 'translateY(-6px)' : 'translateY(30px)',
                    boxShadow: '0 8px 25px rgba(66, 165, 245, 0.3)',
                    border: '1px solid rgba(66, 165, 245, 0.6)',
                    '& .card-icon': {
                      transform: 'scale(1.05)',
                    },
                    '& .card-title': {
                      color: '#64b5f6',
                    }
                  },
                }}
              >
                <CardContent sx={{ textAlign: 'center', p: 0 }}>
                  <Box
                    className="card-icon"
                    sx={{
                      mb: 3,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: 60,
                      height: 60,
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #42a5f5, #1976d2)',
                      mx: 'auto',
                      boxShadow: '0 4px 20px rgba(66, 165, 245, 0.4)',
                      transition: 'transform 0.2s ease',
                    }}
                  >
                    <CodeIcon sx={{ fontSize: 30, color: '#fff' }} />
                  </Box>
                  <Typography
                    className="card-title"
                    variant="h5"
                    sx={{
                      color: '#42a5f5',
                      fontWeight: 600,
                      mb: 2,
                      fontFamily: 'Playfair Display, serif',
                      transition: 'color 0.2s ease',
                    }}
                  >
                    Journey
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      color: '#e0e0e0',
                      lineHeight: 1.7,
                      fontSize: '1.1rem',
                    }}
                  >
                    My coding journey began in 2020 when I discovered the art of transforming ideas into digital reality. What started as curiosity quickly became a passion for building solutions that make a difference.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            {/* Passion Card */}
            <Grid item xs={12} md={4}>
              <Card
                sx={{
                  background: 'linear-gradient(135deg, rgba(45, 45, 45, 0.95), rgba(35, 35, 35, 0.95))',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(66, 165, 245, 0.3)',
                  borderRadius: 3,
                  p: 3,
                  height: '100%',
                  opacity: showCards ? 1 : 0,
                  transform: showCards ? 'translateY(0)' : 'translateY(30px)',
                  transition: 'all 0.3s ease',
                  transitionDelay: showCards ? '0.2s' : '0s',
                  '&:hover': {
                    transform: showCards ? 'translateY(-6px)' : 'translateY(30px)',
                    boxShadow: '0 8px 25px rgba(66, 165, 245, 0.3)',
                    border: '1px solid rgba(66, 165, 245, 0.6)',
                    '& .card-icon': {
                      transform: 'scale(1.05)',
                    },
                    '& .card-title': {
                      color: '#64b5f6',
                    }
                  },
                }}
              >
                <CardContent sx={{ textAlign: 'center', p: 0 }}>
                  <Box
                    className="card-icon"
                    sx={{
                      mb: 3,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: 60,
                      height: 60,
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #42a5f5, #1976d2)',
                      mx: 'auto',
                      boxShadow: '0 4px 20px rgba(66, 165, 245, 0.4)',
                      transition: 'transform 0.2s ease',
                    }}
                  >
                    <FitnessCenterIcon sx={{ fontSize: 30, color: '#fff' }} />
                  </Box>
                  <Typography
                    className="card-title"
                    variant="h5"
                    sx={{
                      color: '#42a5f5',
                      fontWeight: 600,
                      mb: 2,
                      fontFamily: 'Playfair Display, serif',
                      transition: 'color 0.2s ease',
                    }}
                  >
                    Balance
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      color: '#e0e0e0',
                      lineHeight: 1.7,
                      fontSize: '1.1rem',
                    }}
                  >
                    Beyond the digital realm, I'm deeply rooted in Brazilian Jiu-Jitsu. The principles of persistence, problem-solving, and continuous improvement apply both on the mats and in software development.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            {/* Philosophy Card */}
            <Grid item xs={12} md={4}>
              <Card
                sx={{
                  background: 'linear-gradient(135deg, rgba(45, 45, 45, 0.95), rgba(35, 35, 35, 0.95))',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(66, 165, 245, 0.3)',
                  borderRadius: 3,
                  p: 3,
                  height: '100%',
                  opacity: showCards ? 1 : 0,
                  transform: showCards ? 'translateY(0)' : 'translateY(30px)',
                  transition: 'all 0.3s ease',
                  transitionDelay: showCards ? '0.3s' : '0s',
                  '&:hover': {
                    transform: showCards ? 'translateY(-6px)' : 'translateY(30px)',
                    boxShadow: '0 8px 25px rgba(66, 165, 245, 0.3)',
                    border: '1px solid rgba(66, 165, 245, 0.6)',
                    '& .card-icon': {
                      transform: 'scale(1.05)',
                    },
                    '& .card-title': {
                      color: '#64b5f6',
                    }
                  },
                }}
              >
                <CardContent sx={{ textAlign: 'center', p: 0 }}>
                  <Box
                    className="card-icon"
                    sx={{
                      mb: 3,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: 60,
                      height: 60,
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #42a5f5, #1976d2)',
                      mx: 'auto',
                      boxShadow: '0 4px 20px rgba(66, 165, 245, 0.4)',
                      transition: 'transform 0.2s ease',
                    }}
                  >
                    <PsychologyIcon sx={{ fontSize: 30, color: '#fff' }} />
                  </Box>
                  <Typography
                    className="card-title"
                    variant="h5"
                    sx={{
                      color: '#42a5f5',
                      fontWeight: 600,
                      mb: 2,
                      fontFamily: 'Playfair Display, serif',
                      transition: 'color 0.2s ease',
                    }}
                  >
                    Mindset
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      color: '#e0e0e0',
                      lineHeight: 1.7,
                      fontSize: '1.1rem',
                    }}
                  >
                    Whether debugging complex systems or rolling with training partners, I approach every challenge with curiosity, resilience, and an unwavering commitment to growth and excellence.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Experience Section */}
      <Box id="experience" sx={{ 
        minHeight: '100vh', 
        p: 3, 
        background: `linear-gradient(180deg, rgba(40, 40, 40, 0.9) 0%, rgba(25, 25, 25, 0.95) 20%, ${theme.palette.background.default} 40%, ${theme.palette.background.default} 60%, rgba(25, 25, 25, 0.95) 80%, rgba(40, 40, 40, 0.9) 100%)`
      }}>
        <Box sx={{ textAlign: 'center', py: 6 }}>
          <Typography
            variant="h2"
            sx={{
              fontFamily: 'Playfair Display, serif',
              fontWeight: 700,
              fontSize: { xs: '2.5rem', md: '3.5rem', lg: '4rem' },
              background: 'linear-gradient(135deg, #42a5f5 0%, #1976d2 50%, #0d47a1 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 0 40px rgba(66, 165, 245, 0.3)',
              mb: 2,
              position: 'relative',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: '-10px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '80px',
                height: '3px',
                background: 'linear-gradient(90deg, transparent, #42a5f5, transparent)',
                borderRadius: '2px',
              }
            }}
          >
            Experience
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: 'rgba(255, 255, 255, 0.7)',
              fontWeight: 300,
              fontSize: { xs: '1rem', md: '1.2rem' },
              fontStyle: 'italic',
              letterSpacing: '0.5px',
              mt: 2,
            }}
          >
            My professional journey
          </Typography>
        </Box>
        
        <Container maxWidth="lg">
          <Box sx={{ position: 'relative', minHeight: '800px' }}>
            {/* Central Timeline Line */}
            <Box sx={{
              position: 'absolute',
              left: '50%',
              top: 30,
              height: '730px',
              width: '3px',
              bgcolor: theme.palette.primary.main,
              opacity: 0.4,
              transform: 'translateX(-50%)'
            }} />

            {/* Timeline Headers */}
            <Box sx={{ display: 'flex', mb: 4 }}>
              <Box sx={{ flex: 1, textAlign: 'center', pr: 2 }}>
                <Typography 
                  variant="h4" 
                  sx={{
                    fontFamily: 'Playfair Display, serif',
                    fontWeight: 700,
                    fontSize: { xs: '1.8rem', md: '2.2rem', lg: '2.5rem' },
                    background: 'linear-gradient(135deg, #42a5f5 0%, #1976d2 50%, #0d47a1 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    textShadow: '0 0 20px rgba(66, 165, 245, 0.3)',
                    mb: 1,
                  }}
                >
                  Education
                </Typography>
              </Box>
              <Box sx={{ flex: 1, textAlign: 'center', pl: 2 }}>
                <Typography 
                  variant="h4" 
                  sx={{
                    fontFamily: 'Playfair Display, serif',
                    fontWeight: 700,
                    fontSize: { xs: '1.8rem', md: '2.2rem', lg: '2.5rem' },
                    background: 'linear-gradient(135deg, #42a5f5 0%, #1976d2 50%, #0d47a1 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    textShadow: '0 0 20px rgba(66, 165, 245, 0.3)',
                    mb: 1,
                  }}
                >
                  Work Experience
                </Typography>
              </Box>
            </Box>

            {/* Year Markers */}
            <Box sx={{ position: 'relative', minHeight: '800px' }}>
              {/* Year markers */}
              {['2025', '2024', '2023', '2022', '2021', '2020'].map((year, index) => (
                <Box key={year} sx={{
                  position: 'absolute',
                  left: '50%',
                  top: `${index * 120 + 60}px`,
                  transform: 'translateX(-50%)',
                  zIndex: 3,
                  bgcolor: theme.palette.primary.main,
                  color: 'white',
                  px: 2,
                  py: 1,
                  borderRadius: 2,
                  fontWeight: 600,
                  fontSize: '0.9rem'
                }}>
                  {year}
                </Box>
              ))}

              {/* Experience Boxes */}
              {[
                // Georgia Tech 2025 - Current
                {
                  type: 'education',
                  title: 'Georgia Institute of Technology',
                  description: 'Master of Science in Computer Science - Part Time',
                  startYear: 2025,
                  endYear: 2025,
                  active: true,
                  top: 0,
                  height: 100
                },
                // Software Engineer Associate 2023-2025
                {
                  type: 'work',
                  title: 'Optum - Software Engineer Associate',
                  description: 'Full Stack Engineer utlizing technologies such as Databricks, Azure, Angular, and Spring to build medical  grade applications. Upgraded the engineering administration tool from Angular 8 to 17, removed deprecated code to reduce tech debt and increase maintainability. Collaborated with business partners to identify and implement features that meet patient, user, and business requirements. Conducted thorough code reviews to ensure quality before deployment through CI/CD pipelines. Created comprehensive documentation covering application operation, development setup, API architecture, and troubleshooting to support ongoing maintenance and development.',
                  startYear: 2023,
                  endYear: 2025,
                  active: false,
                  top: 20,
                  height: 270
                },
                // Optum Intern 2022-2023
                {
                  type: 'work',
                  title: 'Optum - Software Engineer Intern',
                  description: 'Lead a team of interns to build a site reliability application',
                  startYear: 2022,
                  endYear: 2023,
                  active: false,
                  top: 295,
                  height: 80
                },
                // Code Platoon TA 2022
                {
                  type: 'work',
                  title: 'Code Platoon - Teaching Assistant',
                  description: 'Help teach veterans how to code using Python and Javascript',
                  startYear: 2022,
                  endYear: 2022,
                  active: false,
                  top: 380,
                  height: 80
                },
                // College of Coastal Georgia 2020-2022
                {
                  type: 'education',
                  title: 'College of Coastal Georgia',
                  description: 'Bachelor of Science in Health Information: Minor in Data Analytics \n\nRelevant Coursework: Computing for Scientist and Engineers, Foundation of Data Science, Computer Science I, Computer Networks and Applications for Business, Calculus I, Probability &   Statistics, Python for Data Analytics, Database Management Systems, Intro to Philosophy, Intro to R Programming',
                  startYear: 2020,
                  endYear: 2022,
                  active: false,
                  top: 330,
                  height: 370
                }
              ].map((item, index) => (
                <Box key={index} sx={{
                  position: 'absolute',
                  left: item.type === 'education' ? 0 : '50%',
                  right: item.type === 'work' ? 0 : '50%',
                  top: `${item.top}px`,
                  width: 'calc(50% - 40px)',
                  marginLeft: item.type === 'work' ? '40px' : 0,
                  marginRight: item.type === 'education' ? '40px' : 0
                }}>
                  <Paper 
                    elevation={2}
                    sx={{ 
                      p: 3, 
                      bgcolor: theme.palette.background.paper,
                      border: `2px solid ${item.active ? theme.palette.success.main : theme.palette.divider}`,
                      borderRadius: 2,
                      height: `${item.height}px`,
                      position: 'relative',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: theme.shadows[4]
                      },
                      '&::after': item.type === 'education' ? {
                        content: '""',
                        position: 'absolute',
                        right: '-10px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        width: 0,
                        height: 0,
                        borderLeft: `10px solid ${item.active ? theme.palette.success.main : theme.palette.divider}`,
                        borderTop: '10px solid transparent',
                        borderBottom: '10px solid transparent'
                      } : {
                        content: '""',
                        position: 'absolute',
                        left: '-10px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        width: 0,
                        height: 0,
                        borderRight: `10px solid ${item.active ? theme.palette.success.main : theme.palette.divider}`,
                        borderTop: '10px solid transparent',
                        borderBottom: '10px solid transparent'
                      }
                    }}
                  >
                    <Typography variant="subtitle1" sx={{ color: theme.palette.text.primary, fontWeight: 600, mb: 1 }}>
                      {item.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: theme.palette.text.secondary, lineHeight: 1.4, whiteSpace: 'pre-line' }}>
                      {item.description}
                    </Typography>
                    {item.active && (
                      <Typography variant="caption" sx={{ color: theme.palette.success.main, fontWeight: 600, mt: 1, display: 'block' }}>
                        Current
                      </Typography>
                    )}
                  </Paper>
                </Box>
              ))}
            </Box>
          </Box>
        </Container>
      </Box>

      <Box id="projects" sx={{ 
        minHeight: '100vh', 
        p: 3, 
        background: `linear-gradient(180deg, rgba(40, 40, 40, 0.9) 0%, rgba(25, 25, 25, 0.95) 20%, ${theme.palette.background.default} 40%, ${theme.palette.background.default} 60%, rgba(25, 25, 25, 0.95) 80%, rgba(40, 40, 40, 0.9) 100%)`
      }}>
        <Box sx={{ textAlign: 'center', py: 6 }}>
          <Typography
            variant="h2"
            sx={{
              fontFamily: 'Playfair Display, serif',
              fontWeight: 700,
              fontSize: { xs: '2.5rem', md: '3.5rem', lg: '4rem' },
              background: 'linear-gradient(135deg, #42a5f5 0%, #1976d2 50%, #0d47a1 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 0 40px rgba(66, 165, 245, 0.3)',
              mb: 2,
              position: 'relative',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: '-10px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '80px',
                height: '3px',
                background: 'linear-gradient(90deg, transparent, #42a5f5, transparent)',
                borderRadius: '2px',
              }
            }}
          >
            Projects
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: 'rgba(255, 255, 255, 0.7)',
              fontWeight: 300,
              fontSize: { xs: '1rem', md: '1.2rem' },
              fontStyle: 'italic',
              letterSpacing: '0.5px',
              mt: 2,
            }}
          >
            Some recent work...
          </Typography>
        </Box>
        
        <Container maxWidth="lg">
          <Box sx={{ 
            display: 'grid', 
            gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, 
            gap: 4,
            position: 'relative',
            zIndex: 2
          }}>
            {/* Jiu Jitsu Exchange Website */}
            <Paper 
              elevation={3}
              sx={{ 
                overflow: 'hidden',
                borderRadius: 2,
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: theme.shadows[8]
                }
              }}
            >
              <Box
                component="a"
                href="https://ttovey.github.io/exchangeWebsite/"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  display: 'block',
                  cursor: 'pointer',
                  textDecoration: 'none',
                  '&:hover': {
                    opacity: 0.9
                  }
                }}
              >
                              <OptimizedImage 
                src="exchange.webp"
                alt="Jiu Jitsu Exchange Website Screenshot"
                height="280px"
              />
              </Box>
                             <Box sx={{ p: 3 }}>
                 <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                   <Typography variant="h6" sx={{ color: theme.palette.text.primary, fontWeight: 600 }}>
                     Jiu Jitsu Exchange Website
                   </Typography>
                   <IconButton 
                     component="a"
                     href="https://ttovey.github.io/exchangeWebsite/"
                     target="_blank"
                     rel="noopener noreferrer"
                     sx={{ 
                       color: theme.palette.text.secondary,
                       padding: '4px',
                       '&:hover': { 
                         color: theme.palette.primary.main,
                         transform: 'scale(1.1)'
                       }
                     }}
                   >
                     <LaunchIcon fontSize="small" />
                   </IconButton>
                   <IconButton 
                     component="a"
                     href="https://github.com/Ttovey/exchangeWebsite"
                     target="_blank"
                     rel="noopener noreferrer"
                     sx={{ 
                       color: theme.palette.text.secondary,
                       padding: '4px',
                       '&:hover': { 
                         color: theme.palette.primary.main,
                         transform: 'scale(1.1)'
                       }
                     }}
                   >
                     <GitHubIcon fontSize="small" />
                   </IconButton>
                 </Box>
                <Typography variant="body2" sx={{ color: theme.palette.text.secondary, lineHeight: 1.6 }}>
                  A comprehensive platform for the jiu jitsu community to connect, share techniques, and track progress.
                </Typography>
              </Box>
            </Paper>

            {/* Woodmill Winery Website */}
            <Paper 
              elevation={3}
              sx={{ 
                overflow: 'hidden',
                borderRadius: 2,
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: theme.shadows[8]
                }
              }}
            >
              <OptimizedImage 
                src="woodmill.webp"
                alt="Woodmill Winery Website Screenshot"
                height="280px"
              />
                             <Box sx={{ p: 3 }}>
                 <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                   <Typography variant="h6" sx={{ color: theme.palette.text.primary, fontWeight: 600 }}>
                     Woodmill Winery Website
                   </Typography>
                   <IconButton 
                     component="a"
                     href="https://ttovey.github.io/woodmillWebsite/"
                     target="_blank"
                     rel="noopener noreferrer"
                     sx={{ 
                       color: theme.palette.text.secondary,
                       padding: '4px',
                       '&:hover': { 
                         color: theme.palette.primary.main,
                         transform: 'scale(1.1)'
                       }
                     }}
                   >
                     <LaunchIcon fontSize="small" />
                   </IconButton>
                   <IconButton 
                     component="a"
                     href="https://github.com/Ttovey/woodmillWebsite"
                     target="_blank"
                     rel="noopener noreferrer"
                     sx={{ 
                       color: theme.palette.text.secondary,
                       padding: '4px',
                       '&:hover': { 
                         color: theme.palette.primary.main,
                         transform: 'scale(1.1)'
                       }
                     }}
                   >
                     <GitHubIcon fontSize="small" />
                   </IconButton>
                 </Box>
                <Typography variant="body2" sx={{ color: theme.palette.text.secondary, lineHeight: 1.6 }}>
                  An elegant website showcasing premium wines with an immersive tasting experience and online ordering.
                </Typography>
              </Box>
            </Paper>

            {/* Jiu Jitsu Exchange App */}
            <Paper 
              elevation={3}
              sx={{ 
                overflow: 'hidden',
                borderRadius: 2,
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                gridColumn: { xs: '1', md: '1 / 3' },
                maxWidth: { xs: '100%', md: '400px' },
                justifySelf: 'center',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: theme.shadows[8]
                }
              }}
            >
              <Box
                component="img"
                src={`${process.env.PUBLIC_URL}/coming_soon.jpeg`}
                alt="Jiu Jitsu Exchange App Coming Soon"
                loading="lazy"
                sx={{
                  width: '100%',
                  height: '200px',
                  objectFit: 'cover',
                  objectPosition: 'center',
                }}
              />
                             <Box sx={{ p: 3 }}>
                 <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                   <Typography variant="h6" sx={{ color: theme.palette.text.primary, fontWeight: 600 }}>
                     Jiu Jitsu Exchange App
                   </Typography>
                   <IconButton 
                     component="a"
                     href="https://github.com/Ttovey/TheJiuJitsuExchange"
                     target="_blank"
                     rel="noopener noreferrer"
                     sx={{ 
                       color: theme.palette.text.secondary,
                       padding: '4px',
                       '&:hover': { 
                         color: theme.palette.primary.main,
                         transform: 'scale(1.1)'
                       }
                     }}
                   >
                     <GitHubIcon fontSize="small" />
                   </IconButton>
                 </Box>
                <Typography variant="body2" sx={{ color: theme.palette.text.secondary, lineHeight: 1.6 }}>
                  Mobile application bringing the jiu jitsu community together with enhanced features and real-time interactions.
                </Typography>
              </Box>
            </Paper>
          </Box>
        </Container>
      </Box>

      {/* Bottom Navbar - Full Width */}
      <Box sx={{ 
        py: 4,
        px: 6,
        borderTop: `1px solid ${theme.palette.divider}`,
        bgcolor: 'rgba(0, 0, 0, 0.3)',
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        flexDirection: { xs: 'column', md: 'row' },
        gap: { xs: 3, md: 0 }
      }}>
        {/* Email */}
        <Box
          component="a"
          href="mailto:tannertovey7@gmail.com"
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            textDecoration: 'none',
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'translateY(-1px)',
              '& .email-icon': {
                color: '#42a5f5',
                boxShadow: '0 0 15px rgba(66, 165, 245, 0.4)',
              },
              '& .email-text': {
                background: 'linear-gradient(135deg, #42a5f5, #64b5f6)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: '0 0 20px rgba(66, 165, 245, 0.3)',
              }
            }
          }}
        >
          <EmailIcon 
            className="email-icon"
            sx={{ 
              fontSize: '1.8rem',
              color: theme.palette.text.secondary,
              transition: 'all 0.3s ease',
            }} 
          />
          <Typography 
            className="email-text"
            variant="h6" 
            sx={{ 
              color: theme.palette.text.primary,
              fontWeight: 600,
              fontSize: { xs: '1.1rem', md: '1.3rem' },
              fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
              letterSpacing: '0.5px',
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.7))',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
            }}
          >
            tannertovey7@gmail.com
          </Typography>
        </Box>
        
        {/* Social Icons */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
          {/* LinkedIn */}
          <IconButton
            component="a"
            href="https://www.linkedin.com/in/tanner-tovey-b545821a5/"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              color: '#0077B5',
              animation: 'breathe 3s ease-in-out infinite',
              '&:hover': {
                transform: 'scale(1.3) rotate(5deg)',
                color: '#005885',
                boxShadow: '0 0 20px rgba(0, 119, 181, 0.6)',
                animation: 'pulse-glow 1.5s ease-in-out infinite',
              },
              transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
            }}
          >
            <LinkedInIcon sx={{ fontSize: '2rem' }} />
          </IconButton>
          
          {/* Resume Download */}
          <IconButton
            component="a"
            href={`${process.env.PUBLIC_URL}/Tanner Tovey - Full Stack Engineer .pdf`}
            download="Tanner_Tovey_Resume.pdf"
            sx={{
              color: theme.palette.primary.main,
              animation: 'breathe 3s ease-in-out infinite',
              animationDelay: '1s',
              '&:hover': {
                transform: 'scale(1.3) rotate(-5deg)',
                color: theme.palette.primary.dark,
                boxShadow: '0 0 20px rgba(66, 165, 245, 0.6)',
                animation: 'pulse-glow 1.5s ease-in-out infinite',
              },
              transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
            }}
          >
            <DownloadIcon sx={{ fontSize: '2rem' }} />
          </IconButton>
          
          {/* Instagram */}
          <IconButton
            component="a"
            href="https://www.instagram.com/tannertovey/"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              color: '#E4405F',
              animation: 'breathe 3s ease-in-out infinite',
              animationDelay: '2s',
              '&:hover': {
                transform: 'scale(1.3) rotate(5deg)',
                color: '#C13584',
                boxShadow: '0 0 20px rgba(228, 64, 95, 0.6)',
                animation: 'pulse-glow 1.5s ease-in-out infinite',
              },
              transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
            }}
          >
            <InstagramIcon sx={{ fontSize: '2rem' }} />
          </IconButton>
        </Box>
      </Box>
    </>
  );
};

export default LandingPage; 