import React from 'react';
import { Box } from '@mui/material';
import WatchPartySection from '../components/layout/WatchPartySection';

const WatchPartyPage: React.FC = () => {
  return (
    <Box sx={{ mt: -8 }}> {/* Negative margin to compensate for header */}
      <WatchPartySection />
    </Box>
  );
};

export default WatchPartyPage;
