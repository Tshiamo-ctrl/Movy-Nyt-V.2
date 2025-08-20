import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import theme from './theme';
import Header from './components/layout/Header';
import HomePage from './pages/HomePage';
import WatchPartyPage from './pages/WatchPartyPage';
import FriendsPage from './pages/FriendsPage';
import WatchPage from './pages/WatchPage';
import AuthPage from './pages/AuthPage';
import LoadingScreen from './components/ui/LoadingScreen';
import ShadowPage from './components/ui/ShadowPage';
import AnimatedTransition from './components/ui/AnimatedTransition';

const AppContainer = styled(Box)(() => ({
  minHeight: '100vh',
  background: 'var(--color-background)',
  position: 'relative',
  overflow: 'hidden',
}));

const PageContainer = styled(Box)(() => ({
  minHeight: '100vh',
  position: 'relative',
  zIndex: 1,
}));

const App: React.FC = () => {
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  // const [isLoading, setIsLoading] = useState(false);
  const [showShadow, setShowShadow] = useState(false);
  const location = useLocation();

  // Handle first load
  useEffect(() => {
    const hasVisited = localStorage.getItem('movy-nyt-visited');
    if (!hasVisited) {
      setIsFirstLoad(true);
      localStorage.setItem('movy-nyt-visited', 'true');
    } else {
      setIsFirstLoad(false);
    }
  }, []);

  // Handle route changes with shadow pages
  useEffect(() => {
    if (!isFirstLoad) {
      setShowShadow(true);
      // setIsLoading(true);
      
      const timer = setTimeout(() => {
        // setIsLoading(false);
        setShowShadow(false);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [location.pathname, isFirstLoad]);

  const handleLoadComplete = () => {
    setIsFirstLoad(false);
    // setIsLoading(false);
  };

  const getShadowVariant = () => {
    switch (location.pathname) {
      case '/friends':
        return 'friends';
      case '/watch':
      case '/catalog':
        return 'watch';
      case '/auth':
        return 'auth';
      default:
        return 'home';
    }
  };

  if (isFirstLoad) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <LoadingScreen 
          isFirstLoad={true} 
          onLoadComplete={handleLoadComplete} 
        />
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppContainer>
        {showShadow && (
          <ShadowPage variant={getShadowVariant()} />
        )}
        
        {!showShadow && (
          <PageContainer>
            <Header />
            <AnimatedTransition
              animation="fadeInScale"
              duration={0.5}
            >
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/auth" element={<AuthPage />} />
                <Route path="/watch-together" element={<WatchPartyPage />} />
                <Route path="/friends" element={<FriendsPage />} />
                <Route path="/watch" element={<WatchPage />} />
                <Route path="/catalog" element={<Navigate to="/watch" replace />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </AnimatedTransition>
          </PageContainer>
        )}
      </AppContainer>
    </ThemeProvider>
  );
};

export default App;