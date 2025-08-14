import React from 'react';
import { Box } from '@mui/material';
import AsymmetricFriendsSection from '../components/layout/AsymmetricFriendsSection';
import FooterSection from '../components/layout/FooterSection';

const FriendsPage: React.FC = () => {
  return (
    <Box>
      <AsymmetricFriendsSection />
      <FooterSection />
    </Box>
  );
};

export default FriendsPage;
