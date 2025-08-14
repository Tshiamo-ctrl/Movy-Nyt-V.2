import React from 'react';
import { Box, useTheme, useMediaQuery } from '@mui/material';
import { styled } from '@mui/material/styles';

interface MobileOptimizedLayoutProps {
  children: React.ReactNode;
  enableAsymmetric?: boolean;
  spacing?: number;
}

const ResponsiveContainer = styled(Box, {
  shouldForwardProp: (prop) => 
    prop !== 'isMobile' && 
    prop !== 'enableAsymmetric' && 
    prop !== 'spacing'
})<{
  isMobile: boolean;
  enableAsymmetric: boolean;
  spacing: number;
}>(({ isMobile, enableAsymmetric, spacing }) => ({
  display: 'grid',
  gap: `calc(var(--grid-base) * ${spacing})`,
  
  // Mobile-first responsive grid
  gridTemplateColumns: isMobile ? '1fr' : 'repeat(12, 1fr)',
  padding: isMobile 
    ? 'var(--grid-margin-mobile)' 
    : 'var(--grid-margin-tablet)',
  
  // Disable asymmetric transforms on mobile for better readability
  '& > *': {
    transform: (isMobile || !enableAsymmetric) ? 'none !important' : undefined,
    marginTop: isMobile ? '0 !important' : undefined,
  },
  
  // Responsive breakpoints
  '@media (min-width: var(--breakpoint-sm))': {
    gridTemplateColumns: 'repeat(6, 1fr)',
    padding: 'var(--grid-margin-tablet)',
    gap: `calc(var(--grid-base) * ${spacing * 1.2})`,
  },
  
  '@media (min-width: var(--breakpoint-md))': {
    gridTemplateColumns: 'repeat(8, 1fr)',
  },
  
  '@media (min-width: var(--breakpoint-lg))': {
    gridTemplateColumns: 'repeat(12, 1fr)',
    padding: 'var(--grid-margin-desktop)',
    gap: `calc(var(--grid-base) * ${spacing * 1.4})`,
  },
  
  '@media (min-width: var(--breakpoint-xl))': {
    gap: `calc(var(--grid-base) * ${spacing * 1.6})`,
  },
}));

const MobileStackContainer = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 'calc(var(--grid-base) * 3)',
  
  '& > *': {
    width: '100%',
    gridColumn: 'unset !important',
    gridRow: 'unset !important',
  },
}));

const MobileOptimizedLayout: React.FC<MobileOptimizedLayoutProps> = ({
  children,
  enableAsymmetric = true,
  spacing = 3,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  // On very small screens, use a simple stack layout
  if (isMobile) {
    return (
      <MobileStackContainer>
        {children}
      </MobileStackContainer>
    );
  }

  // On tablet and desktop, use the responsive grid
  return (
    <ResponsiveContainer
      isMobile={isMobile}
      enableAsymmetric={enableAsymmetric && !isTablet}
      spacing={spacing}
    >
      {children}
    </ResponsiveContainer>
  );
};

export default MobileOptimizedLayout;
