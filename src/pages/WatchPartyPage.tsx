import React from 'react';
import { Box } from '@mui/material';
import AsymmetricWatchPartySection from '../components/layout/AsymmetricWatchPartySection';

const WatchPartyPage: React.FC = () => {
  return (
    <Box sx={{ mt: -8 }}> {/* Negative margin to compensate for header */}
      <AsymmetricWatchPartySection />
    </Box>
  );
};

export default WatchPartyPage;
