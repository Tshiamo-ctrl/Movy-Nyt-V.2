import React from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import SearchBar from '../components/ui/SearchBar';
import AsymmetricCatalogSection from '../components/layout/AsymmetricCatalogSection';
import FooterSection from '../components/layout/FooterSection';
import EnhancedMobileLayout from '../components/layout/EnhancedMobileLayout';

const PageContainer = styled(Box)(() => ({
  paddingTop: 'calc(64px + var(--grid-base) * 2)', // Header height + spacing
  
  '@media (max-width: var(--breakpoint-sm))': {
    paddingTop: 'calc(56px + var(--grid-base) * 1)', // Smaller header spacing on mobile
  },
}));

const SearchSection = styled(Box)(() => ({
  background: 'var(--color-background)',
  borderBottom: '1px solid var(--glass-border)',
  marginBottom: 'var(--mobile-section-gap)',
  
  '@media (min-width: var(--breakpoint-sm))': {
    marginBottom: 'calc(var(--grid-base) * 4)',
  },
}));

const WatchPage: React.FC = () => {
  const handleSearch = (query: string) => {
    console.log('Search query:', query);
    // Implement search functionality here
  };

  return (
    <PageContainer>
      <SearchSection>
        <SearchBar onSearch={handleSearch} />
      </SearchSection>
      
      <EnhancedMobileLayout maxWidth="1800px" padding={false}>
        <AsymmetricCatalogSection />
        <FooterSection />
      </EnhancedMobileLayout>
    </PageContainer>
  );
};

export default WatchPage;