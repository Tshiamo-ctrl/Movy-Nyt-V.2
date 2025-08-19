import React from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import AsymmetricFriendsSection from '../components/layout/AsymmetricFriendsSection';
import FooterSection from '../components/layout/FooterSection';
import EnhancedMobileLayout from '../components/layout/EnhancedMobileLayout';

const PageContainer = styled(Box)(() => ({
  paddingTop: 'calc(64px + var(--grid-base) * 2)', // Header height + spacing
  
  '@media (max-width: var(--breakpoint-sm))': {
    paddingTop: 'calc(56px + var(--grid-base) * 1)', // Smaller header spacing on mobile
  },
}));

const FriendsPage: React.FC = () => {
  return (
    <PageContainer>
      <EnhancedMobileLayout maxWidth="1600px" padding={false}>
        <AsymmetricFriendsSection />
        <FooterSection />
      </EnhancedMobileLayout>
    </PageContainer>
  );
};

export default FriendsPage;