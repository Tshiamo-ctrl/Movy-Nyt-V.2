import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import GlowButton from '../ui/GlowButton';

const HeroContainer = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  background: `linear-gradient(135deg, ${theme.palette.background.default} 0%, #1a1a2e 50%, ${theme.palette.background.default} 100%)`,
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage: 'url("https://images.unsplash.com/photo-1485095329183-d0797cdc5676?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwxfHxtb3ZpZSUyMHRoZWF0ZXIlMjBjaW5lbWElMjBzY3JlZW5zJTIwZGFyayUyMGF0bW9zcGhlcmV8ZW58MHwwfHxibGFja3wxNzU1MTMxNDMzfDA&ixlib=rb-4.1.0&q=85")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    opacity: 0.3,
    zIndex: 0
  }
}));

const FloatingMovie = styled(Box)<{ delay: number; x: number; y: number }>(({ delay, x, y }) => ({
  position: 'absolute',
  width: '120px',
  height: '180px',
  borderRadius: '8px',
  overflow: 'hidden',
  opacity: 0.6,
  animation: `float 6s ease-in-out infinite ${delay}s`,
  left: `${x}%`,
  top: `${y}%`,
  transform: 'translate(-50%, -50%)',
  '@keyframes float': {
    '0%, 100%': {
      transform: 'translate(-50%, -50%) translateY(0px) rotate(0deg)'
    },
    '50%': {
      transform: 'translate(-50%, -50%) translateY(-20px) rotate(2deg)'
    }
  }
}));

const LogoText = styled(Typography)(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  textShadow: '0 0 30px rgba(0, 255, 255, 0.5)',
  animation: 'glow 2s ease-in-out infinite alternate',
  '@keyframes glow': {
    '0%': {
      textShadow: '0 0 30px rgba(0, 255, 255, 0.5)'
    },
    '100%': {
      textShadow: '0 0 50px rgba(0, 255, 255, 0.8)'
    }
  }
}));

const ContentBox = styled(Box)({
  position: 'relative',
  zIndex: 2,
  textAlign: 'center',
  maxWidth: '800px',
  padding: '0 20px'
});

const HeroSection: React.FC = () => {
  const navigate = useNavigate();
  
  const floatingMovies = [
    { 
      src: "https://images.unsplash.com/photo-1617957742236-1b5a6b15182c?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwzfHxtb3ZpZSUyMHBvc3RlciUyMGFjdGlvbiUyMHRocmlsbGVyfGVufDB8MXx8fDE3NTUxMzE0MzN8MA&ixlib=rb-4.1.0&q=85",
      alt: "Action thriller movie poster by roman raizen on Unsplash",
      delay: 0, x: 15, y: 20 
    },
    { 
      src: "https://images.unsplash.com/photo-1660210550351-a49554365b2a?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwzfHxtb3ZpZSUyMHBvc3RlciUyMHNjaS1maSUyMHNwYWNlJTIwZnV0dXJpc3RpY3xlbnwwfDF8fGJsdWV8MTc1NTEzMTQzM3ww&ixlib=rb-4.1.0&q=85",
      alt: "Sci-fi space adventure poster by Paolo Resteghini on Unsplash",
      delay: 1, x: 85, y: 30 
    },
    { 
      src: "https://images.unsplash.com/photo-1553940470-748c34b6eea3?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHw2fHxtb3ZpZSUyMHBvc3RlciUyMGFjdGlvbiUyMHRocmlsbGVyfGVufDB8MXx8fDE3NTUxMzE0MzN8MA&ixlib=rb-4.1.0&q=85",
      alt: "Dark thriller poster by Benjamin Sow on Unsplash",
      delay: 2, x: 20, y: 70 
    },
    { 
      src: "https://images.unsplash.com/photo-1617244792573-36042d79659d?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwyfHxtb3ZpZSUyMHBvc3RlciUyMHNjaS1maSUyMHNwYWNlJTIwZnV0dXJpc3RpY3xlbnwwfDF8fGJsdWV8MTc1NTEzMTQzM3ww&ixlib=rb-4.1.0&q=85",
      alt: "Futuristic movie poster by Tiago Catulo on Unsplash",
      delay: 3, x: 80, y: 75 
    }
  ];

  return (
    <HeroContainer>
      {floatingMovies.map((movie, index) => (
        <FloatingMovie key={index} delay={movie.delay} x={movie.x} y={movie.y}>
          <img 
            src={movie.src} 
            alt={movie.alt}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </FloatingMovie>
      ))}
      
      <ContentBox>
        <LogoText variant="h1" sx={{ mb: 2, fontSize: { xs: '2.5rem', md: '4rem' } }}>
          Movy Nyt
        </LogoText>
        
        <Typography 
          variant="h2" 
          component="h2" 
          sx={{ 
            mb: 2, 
            fontSize: { xs: '1.5rem', md: '2.5rem' },
            fontWeight: 600,
            color: 'text.primary'
          }}
        >
          Stream Together, Stay Connected
        </Typography>
        
        <Typography 
          variant="body1" 
          sx={{ 
            mb: 4, 
            fontSize: { xs: '1rem', md: '1.25rem' },
            color: 'text.secondary',
            maxWidth: '600px',
            mx: 'auto'
          }}
        >
          Watch movies, shows, and videos with friends remotely. Sync your viewing experience and chat in real-time for the ultimate social streaming experience.
        </Typography>
        
        <Stack 
          direction={{ xs: 'column', sm: 'row' }} 
          spacing={3} 
          justifyContent="center"
          alignItems="center"
        >
          <GlowButton 
            variant="primary" 
            size="large"
            onClick={() => navigate('/watch-together')}
          >
            Start Watching
          </GlowButton>
          <GlowButton 
            variant="outline" 
            size="large"
            onClick={() => navigate('/watch')}
          >
            Browse Content
          </GlowButton>
        </Stack>
      </ContentBox>
    </HeroContainer>
  );
};

export default HeroSection;