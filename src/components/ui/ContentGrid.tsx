import React from 'react';
import { Box, styled } from '@mui/material';

interface ContentGridProps {
  children: React.ReactNode;
  spacing?: number; // Multiplier of grid-base
  overlap?: boolean; // Whether to allow items to overlap
  asymmetric?: boolean; // Whether to use asymmetric layout
  className?: string;
}

const StyledGrid = styled(Box, {
  shouldForwardProp: (prop) => 
    prop !== 'spacing' && 
    prop !== 'overlap' && 
    prop !== 'asymmetric'
})<{
  spacing: number;
  overlap: boolean;
  asymmetric: boolean;
}>(({ spacing, overlap, asymmetric }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(6, 1fr)',
  gap: `calc(var(--grid-base) * ${spacing})`,
  position: 'relative',
  margin: '0 auto',
  width: '100%',
  maxWidth: '1400px',
  padding: 'var(--grid-margin-mobile)',
  
  // Enhanced responsive adjustments with custom breakpoints
  '@media (min-width: var(--breakpoint-sm))': {
    padding: 'var(--grid-margin-tablet)',
    gap: `calc(var(--grid-base) * ${spacing * 1.2})`,
  },
  '@media (min-width: var(--breakpoint-lg))': {
    padding: 'var(--grid-margin-desktop)',
    gap: `calc(var(--grid-base) * ${spacing * 1.4})`,
  },
  '@media (min-width: var(--breakpoint-xl))': {
    maxWidth: '1600px',
    gap: `calc(var(--grid-base) * ${spacing * 1.6})`,
  },
  '@media (min-width: var(--breakpoint-xxl))': {
    maxWidth: '1800px',
  },
  
  // Enhanced overlap styles
  ...(overlap && {
    '& > *': {
      position: 'relative',
      zIndex: 1,
    },
    '& > *:hover': {
      zIndex: 15,
    },
    '& > *:nth-child(odd)': {
      marginTop: 'var(--offset-small)',
    },
    '& > *:nth-child(even)': {
      marginTop: 'calc(var(--offset-small) * -0.5)',
    },
  }),
  
  // Enhanced asymmetric layout styles for magazine layouts
  ...(asymmetric && {
    gridAutoFlow: 'dense',
    alignItems: 'start',
    '& > *:nth-of-type(3n+1)': {
      transform: 'translateY(var(--offset-medium))',
    },
    '& > *:nth-of-type(4n+2)': {
      transform: 'translateY(var(--offset-small))',
    },
    '& > *:nth-of-type(5n+3)': {
      transform: 'translateY(var(--offset-large))',
    },
    '& > *:nth-of-type(6n+4)': {
      transform: 'translateY(calc(var(--offset-medium) * -1))',
    },
    '& > *:nth-of-type(7n+5)': {
      transform: 'translateY(var(--offset-xl))',
    },
    // Special handling for mobile
    '@media (max-width: var(--breakpoint-sm))': {
      '& > *': {
        transform: 'none !important',
      },
    },
  }),
}));

const ContentGrid: React.FC<ContentGridProps> = ({
  children,
  spacing = 3,
  overlap = false,
  asymmetric = false,
  className,
}) => {
  return (
    <StyledGrid 
      spacing={spacing} 
      overlap={overlap} 
      asymmetric={asymmetric}
      className={className}
    >
      {children}
    </StyledGrid>
  );
};

export default ContentGrid;