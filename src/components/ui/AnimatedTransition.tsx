import React, { ReactNode } from 'react';
import { Box } from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';

// Animation keyframes
const slideInFromRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(100px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const slideInFromLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-100px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const slideInFromBottom = keyframes`
  from {
    opacity: 0;
    transform: translateY(50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const fadeInScale = keyframes`
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const staggeredFadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const cardFloat = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-4px);
  }
`;

const glowPulse = keyframes`
  0%, 100% {
    box-shadow: 0 0 20px rgba(0, 255, 255, 0.2);
  }
  50% {
    box-shadow: 0 0 40px rgba(0, 255, 255, 0.4);
  }
`;

type AnimationType = 
  | 'slideInFromRight' 
  | 'slideInFromLeft' 
  | 'slideInFromBottom' 
  | 'fadeInScale' 
  | 'staggeredFadeIn'
  | 'cardFloat'
  | 'glowPulse';

interface AnimatedTransitionProps {
  children: ReactNode;
  animation?: AnimationType;
  delay?: number;
  duration?: number;
  staggerIndex?: number;
  hover?: boolean;
  className?: string;
}

const AnimatedContainer = styled(Box, {
  shouldForwardProp: (prop) => 
    prop !== 'animationType' && 
    prop !== 'animationDelay' && 
    prop !== 'animationDuration' &&
    prop !== 'staggerIndex' &&
    prop !== 'enableHover'
})<{
  animationType: AnimationType;
  animationDelay: number;
  animationDuration: number;
  staggerIndex?: number;
  enableHover?: boolean;
}>(({ animationType, animationDelay, animationDuration, staggerIndex = 0, enableHover }) => {
  const animations = {
    slideInFromRight,
    slideInFromLeft,
    slideInFromBottom,
    fadeInScale,
    staggeredFadeIn,
    cardFloat,
    glowPulse,
  };

  const baseAnimation = animations[animationType];
  const calculatedDelay = animationType === 'staggeredFadeIn' 
    ? animationDelay + (staggerIndex * 0.1) 
    : animationDelay;

  return {
    animation: `${baseAnimation} ${animationDuration}s var(--ease-out-expo) ${calculatedDelay}s both`,
    
    ...(enableHover && {
      transition: 'all var(--animation-medium) var(--ease-out-expo)',
      '&:hover': {
        transform: 'translateY(-8px) scale(1.02)',
        animation: `${cardFloat} 2s ease-in-out infinite, ${glowPulse} 2s ease-in-out infinite`,
      },
    }),
  };
});

const AnimatedTransition: React.FC<AnimatedTransitionProps> = ({
  children,
  animation = 'fadeInScale',
  delay = 0,
  duration = 0.6,
  staggerIndex,
  hover = false,
  className,
}) => {
  return (
    <AnimatedContainer
      animationType={animation}
      animationDelay={delay}
      animationDuration={duration}
      staggerIndex={staggerIndex}
      enableHover={hover}
      className={className}
    >
      {children}
    </AnimatedContainer>
  );
};

export default AnimatedTransition;