import React from 'react';
import { Box } from '@mui/material';
import FriendsSection from '../components/layout/FriendsSection';
import FooterSection from '../components/layout/FooterSection';

const FriendsPage: React.FC = () => {
  return (
    <Box>
      <FriendsSection />
      <FooterSection />
    </Box>
  );
};

export default FriendsPage;
