import React from 'react';
import { Box } from '@mui/material';
import CatalogSection from '../components/layout/CatalogSection';
import FooterSection from '../components/layout/FooterSection';

const CatalogPage: React.FC = () => {
  return (
    <Box>
      <CatalogSection />
      <FooterSection />
    </Box>
  );
};

export default CatalogPage;
