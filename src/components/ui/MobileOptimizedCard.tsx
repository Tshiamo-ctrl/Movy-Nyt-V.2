import React from 'react';
import { Box, Typography, Stack, useMediaQuery, useTheme } from '@mui/material';
import { styled } from '@mui/material/styles';
import AnimatedTransition from './AnimatedTransition';

interface MobileOptimizedCardProps {
  title: string;
  description?: string;
  image?: string;
  children?: React.ReactNode;
  priority?: number;
  onClick?: () => void;
  variant?: 'standard' | 'compact' | 'expanded';
  className?: string;
}

const ResponsiveCard = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'cardPriority' && prop !== 'cardVariant'
})<{ cardPriority: number; cardVariant: string }>(({ cardPriority, cardVariant }) => {
  const priorityScale = cardPriority >= 8 ? 1.1 : cardPriority >= 6 ? 1.05 : 1;
  
  return {
    background: 'var(--glass-background)',
    backdropFilter: 'var(--glass-blur)',
    border: 'var(--glass-border)',
    borderRadius: 'calc(var(--grid-base) * 2)',
    padding: 'calc(var(--grid-base) * 2)',
    cursor: 'pointer',
    transition: 'all var(--animation-medium) var(--ease-out-expo)',
    position: 'relative',
    overflow: 'hidden',
    
    // Mobile-first responsive sizing
    minHeight: cardVariant === 'compact' ? '120px' : cardVariant === 'expanded' ? '200px' : '160px',
    
    // Ensure readable text size on mobile
    '& .MuiTypography-root': {
      fontSize: 'clamp(0.875rem, 2.5vw, 1rem)',
    },
    
    '& .MuiTypography-h6': {
      fontSize: 'clamp(1rem, 3vw, 1.25rem)',
      fontWeight: 600,
      lineHeight: 1.3,
    },
    
    '& .MuiTypography-body2': {
      fontSize: 'clamp(0.75rem, 2vw, 0.875rem)',
      lineHeight: 1.4,
    },
    
    // Mobile breakpoints
    '@media (max-width: var(--breakpoint-sm))': {
      padding: 'calc(var(--grid-base) * 1.5)',
      minHeight: cardVariant === 'compact' ? '100px' : cardVariant === 'expanded' ? '180px' : '140px',
      borderRadius: 'calc(var(--grid-base) * 1.5)',
    },
    
    // Tablet breakpoints
    '@media (min-width: var(--breakpoint-sm)) and (max-width: var(--breakpoint-md))': {
      padding: 'calc(var(--grid-base) * 2.5)',
      transform: `scale(${priorityScale})`,
    },
    
    // Desktop breakpoints
    '@media (min-width: var(--breakpoint-lg))': {
      padding: 'calc(var(--grid-base) * 3)',
      transform: `scale(${priorityScale})`,
    },
    
    '&:hover': {
      transform: `translateY(-4px) scale(${priorityScale * 1.02})`,
      boxShadow: 'var(--glass-hover-shadow)',
      border: 'var(--glass-hover-border)',
      
      '& .card-image': {
        transform: 'scale(1.05)',
      },
      
      '& .card-content': {
        transform: 'translateY(-2px)',
      },
    },
    
    '&:active': {
      transform: `translateY(-1px) scale(${priorityScale})`,
      transition: 'all var(--animation-fast) var(--ease-out-quart)',
    },
  };
});

const CardImage = styled(Box)(() => ({
  width: '100%',
  height: '80px',
  borderRadius: 'calc(var(--grid-base) * 1)',
  overflow: 'hidden',
  marginBottom: 'calc(var(--grid-base) * 1.5)',
  transition: 'transform var(--animation-medium) var(--ease-out-expo)',
  
  '& img': {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  
  '@media (max-width: var(--breakpoint-sm))': {
    height: '60px',
    marginBottom: 'calc(var(--grid-base) * 1)',
  },
  
  '@media (min-width: var(--breakpoint-md))': {
    height: '100px',
  },
}));

const CardContent = styled(Stack)(() => ({
  flex: 1,
  justifyContent: 'space-between',
  transition: 'transform var(--animation-medium) var(--ease-out-expo)',
}));

const CardTitle = styled(Typography)(() => ({
  color: 'var(--color-text-primary)',
  fontWeight: 600,
  marginBottom: 'calc(var(--grid-base) * 0.5)',
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
}));

const CardDescription = styled(Typography)(() => ({
  color: 'var(--color-text-secondary)',
  display: '-webkit-box',
  WebkitLineClamp: 3,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  lineHeight: 1.4,
}));

const MobileOptimizedCard: React.FC<MobileOptimizedCardProps> = ({
  title,
  description,
  image,
  children,
  priority = 5,
  onClick,
  variant = 'standard',
  className,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  // Adjust animation based on screen size
  const getAnimation = () => {
    if (isMobile) return 'slideInFromBottom';
    if (isTablet) return 'slideInFromLeft';
    return 'fadeInScale';
  };

  return (
    <AnimatedTransition
      animation={getAnimation()}
      delay={0.1}
      duration={0.6}
      hover={true}
      className={className}
    >
      <ResponsiveCard
        cardPriority={priority}
        cardVariant={variant}
        onClick={onClick}
      >
        {image && (
          <CardImage className="card-image">
            <img src={image} alt={title} />
          </CardImage>
        )}
        
        <CardContent className="card-content" spacing={1}>
          <CardTitle variant="h6">
            {title}
          </CardTitle>
          
          {description && (
            <CardDescription variant="body2">
              {description}
            </CardDescription>
          )}
          
          {children}
        </CardContent>
      </ResponsiveCard>
    </AnimatedTransition>
  );
};

export default MobileOptimizedCard;