import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Box, Stack, Typography, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import theme from './theme';

// Import all enhanced components
import LoadingScreen from './components/ui/LoadingScreen';
import ShadowPage from './components/ui/ShadowPage';
import AnimatedTransition from './components/ui/AnimatedTransition';
import MobileOptimizedCard from './components/ui/MobileOptimizedCard';
// import EnhancedMobileLayout from './components/layout/EnhancedMobileLayout';
import Header from './components/layout/Header';
import OptimizedFriendsSection from './components/layout/OptimizedFriendsSection';
import AsymmetricCatalogSection from './components/layout/AsymmetricCatalogSection';
import AuthSection from './components/layout/AuthSection';

const PreviewContainer = styled(Box)(() => ({
  minHeight: '100vh',
  background: 'var(--color-background)',
  padding: 'calc(var(--grid-base) * 2)',
}));

const SectionContainer = styled(Box)(() => ({
  marginBottom: 'calc(var(--grid-base) * 6)',
  padding: 'calc(var(--grid-base) * 3)',
  background: 'var(--glass-background-subtle)',
  borderRadius: 'calc(var(--grid-base) * 2)',
  border: 'var(--glass-border)',
}));

const SectionTitle = styled(Typography)(() => ({
  color: 'var(--color-primary)',
  fontWeight: 700,
  marginBottom: 'calc(var(--grid-base) * 3)',
  textAlign: 'center',
}));

const ComponentGrid = styled(Box)(() => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
  gap: 'calc(var(--grid-base) * 3)',
  
  '@media (max-width: var(--breakpoint-sm))': {
    gridTemplateColumns: '1fr',
    gap: 'calc(var(--grid-base) * 2)',
  },
}));

const EnhancedApp: React.FC = () => {
  const [showLoading, setShowLoading] = useState(false);
  const [showShadow, setShowShadow] = useState(false);
  const [shadowVariant, setShadowVariant] = useState<'home' | 'friends' | 'watch' | 'auth'>('home');

  const handleShowLoading = () => {
    setShowLoading(true);
    setTimeout(() => setShowLoading(false), 3000);
  };

  const handleShowShadow = (variant: 'home' | 'friends' | 'watch' | 'auth') => {
    setShadowVariant(variant);
    setShowShadow(true);
    setTimeout(() => setShowShadow(false), 2000);
  };

  if (showLoading) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <LoadingScreen 
          isFirstLoad={false} 
          onLoadComplete={() => setShowLoading(false)} 
        />
      </ThemeProvider>
    );
  }

  if (showShadow) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ShadowPage variant={shadowVariant} />
      </ThemeProvider>
    );
  }

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <PreviewContainer>
          <AnimatedTransition animation="fadeInScale" duration={0.8}>
            <Typography 
              variant="h2" 
              sx={{ 
                textAlign: 'center', 
                mb: 6,
                background: 'var(--gradient-brand)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Enhanced Movy Nyt Components
            </Typography>
          </AnimatedTransition>

          {/* Loading & Shadow Pages Demo */}
          <SectionContainer>
            <SectionTitle variant="h4">Loading & Transition System</SectionTitle>
            <Stack direction="row" spacing={2} justifyContent="center" flexWrap="wrap">
              <Button 
                variant="contained" 
                onClick={handleShowLoading}
                sx={{ background: 'var(--gradient-brand)' }}
              >
                Show Loading Screen
              </Button>
              <Button 
                variant="outlined" 
                onClick={() => handleShowShadow('home')}
                sx={{ borderColor: 'var(--color-primary)', color: 'var(--color-primary)' }}
              >
                Home Shadow
              </Button>
              <Button 
                variant="outlined" 
                onClick={() => handleShowShadow('friends')}
                sx={{ borderColor: 'var(--color-primary)', color: 'var(--color-primary)' }}
              >
                Friends Shadow
              </Button>
              <Button 
                variant="outlined" 
                onClick={() => handleShowShadow('watch')}
                sx={{ borderColor: 'var(--color-primary)', color: 'var(--color-primary)' }}
              >
                Watch Shadow
              </Button>
            </Stack>
          </SectionContainer>

          {/* Mobile Optimized Cards */}
          <SectionContainer>
            <SectionTitle variant="h4">Mobile Optimized Cards</SectionTitle>
            <ComponentGrid>
              <MobileOptimizedCard
                title="Standard Card"
                description="This card adapts to different screen sizes and maintains readability on mobile devices."
                image="https://images.unsplash.com/photo-1489599540918-8c3d2de66e1a?w=300&h=200&fit=crop"
                priority={5}
                variant="standard"
              />
              <MobileOptimizedCard
                title="High Priority Card"
                description="This card has higher priority and gets more visual prominence on larger screens."
                image="https://images.unsplash.com/photo-1596727147705-61a532a659bd?w=300&h=200&fit=crop"
                priority={8}
                variant="expanded"
              />
              <MobileOptimizedCard
                title="Compact Card"
                description="Compact variant for dense layouts."
                priority={6}
                variant="compact"
              />
            </ComponentGrid>
          </SectionContainer>

          {/* Animation Transitions */}
          <SectionContainer>
            <SectionTitle variant="h4">Animation Transitions</SectionTitle>
            <ComponentGrid>
              <AnimatedTransition animation="slideInFromLeft" delay={0.1}>
                <MobileOptimizedCard
                  title="Slide In Left"
                  description="This card slides in from the left with smooth animation."
                  priority={6}
                />
              </AnimatedTransition>
              <AnimatedTransition animation="slideInFromRight" delay={0.2}>
                <MobileOptimizedCard
                  title="Slide In Right"
                  description="This card slides in from the right with smooth animation."
                  priority={6}
                />
              </AnimatedTransition>
              <AnimatedTransition animation="slideInFromBottom" delay={0.3}>
                <MobileOptimizedCard
                  title="Slide In Bottom"
                  description="This card slides in from the bottom with smooth animation."
                  priority={6}
                />
              </AnimatedTransition>
            </ComponentGrid>
          </SectionContainer>

          {/* Enhanced Layout Sections */}
          <SectionContainer>
            <SectionTitle variant="h4">Enhanced Layout Sections</SectionTitle>
            <Stack spacing={4}>
              <Box>
                <Typography variant="h5" sx={{ color: 'var(--color-text-primary)', mb: 2 }}>
                  Header Component
                </Typography>
                <Header />
              </Box>
              
              <Box>
                <Typography variant="h5" sx={{ color: 'var(--color-text-primary)', mb: 2 }}>
                  Enhanced Auth Section
                </Typography>
                <Box sx={{ height: '400px', overflow: 'hidden', borderRadius: 2 }}>
                  <AuthSection />
                </Box>
              </Box>
            </Stack>
          </SectionContainer>

          {/* Full Page Sections */}
          <SectionContainer>
            <SectionTitle variant="h4">Full Page Sections</SectionTitle>
            <Stack spacing={6}>
              <Box>
                <Typography variant="h5" sx={{ color: 'var(--color-text-primary)', mb: 2 }}>
                  Friends Section (Mobile Optimized)
                </Typography>
                <Box sx={{ 
                  maxHeight: '600px', 
                  overflow: 'auto', 
                  border: '1px solid var(--glass-border)',
                  borderRadius: 2 
                }}>
                  <OptimizedFriendsSection />
                </Box>
              </Box>
              
              <Box>
                <Typography variant="h5" sx={{ color: 'var(--color-text-primary)', mb: 2 }}>
                  Catalog Section (Improved Spacing)
                </Typography>
                <Box sx={{ 
                  maxHeight: '600px', 
                  overflow: 'auto', 
                  border: '1px solid var(--glass-border)',
                  borderRadius: 2 
                }}>
                  <AsymmetricCatalogSection />
                </Box>
              </Box>
            </Stack>
          </SectionContainer>
        </PreviewContainer>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default EnhancedApp;