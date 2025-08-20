import React, { useEffect } from 'react';
import { Box, Typography, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import { TrendingUp, Group, PlayArrow } from '@mui/icons-material';
import AsymmetricHeroSection from '../components/layout/AsymmetricHeroSection';
import AsymmetricFeaturesSection from '../components/layout/AsymmetricFeaturesSection';
import FooterSection from '../components/layout/FooterSection';

// Styled components for smooth scrolling and progressive enhancement
const SmoothScrollContainer = styled(Box)(() => ({
  scrollBehavior: 'smooth',
  '& *': {
    scrollBehavior: 'smooth',
  },
}));

const SectionDivider = styled(Box)(() => ({
  height: '1px',
  background: 'linear-gradient(90deg, transparent 0%, var(--color-primary) 50%, transparent 100%)',
  margin: '16px auto', // Reduced from calc(var(--grid-base) * 4) to 16px for consistent tight spacing
  maxWidth: '400px',
  opacity: 0.3,
}));

const PageContainer = styled(Box)(() => ({
  paddingTop: 'calc(64px + 4px)', // Header height + 4px (reduced from 10px to 4px for ~10mm on 16" screen)
  
  '@media (max-width: var(--breakpoint-sm))': {
    paddingTop: 'calc(56px + 3px)', // Smaller header spacing on mobile
  },
}));

// New content section to fill negative space

const ContentPreviewSection = styled(Box)(() => ({
  background: 'var(--color-surface)',
  padding: '8px 0', // Reduced from 16px to 8px to eliminate negative space
  margin: '4px 0', // Reduced from 16px to 4px to eliminate negative space
}));

const ContentPreviewGrid = styled(Box)(() => ({
  maxWidth: '1200px',
  margin: '0 auto',
  padding: '0 var(--grid-margin-mobile)',
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', // Reduced from 280px to 250px
  gap: '16px', // Reduced from calc(var(--grid-base) * 2) to 16px
  
  '@media (min-width: var(--breakpoint-sm))': {
    padding: '0 var(--grid-margin-tablet)',
  },
  '@media (min-width: var(--breakpoint-lg))': {
    padding: '0 var(--grid-margin-desktop)',
  },
}));

const PreviewCard = styled(Box)(() => ({
  background: 'var(--glass-background)',
  backdropFilter: 'var(--glass-blur)',
  border: 'var(--glass-border)',
  borderRadius: 'calc(var(--grid-base) * 1.5)', // Reduced from 2 to 1.5
  padding: 'calc(var(--grid-base) * 2)', // Reduced from 2.5 to 2
  transition: 'all var(--animation-medium) var(--ease-out-expo)',
  cursor: 'pointer',
  
  '&:hover': {
    transform: 'translateY(-4px)', // Reduced from -6px to -4px
    boxShadow: 'var(--glass-hover-shadow)',
    border: 'var(--glass-hover-border)',
  },
}));

const HomePage: React.FC = () => {
  useEffect(() => {
    // Smooth scroll behavior for anchor links
    const handleAnchorClick = (e: Event) => {
      const target = e.target as HTMLAnchorElement;
      if (target.hash) {
        e.preventDefault();
        const element = document.querySelector(target.hash);
        if (element) {
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        }
      }
    };

    // Add event listener for anchor links
    document.addEventListener('click', handleAnchorClick);

    // Preload images for better performance
    const preloadImages = [
      'https://images.unsplash.com/photo-1489599540918-8c3d2de66e1a?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwxfHxtb3ZpZSUyMHRoZWF0ZXIlMjBjaW5lbWElMjBzY3JlZW5zJTIwZGFyayUyMGF0bW9zcGhlcmV8ZW58MHwwfHx8MTc1NTEzMTQzM3ww&ixlib=rb-4.1.0&q=85',
      'https://images.unsplash.com/photo-1596727147705-61a532a659bd?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwxfHxzcGFjZSUyMG1vdmllJTIwcG9zdGVyfGVufDB8MHx8fDE3NTUxMzE0MzN8MA&ixlib=rb-4.1.0&q=85',
    ];

    preloadImages.forEach(src => {
      const img = new Image();
      img.src = src;
    });

    return () => {
      document.removeEventListener('click', handleAnchorClick);
    };
  }, []);

  return (
    <PageContainer>
      <SmoothScrollContainer>
        {/* Main Hero Section with Asymmetric Design */}
        <AsymmetricHeroSection />
        
        {/* Content Preview Section - fills more negative space */}
        <ContentPreviewSection>
          <Box sx={{ textAlign: 'center', mb: '8px' }}> {/* Reduced from 16px to 8px to eliminate negative space */}
            <Stack direction="row" alignItems="center" justifyContent="center" spacing={1} sx={{ mb: 1 }}> {/* Reduced from 1.5 to 1 */}
              <TrendingUp sx={{ color: 'primary.main' }} />
              <Typography variant="h3" sx={{ color: 'white', fontWeight: 700 }}>
                What&apos;s Hot Right Now
              </Typography>
            </Stack>
            <Typography variant="body1" sx={{ color: 'text.secondary', fontSize: '1.125rem' }}>
              Join the conversation around trending content
            </Typography>
          </Box>
          
          <ContentPreviewGrid>
            <PreviewCard>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Box sx={{ 
                  width: 60, 
                  height: 60, 
                  borderRadius: '50%', 
                  background: 'var(--gradient-brand)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <PlayArrow sx={{ color: 'white', fontSize: '1.5rem' }} />
                </Box>
                <Box>
                  <Typography variant="h6" sx={{ color: 'white', fontWeight: 600, mb: 0.5 }}>
                    Cosmic Odyssey
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Epic space adventure with friends
                  </Typography>
                </Box>
              </Stack>
            </PreviewCard>
            
            <PreviewCard>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Box sx={{ 
                  width: 60, 
                  height: 60, 
                  borderRadius: '50%', 
                  background: 'var(--gradient-brand)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Group sx={{ color: 'white', fontSize: '1.5rem' }} />
                </Box>
                <Box>
                  <Typography variant="h6" sx={{ color: 'white', fontWeight: 600, mb: 0.5 }}>
                    Watch Together
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Synchronized streaming experience
                  </Typography>
                </Box>
              </Stack>
            </PreviewCard>
            
            <PreviewCard>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Box sx={{ 
                  width: 60, 
                  height: 60, 
                  borderRadius: '50%', 
                  background: 'var(--gradient-brand)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <TrendingUp sx={{ color: 'white', fontSize: '1.5rem' }} />
                </Box>
                <Box>
                  <Typography variant="h6" sx={{ color: 'white', fontWeight: 600, mb: 0.5 }}>
                    Trending Now
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Discover what&apos;s popular
                  </Typography>
                </Box>
              </Stack>
            </PreviewCard>
          </ContentPreviewGrid>
        </ContentPreviewSection>
        
        {/* Subtle divider */}
        <SectionDivider />
        
        {/* Enhanced Features Section */}
        <AsymmetricFeaturesSection />
        
        {/* Footer */}
        <FooterSection />
      </SmoothScrollContainer>
    </PageContainer>
  );
};

export default HomePage;