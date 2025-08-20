import React from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import AsymmetricFriendsSection from '../components/layout/AsymmetricFriendsSection';
import FooterSection from '../components/layout/FooterSection';
import EnhancedMobileLayout from '../components/layout/EnhancedMobileLayout';

const PageContainer = styled(Box)(() => ({
  paddingTop: 'calc(64px + 32px)', // Header height + 32px (max 100px total)
  
  '@media (max-width: var(--breakpoint-sm))': {
    paddingTop: 'calc(56px + 24px)', // Smaller header spacing on mobile
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