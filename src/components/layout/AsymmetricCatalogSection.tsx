import React, { useState, useEffect, useRef } from 'react';
import { 
  Box, 
  Typography, 
  Chip, 
  IconButton, 
  Stack,
  Button
} from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';
import {
  PlayArrow,
  ChevronLeft,
  ChevronRight,
  Star,
  TrendingUp,
  NewReleases,
  Category,
  Favorite,
  Watch
} from '@mui/icons-material';
import ContentCard from '../ui/ContentCard';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

// Keyframe animations
const fadeInUp = keyframes`
  0% { opacity: 0; transform: translateY(30px); }
  100% { opacity: 1; transform: translateY(0); }
`;

const slideInLeft = keyframes`
  0% { opacity: 0; transform: translateX(-40px); }
  100% { opacity: 1; transform: translateX(0); }
`;

const slideInRight = keyframes`
  0% { opacity: 0; transform: translateX(40px); }
  100% { opacity: 1; transform: translateX(0); }
`;

const pulseGlow = keyframes`
  0%, 100% { box-shadow: 0 0 20px rgba(0, 255, 255, 0.3); }
  50% { box-shadow: 0 0 30px rgba(0, 255, 255, 0.6); }
`;

const shimmerPlaceholder = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

// Main container with magazine-style CSS Grid
const CatalogContainer = styled(Box)(() => ({
  minHeight: '100vh',
  background: 'linear-gradient(135deg, var(--color-background) 0%, var(--color-surface) 30%, var(--color-background) 70%, var(--color-surface) 100%)',
  padding: 'calc(var(--grid-base) * 4) var(--grid-margin-mobile)',
  
  '@media (min-width: var(--breakpoint-sm))': {
    padding: 'calc(var(--grid-base) * 6) var(--grid-margin-tablet)',
  },
  '@media (min-width: var(--breakpoint-lg))': {
    padding: 'calc(var(--grid-base) * 8) var(--grid-margin-desktop)',
  },
}));

const AsymmetricGrid = styled(Box)(() => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(16, 1fr)',
  gridTemplateRows: 'auto auto auto auto auto',
  gap: 'calc(var(--grid-base) * 3)',
  maxWidth: '1800px',
  margin: '0 auto',
  gridTemplateAreas: `
    "premium premium premium premium premium premium premium premium premium premium . . . . . ."
    "featured featured featured featured featured featured featured continue continue continue continue continue continue continue continue continue"
    "featured featured featured featured featured featured featured newreleases newreleases newreleases newreleases genres genres genres genres genres"
    "featured featured featured featured featured featured featured recommendations recommendations recommendations recommendations streaming streaming streaming streaming streaming"
    "featured featured featured featured featured featured featured trending trending trending trending trending trending trending trending trending"
  `,
  
  '@media (max-width: var(--breakpoint-lg))': {
    gridTemplateColumns: 'repeat(12, 1fr)',
    gridTemplateAreas: `
      "premium premium premium premium premium premium premium premium premium premium"
      "featured featured featured featured featured featured featured featured continue continue continue continue"
      "featured featured featured featured featured featured featured featured newreleases newreleases newreleases newreleases"
      "genres genres genres genres streaming streaming streaming streaming recommendations recommendations recommendations recommendations"
      "trending trending trending trending trending trending trending trending trending trending trending trending"
    `,
  },
  
  '@media (max-width: var(--breakpoint-md))': {
    gridTemplateColumns: 'repeat(8, 1fr)',
    gridTemplateAreas: `
      "premium premium premium premium premium premium premium"
      "featured featured featured featured featured featured featured featured"
      "continue continue continue continue continue continue continue continue"
      "newreleases newreleases newreleases newreleases genres genres genres genres"
      "streaming streaming streaming streaming recommendations recommendations recommendations recommendations"
      "trending trending trending trending trending trending trending trending"
    `,
  },
  
  '@media (max-width: var(--breakpoint-sm))': {
    gridTemplateColumns: '1fr',
    gridTemplateAreas: `
      "premium"
      "featured"
      "continue"
      "newreleases"
      "genres"
      "streaming"
      "recommendations"
      "trending"
    `,
    gap: 'var(--mobile-card-gap)',
    padding: 'var(--mobile-padding)',
  },
}));

// Featured Hero Section
const FeaturedSection = styled(Box)(() => ({
  gridArea: 'featured',
  position: 'relative',
  borderRadius: 'calc(var(--grid-base) * 3)',
  overflow: 'hidden',
  background: 'var(--glass-background-strong)',
  backdropFilter: 'var(--glass-blur-strong)',
  border: 'var(--glass-border-strong)',
  minHeight: '600px',
  animation: `${slideInLeft} 1s var(--ease-out-expo) 0.2s both`,
  
  '@media (max-width: var(--breakpoint-sm))': {
    minHeight: '400px',
    marginBottom: 'var(--mobile-section-gap)',
    borderRadius: 'calc(var(--grid-base) * 2)',
  },
}));

const FeaturedImageContainer = styled(Box)(() => ({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  overflow: 'hidden',
  
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'var(--gradient-overlay-dark)',
    zIndex: 2,
  },
}));

const FeaturedImage = styled('img')(() => ({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  transition: 'transform 8s ease-in-out',
  zIndex: 1,
}));

const FeaturedContent = styled(Box)(() => ({
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  padding: 'calc(var(--grid-base) * 4)',
  zIndex: 3,
  background: 'linear-gradient(transparent 0%, rgba(0, 0, 0, 0.7) 50%, rgba(0, 0, 0, 0.9) 100%)',
}));

const FeaturedControls = styled(Box)(() => ({
  position: 'absolute',
  top: 'calc(var(--grid-base) * 3)',
  right: 'calc(var(--grid-base) * 3)',
  display: 'flex',
  gap: 'calc(var(--grid-base) * 1)',
  zIndex: 4,
}));

const ControlButton = styled(IconButton)(() => ({
  background: 'var(--glass-background)',
  backdropFilter: 'var(--glass-blur)',
  border: 'var(--glass-border)',
  color: 'var(--color-text-primary)',
  width: '48px',
  height: '48px',
  transition: 'all var(--animation-medium) var(--ease-out-expo)',
  
  '&:hover': {
    background: 'var(--glass-background-strong)',
    border: 'var(--glass-hover-border)',
    transform: 'scale(1.1)',
  },
}));

// Continue Watching Section
const ContinueSection = styled(Box)(() => ({
  gridArea: 'continue',
  background: 'var(--glass-background)',
  backdropFilter: 'var(--glass-blur)',
  border: 'var(--glass-border)',
  borderRadius: 'calc(var(--grid-base) * 2)',
  padding: 'calc(var(--grid-base) * 3)',
  animation: `${slideInRight} 1s var(--ease-out-expo) 0.4s both`,
}));

const ContinueScrollContainer = styled(Box)(() => ({
  display: 'flex',
  gap: 'calc(var(--grid-base) * 2)',
  overflowX: 'auto',
  paddingBottom: 'calc(var(--grid-base) * 1)',
  scrollbarWidth: 'thin',
  scrollbarColor: 'var(--color-primary) transparent',
  
  '&::-webkit-scrollbar': {
    height: '4px',
  },
  '&::-webkit-scrollbar-track': {
    background: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '2px',
  },
  '&::-webkit-scrollbar-thumb': {
    background: 'var(--gradient-brand)',
    borderRadius: '2px',
  },
}));



// Premium Promotion
const PremiumSection = styled(Box)(() => ({
  gridArea: 'premium',
  background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)',
  borderRadius: 'calc(var(--grid-base) * 2)',
  padding: 'calc(var(--grid-base) * 3)',
  color: 'var(--color-background)',
  position: 'relative',
  overflow: 'hidden',
  animation: `${fadeInUp} 1s var(--ease-out-expo) 0.6s both`,
  marginTop: 'calc(var(--grid-base) * 2)', // Add proper spacing from search
  
  '@media (max-width: var(--breakpoint-sm))': {
    padding: 'calc(var(--grid-base) * 2)',
    marginTop: 'calc(var(--grid-base) * 1.5)',
  },
  
  '&::before': {
    content: '""',
    position: 'absolute',
    top: '-50%',
    right: '-50%',
    width: '200%',
    height: '200%',
    background: 'radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%)',
    animation: `${pulseGlow} 3s ease-in-out infinite`,
  },
}));

// Content Discovery Sections
const ContentSection = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'area'
})<{ area: string }>(({ area }) => ({
  gridArea: area,
  background: 'var(--glass-background)',
  backdropFilter: 'var(--glass-blur)',
  border: 'var(--glass-border)',
  borderRadius: 'calc(var(--grid-base) * 2)',
  padding: 'calc(var(--grid-base) * 3)',
  animation: `${fadeInUp} 1s var(--ease-out-expo) 0.8s both`,
}));

const SectionTitle = styled(Typography)(() => ({
  color: 'var(--color-text-primary)',
  fontWeight: 700,
  marginBottom: 'calc(var(--grid-base) * 2)',
  display: 'flex',
  alignItems: 'center',
  gap: 'calc(var(--grid-base) * 1)',
}));

// Streaming Service Badges
const StreamingBadge = styled(Chip, {
  shouldForwardProp: (prop) => prop !== 'service'
})<{ service: string }>(({ service }) => {
  const serviceColors: Record<string, string> = {
    netflix: 'linear-gradient(135deg, #E50914 0%, #B20710 100%)',
    disney: 'linear-gradient(135deg, #006FFF 0%, #0040C1 100%)',
    hbo: 'linear-gradient(135deg, #673AB7 0%, #3F51B5 100%)',
    prime: 'linear-gradient(135deg, #FF9800 0%, #F57C00 100%)',
    hulu: 'linear-gradient(135deg, #1CE783 0%, #00C853 100%)',
    youtube: 'linear-gradient(135deg, #FF0000 0%, #CC0000 100%)',
  };
  
  return {
    background: serviceColors[service] || 'var(--gradient-brand)',
    color: 'white',
    fontWeight: 600,
    fontSize: '0.875rem',
    height: '36px',
    borderRadius: '18px',
    transition: 'all var(--animation-medium) var(--ease-out-expo)',
    border: '2px solid transparent',
    
    '&:hover': {
      transform: 'scale(1.05)',
      border: '2px solid rgba(255, 255, 255, 0.3)',
      boxShadow: '0 4px 16px rgba(0, 0, 0, 0.3)',
    },
    
    '& .MuiChip-label': {
      padding: '0 12px',
    },
  };
});

// Image placeholder
const ImagePlaceholder = styled(Box)(() => ({
  width: '100%',
  height: '100%',
  background: 'linear-gradient(90deg, var(--color-surface) 25%, rgba(255, 255, 255, 0.1) 50%, var(--color-surface) 75%)',
  backgroundSize: '200% 100%',
  animation: `${shimmerPlaceholder} 2s infinite`,
  borderRadius: 'calc(var(--grid-base) * 1)',
}));

// Component interfaces
interface ContentItem {
  id: string;
  title: string;
  image: string;
  description: string;
  genre: string[];
  rating: number;
  year: number;
  duration: string;
  service: string;
  progress?: number;
  size?: 'hero' | 'feature' | 'standard' | 'compact' | 'wide';
  priority?: number;
}

interface FeaturedContent extends ContentItem {
  trailer?: string;
  cast: string[];
  director: string;
  plot: string;
}

const AsymmetricCatalogSection: React.FC = () => {
  // State management
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState<ContentItem[]>([]);
  const [continueWatching, setContinueWatching] = useState<ContentItem[]>([]);
  
  // Refs for auto-rotation
  const rotationRef = useRef<ReturnType<typeof setInterval>>();
  
  // Scroll animations
  const { elementRef: heroRef, isInView: heroInView } = useScrollAnimation({ threshold: 0.3 });

  // Sample featured content
  const featuredContent: FeaturedContent[] = [
    {
      id: 'featured-1',
      title: 'Spider-Man: Into the Spider-Verse',
      image: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwxfHxzcGlkZXJtYW4lMjBtb3ZpZXxlbnwwfDB8fHwxNzU1MTMxNDMzfDA&ixlib=rb-4.1.0&q=85',
      description: 'A groundbreaking animated adventure introducing Miles Morales.',
      genre: ['Animation', 'Action', 'Adventure'],
      rating: 4.9,
      year: 2018,
      duration: '117 min',
      service: 'netflix',
      cast: ['Shameik Moore', 'Jake Johnson', 'Hailee Steinfeld'],
      director: 'Bob Persichetti',
      plot: 'Teen Miles Morales becomes Spider-Man and must work with other Spider-People from parallel dimensions to save the multiverse.',
    },
    {
      id: 'featured-2',
      title: 'Ready Player One',
      image: 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwxfHx2aXJ0dWFsJTIwcmVhbGl0eSUyMGdhbWluZ3xlbnwwfDB8fHwxNzU1MTMxNDMzfDA&ixlib=rb-4.1.0&q=85',
      description: 'A dystopian adventure set in a virtual reality universe.',
      genre: ['Action', 'Adventure', 'Sci-Fi'],
      rating: 4.7,
      year: 2018,
      duration: '140 min',
      service: 'hbo',
      cast: ['Tye Sheridan', 'Olivia Cooke', 'Ben Mendelsohn'],
      director: 'Steven Spielberg',
      plot: 'In 2045, people escape to the OASIS, and when its creator dies, his fortune is hidden in the game for anyone to find.',
    },
    {
      id: 'featured-3',
      title: 'The Martian',
      image: 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwxfHxtYXJzJTIwcGxhbmV0JTIwc3BhY2V8ZW58MHwwfHx8MTc1NTEzMTQzM3ww&ixlib=rb-4.1.0&q=85',
      description: 'A stranded astronaut must survive on Mars using ingenuity.',
      genre: ['Drama', 'Sci-Fi', 'Adventure'],
      rating: 4.8,
      year: 2015,
      duration: '144 min',
      service: 'prime',
      cast: ['Matt Damon', 'Jessica Chastain', 'Kristen Wiig'],
      director: 'Ridley Scott',
      plot: 'An astronaut becomes stranded on Mars and must devise a way to survive until a rescue mission can retrieve him.',
    }
  ];

  // Auto-rotation effect
  useEffect(() => {
    const startRotation = () => {
      rotationRef.current = setInterval(() => {
        setFeaturedIndex(prev => (prev + 1) % featuredContent.length);
      }, 8000);
    };

    startRotation();

    return () => {
      if (rotationRef.current) {
        clearInterval(rotationRef.current);
      }
    };
  }, [featuredContent.length]);

  // Sample content loading
  useEffect(() => {
    const timer = setTimeout(() => {
      // Continue watching data
      setContinueWatching([
        {
          id: 'continue-1',
          title: 'Breaking Bad',
          image: 'https://images.unsplash.com/photo-1489599540918-8c3d2de66e1a?crop=entropy&cs=srgb&fm=jpg&w=300&h=169',
          description: 'S5 E14 • Ozymandias',
          genre: ['Drama', 'Crime'],
          rating: 4.9,
          year: 2013,
          duration: '47 min',
          service: 'netflix',
          progress: 23,
        },
        {
          id: 'continue-2',
          title: 'The Mandalorian',
          image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?crop=entropy&cs=srgb&fm=jpg&w=300&h=169',
          description: 'S2 E8 • The Rescue',
          genre: ['Action', 'Sci-Fi'],
          rating: 4.7,
          year: 2020,
          duration: '45 min',
          service: 'disney',
          progress: 67,
        }
      ]);

      // Main content data
      setContent([
        {
          id: '1',
          title: 'Cosmic Odyssey',
          image: 'https://images.unsplash.com/photo-1596727147705-61a532a659bd?crop=entropy&cs=srgb&fm=jpg&w=400&h=600',
          description: 'Epic space adventure',
          genre: ['Sci-Fi', 'Adventure'],
          rating: 4.8,
          year: 2023,
          duration: '142 min',
          service: 'netflix',
          size: 'feature',
          priority: 8,
        },
        {
          id: '2',
          title: 'Neon Nights',
          image: 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?crop=entropy&cs=srgb&fm=jpg&w=400&h=600',
          description: 'Cyberpunk thriller',
          genre: ['Action', 'Thriller'],
          rating: 4.6,
          year: 2023,
          duration: '118 min',
          service: 'hbo',
          size: 'standard',
          priority: 7,
        }
      ]);
      
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const currentFeatured = featuredContent[featuredIndex];
  const genres = ['Action', 'Comedy', 'Drama', 'Sci-Fi', 'Horror', 'Family', 'Documentary'];
  const streamingServices = ['netflix', 'disney', 'hbo', 'prime', 'hulu', 'youtube'];

  const handlePrevious = () => {
    if (rotationRef.current) clearInterval(rotationRef.current);
    setFeaturedIndex(prev => prev === 0 ? featuredContent.length - 1 : prev - 1);
  };

  const handleNext = () => {
    if (rotationRef.current) clearInterval(rotationRef.current);
    setFeaturedIndex(prev => (prev + 1) % featuredContent.length);
  };

  return (
    <CatalogContainer>
      <AsymmetricGrid>
        {/* Premium Promotion */}
        <PremiumSection>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, color: 'inherit' }}>
            Try Premium free for 1 month!
          </Typography>
          <Typography variant="body2" sx={{ mb: 2, opacity: 0.9, color: 'inherit' }}>
            4K streaming, offline downloads, and exclusive content
          </Typography>
          <Button
            variant="contained"
            sx={{
              background: 'rgba(255, 255, 255, 0.2)',
              color: 'inherit',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              '&:hover': {
                background: 'rgba(255, 255, 255, 0.3)',
              }
            }}
          >
            Start Free Trial
          </Button>
        </PremiumSection>

        {/* Featured Hero Section */}
        <FeaturedSection ref={heroRef}>
          <FeaturedImageContainer>
            <FeaturedImage 
              src={currentFeatured.image} 
              alt={currentFeatured.title}
              style={{
                transform: heroInView ? 'scale(1.05)' : 'scale(1)',
              }}
            />
          </FeaturedImageContainer>
          
          <FeaturedControls>
            <ControlButton onClick={handlePrevious}>
              <ChevronLeft />
            </ControlButton>
            <ControlButton onClick={handleNext}>
              <ChevronRight />
            </ControlButton>
          </FeaturedControls>

          <FeaturedContent>
            <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
              {currentFeatured.genre.map((g) => (
                <Chip 
                  key={g} 
                  label={g} 
                  size="small" 
                  sx={{ 
                    background: 'var(--glass-background)', 
                    color: 'var(--color-text-primary)',
                    border: 'var(--glass-border)'
                  }} 
                />
              ))}
            </Stack>

            <Typography variant="h3" sx={{ color: 'white', fontWeight: 700, mb: 2 }}>
              {currentFeatured.title}
            </Typography>

            <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
              <Box display="flex" alignItems="center">
                <Star sx={{ color: 'var(--color-primary)', mr: 0.5 }} />
                <Typography variant="body1" sx={{ color: 'white', fontWeight: 600 }}>
                  {currentFeatured.rating}
                </Typography>
              </Box>
              <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                {currentFeatured.year}
              </Typography>
              <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                {currentFeatured.duration}
              </Typography>
            </Stack>

            <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.9)', mb: 3, maxWidth: '600px' }}>
              {currentFeatured.plot}
            </Typography>

            <Stack direction="row" spacing={2}>
              <Button
                variant="contained"
                startIcon={<PlayArrow />}
                sx={{
                  background: 'var(--gradient-brand)',
                  color: 'white',
                  fontWeight: 600,
                  padding: '12px 24px',
                  borderRadius: '24px',
                  '&:hover': {
                    background: 'var(--gradient-brand-hover)',
                    transform: 'scale(1.05)',
                  }
                }}
              >
                Stream Now
              </Button>
              <StreamingBadge 
                service={currentFeatured.service}
                label={currentFeatured.service.charAt(0).toUpperCase() + currentFeatured.service.slice(1)}
              />
            </Stack>
          </FeaturedContent>
        </FeaturedSection>

        {/* Continue Watching Section */}
        <ContinueSection>
          <SectionTitle variant="h5">
            <Watch sx={{ color: 'var(--color-primary)' }} />
            Continue Watching
          </SectionTitle>
          
          <ContinueScrollContainer>
            {continueWatching.map((item) => (
              <ContentCard
                key={item.id}
                id={item.id}
                title={item.title}
                image={item.image}
                description={item.description}
                size="standard"
                priority={5}
                loading={loading}
              />
            ))}
          </ContinueScrollContainer>
        </ContinueSection>

        {/* New Releases Section */}
        <ContentSection area="newreleases">
          <SectionTitle variant="h5">
            <NewReleases sx={{ color: 'var(--color-primary)' }} />
            New Releases
          </SectionTitle>
          <Stack spacing={2}>
            {content.slice(0, 3).map((item) => (
              <Box key={item.id} sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                <Box sx={{ width: '80px', aspectRatio: '2/3', borderRadius: 1, overflow: 'hidden' }}>
                  {loading ? (
                    <ImagePlaceholder />
                  ) : (
                    <img src={item.image} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  )}
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="subtitle1" sx={{ color: 'white', fontWeight: 600 }}>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'var(--color-text-secondary)', mb: 1 }}>
                    {item.description}
                  </Typography>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Star sx={{ fontSize: '16px', color: 'var(--color-primary)' }} />
                    <Typography variant="caption" sx={{ color: 'var(--color-text-secondary)' }}>
                      {item.rating}
                    </Typography>
                    <StreamingBadge service={item.service} label={item.service} size="small" />
                  </Stack>
                </Box>
              </Box>
            ))}
          </Stack>
        </ContentSection>

        {/* Genre Categories */}
        <ContentSection area="genres">
          <SectionTitle variant="h5">
            <Category sx={{ color: 'var(--color-primary)' }} />
            Genres
          </SectionTitle>
          <Stack direction="row" flexWrap="wrap" gap={1}>
            {genres.map((genre) => (
              <Chip
                key={genre}
                label={genre}
                onClick={() => {
                  // Toggle genre filter
                  setSelectedFilters(prev => 
                    prev.includes(genre) 
                      ? prev.filter(f => f !== genre)
                      : [...prev, genre]
                  );
                }}
                sx={{
                  background: selectedFilters.includes(genre) 
                    ? 'var(--gradient-brand)' 
                    : 'var(--glass-background-subtle)',
                  color: selectedFilters.includes(genre) 
                    ? 'white' 
                    : 'var(--color-text-primary)',
                  border: selectedFilters.includes(genre) 
                    ? 'none' 
                    : 'var(--glass-border)',
                  '&:hover': {
                    background: selectedFilters.includes(genre) 
                      ? 'var(--gradient-brand-hover)' 
                      : 'var(--glass-background)',
                  }
                }}
              />
            ))}
          </Stack>
        </ContentSection>

        {/* Streaming Services */}
        <ContentSection area="streaming">
          <SectionTitle variant="h5">
            <TrendingUp sx={{ color: 'var(--color-primary)' }} />
            Streaming Services
          </SectionTitle>
          <Stack direction="row" flexWrap="wrap" gap={1.5}>
            {streamingServices.map((service) => (
              <StreamingBadge
                key={service}
                service={service}
                label={service.charAt(0).toUpperCase() + service.slice(1)}
                onClick={() => {
                  // Toggle service filter
                  setSelectedFilters(prev => 
                    prev.includes(service) 
                      ? prev.filter(f => f !== service)
                      : [...prev, service]
                  );
                }}
                sx={{
                  cursor: 'pointer',
                  opacity: selectedFilters.includes(service) ? 1 : 0.7,
                  transform: selectedFilters.includes(service) ? 'scale(1.1)' : 'scale(1)',
                }}
              />
            ))}
          </Stack>
        </ContentSection>

        {/* Recommendations */}
        <ContentSection area="recommendations">
          <SectionTitle variant="h5">
            <Favorite sx={{ color: 'var(--color-primary)' }} />
            Recommended for You
          </SectionTitle>
          <Stack spacing={1.5}>
            {content.slice(0, 4).map((item) => (
              <Box key={item.id} sx={{ display: 'flex', gap: 1.5, alignItems: 'center' }}>
                <Box sx={{ width: '60px', aspectRatio: '2/3', borderRadius: 1, overflow: 'hidden' }}>
                  {loading ? (
                    <ImagePlaceholder />
                  ) : (
                    <img src={item.image} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  )}
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="body2" sx={{ color: 'white', fontWeight: 600, mb: 0.5 }}>
                    {item.title}
                  </Typography>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Star sx={{ fontSize: '14px', color: 'var(--color-primary)' }} />
                    <Typography variant="caption" sx={{ color: 'var(--color-text-secondary)' }}>
                      {item.rating}
                    </Typography>
                  </Stack>
                </Box>
              </Box>
            ))}
          </Stack>
        </ContentSection>

        {/* Trending Section */}
        <ContentSection area="trending">
          <SectionTitle variant="h5">
            <TrendingUp sx={{ color: 'var(--color-primary)' }} />
            Trending Now
          </SectionTitle>
          <Box sx={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
            gap: 2,
            '@media (max-width: 600px)': {
              gridTemplateColumns: '1fr',
              gap: 'var(--mobile-card-gap)',
            }
          }}>
            {content.map((item) => (
              <ContentCard
                key={item.id}
                id={item.id}
                title={item.title}
                image={item.image}
                description={item.description}
                size={item.size || 'compact'}
                priority={item.priority || 5}
                loading={loading}
              />
            ))}
          </Box>
        </ContentSection>
      </AsymmetricGrid>
    </CatalogContainer>
  );
};

export default AsymmetricCatalogSection;