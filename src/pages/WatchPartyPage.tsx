import React from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import AsymmetricWatchPartySection from '../components/layout/AsymmetricWatchPartySection';

const PageContainer = styled(Box)(() => ({
  paddingTop: 'calc(64px + 32px)', // Header height + 32px (max 100px total)
  
  '@media (max-width: var(--breakpoint-sm))': {
    paddingTop: 'calc(56px + 24px)', // Smaller header spacing on mobile
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
