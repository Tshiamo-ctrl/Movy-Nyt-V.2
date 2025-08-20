import React from 'react';
import { Box, Stack } from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';

const shimmerAnimation = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const ShadowContainer = styled(Box)(() => ({
  minHeight: '100vh',
  background: 'var(--color-background)',
  padding: 'calc(var(--grid-base) * 4) var(--grid-margin-mobile)',
  animation: `${fadeIn} 0.3s ease-out`,
  
  '@media (min-width: var(--breakpoint-sm))': {
    padding: 'calc(var(--grid-base) * 6) var(--grid-margin-tablet)',
  },
  '@media (min-width: var(--breakpoint-lg))': {
    padding: 'calc(var(--grid-base) * 8) var(--grid-margin-desktop)',
  },
}));

const SkeletonCard = styled(Box)(() => ({
  background: 'linear-gradient(90deg, var(--color-surface) 25%, rgba(0, 255, 255, 0.1) 50%, var(--color-surface) 75%)',
  backgroundSize: '200% 100%',
  animation: `${shimmerAnimation} 2s infinite`,
  borderRadius: 'calc(var(--grid-base) * 2)',
  border: '1px solid rgba(255, 255, 255, 0.05)',
}));

const HeaderSkeleton = styled(SkeletonCard)(() => ({
  height: '64px',
  marginBottom: 'calc(var(--grid-base) * 4)',
}));

const HeroSkeleton = styled(SkeletonCard)(() => ({
  height: '400px',
  marginBottom: 'calc(var(--grid-base) * 4)',
  
  '@media (min-width: var(--breakpoint-lg))': {
    height: '500px',
  },
}));

const CardGrid = styled(Box)(() => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
  gap: 'calc(var(--grid-base) * 3)',
  marginBottom: 'calc(var(--grid-base) * 4)',
  
  '@media (max-width: var(--breakpoint-sm))': {
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: 'calc(var(--grid-base) * 2)',
  },
}));

const ContentSkeleton = styled(SkeletonCard)(() => ({
  height: '200px',
  
  '@media (max-width: var(--breakpoint-sm))': {
    height: '150px',
  },
}));

const TextSkeleton = styled(SkeletonCard)(() => ({
  height: '20px',
  marginBottom: 'calc(var(--grid-base) * 1)',
}));

interface ShadowPageProps {
  variant?: 'home' | 'friends' | 'watch' | 'auth';
}

const ShadowPage: React.FC<ShadowPageProps> = ({ variant = 'home' }) => {
  const renderHomeSkeleton = () => (
    <>
      <HeroSkeleton />
      <CardGrid>
        {[...Array(6)].map((_, index) => (
          <ContentSkeleton key={index} />
        ))}
      </CardGrid>
    </>
  );

  const renderFriendsSkeleton = () => (
    <>
      <Stack spacing={2} sx={{ mb: 4 }}>
        <TextSkeleton sx={{ width: '40%' }} />
        <TextSkeleton sx={{ width: '60%' }} />
      </Stack>
      <CardGrid>
        {[...Array(8)].map((_, index) => (
          <ContentSkeleton key={index} sx={{ height: '250px' }} />
        ))}
      </CardGrid>
    </>
  );

  const renderWatchSkeleton = () => (
    <>
      <Stack direction="row" spacing={2} sx={{ mb: 4 }}>
        <SkeletonCard sx={{ height: '48px', flex: 1 }} />
        <SkeletonCard sx={{ height: '48px', width: '120px' }} />
      </Stack>
      <HeroSkeleton sx={{ height: '300px' }} />
      <CardGrid>
        {[...Array(12)].map((_, index) => (
          <ContentSkeleton key={index} />
        ))}
      </CardGrid>
    </>
  );

  const renderAuthSkeleton = () => (
    <Box sx={{ 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      minHeight: '80vh'
    }}>
      <SkeletonCard sx={{ 
        width: '100%', 
        maxWidth: '400px', 
        height: '500px' 
      }} />
    </Box>
  );

  const renderSkeleton = () => {
    switch (variant) {
      case 'friends':
        return renderFriendsSkeleton();
      case 'watch':
        return renderWatchSkeleton();
      case 'auth':
        return renderAuthSkeleton();
      default:
        return renderHomeSkeleton();
    }
  };

  return (
    <ShadowContainer>
      <HeaderSkeleton />
      {renderSkeleton()}
    </ShadowContainer>
  );
};

export default ShadowPage;