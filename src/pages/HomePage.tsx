import React from 'react';
import { Box } from '@mui/material';
import HeroSection from '../components/layout/HeroSection';
import FeaturesSection from '../components/layout/FeaturesSection';
import FooterSection from '../components/layout/FooterSection';

const HomePage: React.FC = () => {
  return (
    <Box>
      <HeroSection />
      <FeaturesSection />
      <FooterSection />
    </Box>
  );
};

export default HomePage;
