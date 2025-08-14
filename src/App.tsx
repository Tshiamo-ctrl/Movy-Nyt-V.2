import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Box } from '@mui/material';
import theme from './theme';
import Header from './components/layout/Header';
import HomePage from './pages/HomePage';
import WatchPartyPage from './pages/WatchPartyPage';
import FriendsPage from './pages/FriendsPage';
import CatalogPage from './pages/CatalogPage';
import AuthPage from './pages/AuthPage';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ minHeight: '100vh' }}>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/watch-together" element={<WatchPartyPage />} />
          <Route path="/friends" element={<FriendsPage />} />
          <Route path="/catalog" element={<CatalogPage />} />
          <Route path="/my-rooms" element={<WatchPartyPage />} />
        </Routes>
      </Box>
    </ThemeProvider>
  );
};

export default App;
