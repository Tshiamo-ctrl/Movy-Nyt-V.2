import React from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import SearchBar from '../components/ui/SearchBar';
import AsymmetricCatalogSection from '../components/layout/AsymmetricCatalogSection';
import FooterSection from '../components/layout/FooterSection';
import EnhancedMobileLayout from '../components/layout/EnhancedMobileLayout';

const PageContainer = styled(Box)(() => ({
  paddingTop: 'calc(64px + 10px)', // Header height + 10px (reduced from 32px)
  
  '@media (max-width: var(--breakpoint-sm))': {
    paddingTop: 'calc(56px + 8px)', // Smaller header spacing on mobile
  },
}));

const SearchSection = styled(Box)(() => ({
  background: 'var(--color-background)',
  borderBottom: '1px solid var(--glass-border)',
  marginBottom: '10px', // Reduced from 32px to 10px
  
  '@media (min-width: var(--breakpoint-sm))': {
    marginBottom: '10px', // Reduced from 40px to 10px
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