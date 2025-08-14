import React from 'react';
import { Box, Typography, styled } from '@mui/material';
import { keyframes } from '@mui/system';

// Define animation keyframes
const shimmer = keyframes`
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// Types
export type ContentCardSize = 'hero' | 'feature' | 'standard' | 'compact' | 'wide';

export interface ContentCardProps {
  id: string;
  title: string;
  image: string;
  description?: string;
  size?: ContentCardSize;
  loading?: boolean;
  onClick?: () => void;
  aspectRatio?: string;
  priority?: number; // 1-10, higher means more visual prominence
  className?: string;
}

// Styled components
interface CardContainerProps {
  cardSize: ContentCardSize;
  cardAspectRatio: string;
  cardPriority: number;
}

const CardContainer = styled(Box, {
  shouldForwardProp: (prop) => 
    prop !== 'cardSize' && 
    prop !== 'cardAspectRatio' && 
    prop !== 'cardPriority'
})<CardContainerProps>(({ cardSize, cardAspectRatio, cardPriority }) => {
  // Calculate priority-based scaling
  const priorityScale = `var(--priority-scale-${cardPriority})`;
  
  // Base styles with enhanced animations and effects
  const baseStyles = {
    position: 'relative' as const,
    overflow: 'hidden' as const,
    borderRadius: 'calc(var(--grid-base) * 1.5)',
    background: cardSize === 'hero' ? 'var(--glass-background-strong)' : 'var(--glass-background)',
    backdropFilter: cardSize === 'hero' ? 'var(--glass-blur-strong)' : 'var(--glass-blur)',
    border: cardSize === 'hero' ? 'var(--glass-border-strong)' : 'var(--glass-border)',
    boxShadow: 'var(--glass-shadow)',
    transition: `all var(--animation-medium) var(--ease-out-expo)`,
    aspectRatio: cardAspectRatio,
    animation: `${fadeIn} var(--animation-slow) var(--ease-out-expo)`,
    zIndex: cardPriority,
    transform: `scale(${priorityScale})`,
    '&:hover': {
      transform: `translateY(-6px) scale(calc(${priorityScale} * 1.03))`,
      boxShadow: 'var(--glass-hover-shadow)',
      border: 'var(--glass-hover-border)',
      '&::before': {
        opacity: 1,
      },
      '& .content-overlay': {
        opacity: 1,
        background: 'var(--gradient-overlay-dark)',
      },
      '& .content-title': {
        transform: 'translateY(-8px)',
        textShadow: '0 0 20px rgba(0, 255, 255, 0.4)',
      },
      '& .content-description': {
        opacity: 1,
        transform: 'translateY(0)',
      },
      '& .card-image': {
        transform: 'scale(1.08)',
      }
    },
    '&:active': {
      transform: `translateY(-2px) scale(calc(${priorityScale} * 1.01))`,
      boxShadow: 'var(--glass-active-shadow)',
      border: 'var(--glass-active-border)',
      transition: `all var(--animation-fast) var(--ease-out-quart)`,
    },
    '&::before': {
      content: '""',
      position: 'absolute' as const,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: cardSize === 'hero' ? 'var(--gradient-overlay-hero)' : 'var(--gradient-overlay-feature)',
      opacity: 0,
      zIndex: 1,
      transition: `opacity var(--animation-medium) var(--ease-out-expo)`,
      pointerEvents: 'none' as const,
    },
    cursor: 'pointer' as const,
  };

  // Enhanced size-specific styles with magazine layout principles
  const sizeStyles = {
    hero: {
      gridColumn: 'span 6',
      height: 'var(--grid-hero-height)',
      minHeight: '400px',
      '@media (max-width: var(--breakpoint-lg))': {
        gridColumn: 'span 4',
        height: 'calc(var(--grid-hero-height) * var(--scale-factor-tablet))',
      },
      '@media (max-width: var(--breakpoint-md))': {
        gridColumn: 'span 4',
        height: 'calc(var(--grid-feature-height) * var(--scale-factor-tablet))',
      },
      '@media (max-width: var(--breakpoint-sm))': {
        gridColumn: 'span 2',
        height: 'calc(var(--grid-feature-height) * var(--scale-factor-mobile))',
        minHeight: '280px',
      },
    },
    feature: {
      gridColumn: 'span 3',
      height: 'var(--grid-feature-height)',
      '@media (max-width: var(--breakpoint-lg))': {
        gridColumn: 'span 3',
        height: 'calc(var(--grid-feature-height) * var(--scale-factor-tablet))',
      },
      '@media (max-width: var(--breakpoint-md))': {
        gridColumn: 'span 2',
        height: 'calc(var(--grid-standard-height) * var(--scale-factor-tablet))',
      },
      '@media (max-width: var(--breakpoint-sm))': {
        gridColumn: 'span 2',
        height: 'calc(var(--grid-standard-height) * var(--scale-factor-mobile))',
      },
    },
    standard: {
      gridColumn: 'span 2',
      height: 'var(--grid-standard-height)',
      '@media (max-width: var(--breakpoint-lg))': {
        height: 'calc(var(--grid-standard-height) * var(--scale-factor-tablet))',
      },
      '@media (max-width: var(--breakpoint-md))': {
        gridColumn: 'span 2',
        height: 'calc(var(--grid-standard-height) * var(--scale-factor-tablet))',
      },
      '@media (max-width: var(--breakpoint-sm))': {
        gridColumn: 'span 1',
        height: 'calc(var(--grid-compact-height) * var(--scale-factor-mobile))',
      },
    },
    compact: {
      gridColumn: 'span 1',
      height: 'var(--grid-compact-height)',
      '@media (max-width: var(--breakpoint-lg))': {
        height: 'calc(var(--grid-compact-height) * var(--scale-factor-tablet))',
      },
      '@media (max-width: var(--breakpoint-sm))': {
        gridColumn: 'span 1',
        height: 'calc(var(--grid-compact-height) * var(--scale-factor-mobile))',
      },
    },
    wide: {
      gridColumn: 'span 6',
      height: 'var(--grid-wide-height)',
      '@media (max-width: var(--breakpoint-lg))': {
        gridColumn: 'span 4',
        height: 'calc(var(--grid-wide-height) * var(--scale-factor-tablet))',
      },
      '@media (max-width: var(--breakpoint-md))': {
        gridColumn: 'span 4',
        height: 'calc(var(--grid-standard-height) * var(--scale-factor-tablet))',
      },
      '@media (max-width: var(--breakpoint-sm))': {
        gridColumn: 'span 2',
        height: 'calc(var(--grid-standard-height) * var(--scale-factor-mobile))',
      },
    },
  };

  return {
    ...baseStyles,
    ...sizeStyles[cardSize],
  };
});

const CardImage = styled('img')({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
  top: 0,
  left: 0,
  zIndex: 1,
  transition: `transform var(--animation-medium) var(--ease-out-expo)`,
  willChange: 'transform',
});

const ContentOverlay = styled(Box)({
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  padding: 'calc(var(--grid-base) * 1.5) calc(var(--grid-base) * 2)',
  background: 'var(--gradient-overlay-dark)',
  zIndex: 2,
  transition: `all var(--animation-medium) var(--ease-out-expo)`,
  opacity: 0.8,
  backdropFilter: 'var(--glass-blur-subtle)',
});

const ContentTitle = styled(Typography)({
  color: 'var(--color-text-primary)',
  fontWeight: 600,
  marginBottom: 'calc(var(--grid-base) * 0.5)',
  transition: `all var(--animation-medium) var(--ease-out-expo)`,
  textShadow: '0 2px 8px rgba(0, 0, 0, 0.6)',
  lineHeight: 1.3,
  letterSpacing: '-0.01em',
});

const ContentDescription = styled(Typography)({
  color: 'var(--color-text-secondary)',
  fontSize: '0.875rem',
  opacity: 0,
  transform: 'translateY(12px)',
  transition: `all var(--animation-medium) var(--ease-out-expo)`,
  lineHeight: 1.4,
  maxHeight: '3.6em',
  overflow: 'hidden',
  display: '-webkit-box',
  WebkitLineClamp: 3,
  WebkitBoxOrient: 'vertical',
});

const LoadingSkeleton = styled(Box)<{ size: ContentCardSize }>(({ size }) => ({
  width: '100%',
  height: '100%',
  background: 'linear-gradient(90deg, var(--color-surface) 25%, rgba(65, 105, 225, 0.1) 50%, var(--color-surface) 75%)',
  backgroundSize: '200% 100%',
  animation: `${shimmer} 2s infinite`,
  borderRadius: 'var(--grid-base)',
  ...{
    hero: { gridColumn: 'span 6' },
    feature: { gridColumn: 'span 3' },
    standard: { gridColumn: 'span 2' },
    compact: { gridColumn: 'span 1' },
    wide: { gridColumn: 'span 6' },
  }[size],
}));

const ContentCard: React.FC<ContentCardProps> = ({
  title,
  image,
  description,
  size = 'standard',
  loading = false,
  onClick,
  aspectRatio = '16/9',
  priority = 5,
  className,
}) => {
  if (loading) {
    return <LoadingSkeleton size={size} className={className} />;
  }

  return (
    <CardContainer 
      cardSize={size} 
      cardAspectRatio={aspectRatio} 
      cardPriority={priority}
      onClick={onClick}
      className={className}
    >
      <CardImage src={image} alt={title} className="card-image" />
      <ContentOverlay className="content-overlay">
        <ContentTitle 
          variant={size === 'hero' ? 'h4' : size === 'feature' ? 'h5' : 'h6'} 
          className="content-title"
        >
          {title}
        </ContentTitle>
        {description && (
          <ContentDescription className="content-description">
            {description}
          </ContentDescription>
        )}
      </ContentOverlay>
    </CardContainer>
  );
};

export default ContentCard;