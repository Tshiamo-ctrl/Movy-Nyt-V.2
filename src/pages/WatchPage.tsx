import React from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import AsymmetricCatalogSection from '../components/layout/AsymmetricCatalogSection';
import FooterSection from '../components/layout/FooterSection';
import EnhancedMobileLayout from '../components/layout/EnhancedMobileLayout';

const PageContainer = styled(Box)(() => ({
  paddingTop: 'calc(64px + var(--grid-base) * 2)', // Header height + spacing
  
  '@media (max-width: var(--breakpoint-sm))': {
    paddingTop: 'calc(56px + var(--grid-base) * 1)', // Smaller header spacing on mobile
  },
}));

const WatchPage: React.FC = () => {
  return (
    <PageContainer>
      <EnhancedMobileLayout maxWidth="1800px" padding={false}>
        <AsymmetricCatalogSection />
        <FooterSection />
      </EnhancedMobileLayout>
    </PageContainer>
  );
};

export default WatchPage;