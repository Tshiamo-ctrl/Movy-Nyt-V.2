import React from 'react';
import { Box, Stack, useMediaQuery, useTheme } from '@mui/material';
import { styled } from '@mui/material/styles';

interface EnhancedMobileLayoutProps {
  children: React.ReactNode;
  spacing?: number;
  maxWidth?: string;
  padding?: boolean;
}

const MobileContainer = styled(Box)(() => ({
  width: '100%',
  minHeight: '100vh',
  background: 'var(--color-background)',
  
  // Ensure proper spacing from header
  paddingTop: 'calc(64px + var(--grid-base) * 2)', // Header height + spacing
  
  '@media (max-width: var(--breakpoint-sm))': {
    paddingTop: 'calc(56px + var(--grid-base) * 1)', // Smaller header on mobile
  },
}));

const ResponsiveStack = styled(Stack, {
  shouldForwardProp: (prop) => prop !== 'enablePadding' && prop !== 'maxContainerWidth'
})<{ enablePadding: boolean; maxContainerWidth: string }>(({ enablePadding, maxContainerWidth }) => ({
  width: '100%',
  maxWidth: maxContainerWidth,
  margin: '0 auto',
  
  ...(enablePadding && {
    padding: '0 var(--grid-margin-desktop)',
    
    '@media (max-width: var(--breakpoint-lg))': {
      padding: '0 var(--grid-margin-tablet)',
    },
    
    '@media (max-width: var(--breakpoint-sm))': {
      padding: '0 var(--grid-margin-mobile)',
    },
  }),
}));

const MobileGrid = styled(Box)(() => ({
  display: 'grid',
  gap: 'calc(var(--grid-base) * 3)',
  
  // Desktop grid
  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
  
  // Tablet grid
  '@media (max-width: var(--breakpoint-lg))': {
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: 'calc(var(--grid-base) * 2.5)',
  },
  
  // Mobile grid - single column with proper spacing
  '@media (max-width: var(--breakpoint-sm))': {
    gridTemplateColumns: '1fr',
    gap: 'calc(var(--grid-base) * 2)',
  },
  
  // Ensure cards don't get too small
  '& > *': {
    minWidth: 0, // Prevent grid items from overflowing
  },
}));

const EnhancedMobileLayout: React.FC<EnhancedMobileLayoutProps> = ({
  children,
  spacing = 3,
  maxWidth = '1600px',
  padding = true,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  // Adjust spacing based on screen size
  const getSpacing = () => {
    if (isMobile) return Math.max(1, spacing - 1);
    if (isTablet) return Math.max(2, spacing - 0.5);
    return spacing;
  };

  return (
    <MobileContainer>
      <ResponsiveStack
        spacing={getSpacing()}
        enablePadding={padding}
        maxContainerWidth={maxWidth}
      >
        {React.Children.map(children, (child, index) => {
          // If child is an array of cards, wrap in mobile grid
          if (React.isValidElement(child) && child.props?.children && Array.isArray(child.props.children)) {
            return (
              <MobileGrid key={index}>
                {child}
              </MobileGrid>
            );
          }
          return child;
        })}
      </ResponsiveStack>
    </MobileContainer>
  );
};

export default EnhancedMobileLayout;