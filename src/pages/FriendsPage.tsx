import React from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import OptimizedFriendsSection from '../components/layout/OptimizedFriendsSection';
import FooterSection from '../components/layout/FooterSection';

const PageContainer = styled(Box)(() => ({
  paddingTop: 'calc(64px + var(--grid-base))', // Header height + minimal spacing
  
  '@media (max-width: var(--breakpoint-sm))': {
    paddingTop: 'calc(56px + var(--grid-base))', // Smaller header spacing on mobile
  },
}));

const FriendsPage: React.FC = () => {
  return (
    <PageContainer>
      <OptimizedFriendsSection />
      <FooterSection />
    </PageContainer>
  );
};

export default FriendsPage;