import React from 'react';
import { Box } from '@mui/material';
import AuthSection from '../components/layout/AuthSection';

const AuthPage: React.FC = () => {
  return (
    <Box sx={{ mt: -8 }}> {/* Negative margin to compensate for header */}
      <AuthSection />
    </Box>
  );
};

export default AuthPage;
