import React, { useState, useEffect } from 'react';
import { Box, Typography, Stack } from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';
import LocalMoviesOutlinedIcon from '@mui/icons-material/LocalMoviesOutlined';
import AddAPhotoOutlinedIcon from '@mui/icons-material/AddAPhotoOutlined';
import CelebrationOutlinedIcon from '@mui/icons-material/CelebrationOutlined';
import LocalActivityOutlinedIcon from '@mui/icons-material/LocalActivityOutlined';

// Keyframe animations for cinema-themed loading
const filmReelSpin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const cameraFlash = keyframes`
  0%, 100% { opacity: 0.3; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.1); }
`;

const popcornPop = keyframes`
  0%, 100% { transform: translateY(0) scale(1); }
  25% { transform: translateY(-8px) scale(1.1); }
  50% { transform: translateY(-4px) scale(1.05); }
  75% { transform: translateY(-2px) scale(1.02); }
`;

const ticketSlide = keyframes`
  0% { transform: translateX(-20px) rotate(-5deg); opacity: 0; }
  50% { transform: translateX(0) rotate(0deg); opacity: 1; }
  100% { transform: translateX(20px) rotate(5deg); opacity: 0; }
`;

const gradientShift = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const textGlow = keyframes`
  0%, 100% { text-shadow: 0 0 10px rgba(0, 255, 255, 0.3); }
  50% { text-shadow: 0 0 20px rgba(0, 255, 255, 0.8), 0 0 30px rgba(65, 105, 225, 0.4); }
`;

const LoadingContainer = styled(Box)(() => ({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: 'linear-gradient(-45deg, var(--color-background), var(--color-surface), #1a1a2e, var(--color-background))',
  backgroundSize: '400% 400%',
  animation: `${gradientShift} 4s ease infinite`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 9999,
  overflow: 'hidden',
  
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'radial-gradient(circle at 50% 50%, rgba(0, 255, 255, 0.1) 0%, transparent 70%)',
    animation: `${gradientShift} 6s ease infinite reverse`,
  },
}));

const LoadingContent = styled(Stack)(() => ({
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  position: 'relative',
  zIndex: 2,
  padding: 'calc(var(--grid-base) * 4)',
}));

const IconContainer = styled(Box)(() => ({
  position: 'relative',
  width: '120px',
  height: '120px',
  marginBottom: 'calc(var(--grid-base) * 4)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const AnimatedIcon = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'animationType'
})<{ animationType: string }>(({ animationType }) => {
  const animations = {
    spin: `${filmReelSpin} 2s linear infinite`,
    flash: `${cameraFlash} 1.5s ease-in-out infinite`,
    pop: `${popcornPop} 1.2s ease-in-out infinite`,
    slide: `${ticketSlide} 2s ease-in-out infinite`,
  };

  return {
    fontSize: '4rem',
    color: 'var(--color-primary)',
    animation: animations[animationType as keyof typeof animations] || animations.spin,
    filter: 'drop-shadow(0 0 20px rgba(0, 255, 255, 0.4))',
  };
});

const LoadingTitle = styled(Typography)(() => ({
  background: 'var(--gradient-brand)',
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  fontWeight: 700,
  marginBottom: 'calc(var(--grid-base) * 2)',
  animation: `${textGlow} 2s ease-in-out infinite`,
  letterSpacing: '-0.02em',
}));

const LoadingSubtitle = styled(Typography)(() => ({
  color: 'var(--color-text-secondary)',
  marginBottom: 'calc(var(--grid-base) * 3)',
  opacity: 0.8,
}));

const ProgressBar = styled(Box)(() => ({
  width: '200px',
  height: '4px',
  background: 'rgba(255, 255, 255, 0.1)',
  borderRadius: '2px',
  overflow: 'hidden',
  position: 'relative',
}));

const ProgressFill = styled(Box)<{ progress: number }>(({ progress }) => ({
  width: `${progress}%`,
  height: '100%',
  background: 'var(--gradient-brand)',
  borderRadius: '2px',
  transition: 'width 0.3s ease-out',
  boxShadow: '0 0 10px rgba(0, 255, 255, 0.5)',
}));

const FloatingElements = styled(Box)(() => ({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  pointerEvents: 'none',
  overflow: 'hidden',
}));

const FloatingIcon = styled(Box)<{ delay: number; duration: number }>(({ delay, duration }) => ({
  position: 'absolute',
  fontSize: '2rem',
  color: 'rgba(0, 255, 255, 0.2)',
  animation: `${popcornPop} ${duration}s ease-in-out infinite ${delay}s`,
}));

interface LoadingScreenProps {
  isFirstLoad?: boolean;
  onLoadComplete?: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ 
  isFirstLoad = false, 
  onLoadComplete 
}) => {
  const [progress, setProgress] = useState(0);
  const [currentIcon, setCurrentIcon] = useState(0);
  const [loadingText, setLoadingText] = useState('Preparing your cinema experience...');

  const icons = [
    { component: LocalMoviesOutlinedIcon, animation: 'spin' },
    { component: AddAPhotoOutlinedIcon, animation: 'flash' },
    { component: CelebrationOutlinedIcon, animation: 'pop' },
    { component: LocalActivityOutlinedIcon, animation: 'slide' },
  ];

  const loadingTexts = [
    'Preparing your cinema experience...',
    'Loading movie collections...',
    'Setting up social features...',
    'Almost ready to stream...',
  ];

  useEffect(() => {
    const duration = isFirstLoad ? 10000 : 2000; // 10s for first load, 2s for subsequent
    const interval = 50;
    const increment = 100 / (duration / interval);

    const progressTimer = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + increment;
        if (newProgress >= 100) {
          clearInterval(progressTimer);
          setTimeout(() => {
            onLoadComplete?.();
          }, 500);
          return 100;
        }
        return newProgress;
      });
    }, interval);

    // Icon and text rotation
    const iconTimer = setInterval(() => {
      setCurrentIcon(prev => (prev + 1) % icons.length);
      setLoadingText(prev => {
        const currentIndex = loadingTexts.indexOf(prev);
        return loadingTexts[(currentIndex + 1) % loadingTexts.length];
      });
    }, duration / 4);

    return () => {
      clearInterval(progressTimer);
      clearInterval(iconTimer);
    };
  }, [isFirstLoad, onLoadComplete]);

  const CurrentIconComponent = icons[currentIcon].component;

  return (
    <LoadingContainer>
      <FloatingElements>
        {[...Array(8)].map((_, index) => (
          <FloatingIcon
            key={index}
            delay={index * 0.5}
            duration={3 + (index % 3)}
            sx={{
              top: `${Math.random() * 80 + 10}%`,
              left: `${Math.random() * 80 + 10}%`,
            }}
          >
            <LocalMoviesOutlinedIcon />
          </FloatingIcon>
        ))}
      </FloatingElements>

      <LoadingContent spacing={3}>
        <IconContainer>
          <AnimatedIcon animationType={icons[currentIcon].animation}>
            <CurrentIconComponent fontSize="inherit" />
          </AnimatedIcon>
        </IconContainer>

        <LoadingTitle variant="h3">
          Movy Nyt
        </LoadingTitle>

        <LoadingSubtitle variant="body1">
          {loadingText}
        </LoadingSubtitle>

        <ProgressBar>
          <ProgressFill progress={progress} />
        </ProgressBar>

        <Typography 
          variant="caption" 
          sx={{ 
            color: 'var(--color-text-secondary)', 
            opacity: 0.6,
            mt: 2 
          }}
        >
          {Math.round(progress)}% Complete
        </Typography>
      </LoadingContent>
    </LoadingContainer>
  );
};

export default LoadingScreen;