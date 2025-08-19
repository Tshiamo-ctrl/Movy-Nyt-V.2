import React from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import AuthSection from '../components/layout/AuthSection';

const PageContainer = styled(Box)(() => ({
  // Remove negative margin that was causing layout issues
  minHeight: '100vh',
  position: 'relative',
}));

const AuthPage: React.FC = () => {
  return (
    <PageContainer>
      <AuthSection />
    </PageContainer>
  );
};

export default AuthPage;