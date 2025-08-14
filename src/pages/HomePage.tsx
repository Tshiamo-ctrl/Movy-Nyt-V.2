import React, { useEffect } from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
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
  margin: 'calc(var(--grid-base) * 8) auto',
  maxWidth: '400px',
  opacity: 0.3,
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
    <SmoothScrollContainer>
      {/* Main Hero Section with Asymmetric Design */}
      <AsymmetricHeroSection />
      
      {/* Subtle divider */}
      <SectionDivider />
      
      {/* Enhanced Features Section */}
      <AsymmetricFeaturesSection />
      
      {/* Footer */}
      <FooterSection />
    </SmoothScrollContainer>
  );
};

export default HomePage;
