import React from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import AsymmetricWatchPartySection from '../components/layout/AsymmetricWatchPartySection';

const PageContainer = styled(Box)(() => ({
  paddingTop: 'calc(64px + 10px)', // Header height + 10px (reduced from 32px)
  
  '@media (max-width: var(--breakpoint-sm))': {
    paddingTop: 'calc(56px + 8px)', // Smaller header spacing on mobile
  },
}));

const WatchPartyPage: React.FC = () => {
  return (
    <PageContainer>
      <AsymmetricWatchPartySection />
    </PageContainer>
  );
};

export default WatchPartyPage;
