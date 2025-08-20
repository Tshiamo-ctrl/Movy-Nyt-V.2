import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';
import LocalMoviesOutlinedIcon from '@mui/icons-material/LocalMoviesOutlined';

// Curtain animation keyframes
const curtainOpen = keyframes`
  0% { 
    transform: scaleY(1);
    transform-origin: top;
  }
  100% { 
    transform: scaleY(0);
    transform-origin: top;
  }
`;

const curtainClose = keyframes`
  0% { 
    transform: scaleY(0);
    transform-origin: bottom;
  }
  100% { 
    transform: scaleY(1);
    transform-origin: bottom;
  }
`;

const fadeInUp = keyframes`
  0% { 
    opacity: 0; 
    transform: translateY(20px); 
  }
  100% { 
    opacity: 1; 
    transform: translateY(0); 
  }
`;

const logoGlow = keyframes`
  0%, 100% { 
    filter: drop-shadow(0 0 20px rgba(0, 255, 255, 0.4));
  }
  50% { 
    filter: drop-shadow(0 0 30px rgba(0, 255, 255, 0.8));
  }
`;

const LoadingContainer = styled(Box)(() => ({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: 'var(--color-background)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 9999,
  overflow: 'hidden',
}));

const Curtain = styled(Box)<{ isClosing: boolean }>(({ isClosing }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)',
  animation: isClosing ? `${curtainClose} 0.8s var(--ease-out-expo) forwards` : `${curtainOpen} 0.8s var(--ease-out-expo) forwards`,
  transformOrigin: 'top',
}));

const LoadingContent = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  position: 'relative',
  zIndex: 2,
  animation: `${fadeInUp} 0.6s var(--ease-out-expo) 0.3s both`,
}));

const LogoContainer = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: 'calc(var(--grid-base) * 4)',
  animation: `${logoGlow} 2s ease-in-out infinite`,
}));

const LogoIcon = styled(LocalMoviesOutlinedIcon)(() => ({
  fontSize: '4rem',
  color: 'var(--color-primary)',
  marginRight: 'calc(var(--grid-base) * 2)',
}));

const LogoText = styled(Typography)(() => ({
  background: 'var(--gradient-brand)',
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  fontWeight: 700,
  fontSize: '2.5rem',
  letterSpacing: '-0.02em',
}));

const LoadingSubtitle = styled(Typography)(() => ({
  color: 'var(--color-text-secondary)',
  opacity: 0.8,
  fontSize: '1.1rem',
  fontWeight: 400,
}));

interface LoadingScreenProps {
  isFirstLoad?: boolean;
  onLoadComplete?: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ 
  isFirstLoad = false, 
  onLoadComplete 
}) => {
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    const duration = isFirstLoad ? 3000 : 1500; // 3s for first load, 1.5s for subsequent
    
    const timer = setTimeout(() => {
      setIsClosing(true);
      
      // Wait for curtain to close before calling onLoadComplete
      setTimeout(() => {
        onLoadComplete?.();
      }, 800);
    }, duration);

    return () => clearTimeout(timer);
  }, [isFirstLoad, onLoadComplete]);

  return (
    <LoadingContainer>
      <Curtain isClosing={isClosing} />
      
      <LoadingContent>
        <LogoContainer>
          <LogoIcon />
          <LogoText>
            Movy Nyt
          </LogoText>
        </LogoContainer>
        
        <LoadingSubtitle>
          {isFirstLoad ? 'Preparing your cinema experience...' : 'Loading...'}
        </LoadingSubtitle>
      </LoadingContent>
    </LoadingContainer>
  );
};

export default LoadingScreen;