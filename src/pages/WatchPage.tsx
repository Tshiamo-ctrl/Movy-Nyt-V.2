import React from 'react';
import { Box } from '@mui/material';
import AsymmetricCatalogSection from '../components/layout/AsymmetricCatalogSection';
import FooterSection from '../components/layout/FooterSection';

const WatchPage: React.FC = () => {
  return (
    <Box>
      <AsymmetricCatalogSection />
      <FooterSection />
    </Box>
  );
};

export default WatchPage;