import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Stack, Avatar, AvatarGroup } from '@mui/material';
import { useScrollAnimation, useStaggeredAnimation } from '../../hooks/useScrollAnimation';
import { styled, keyframes } from '@mui/material/styles';
import { 
  PlayArrow, 
  Group, 
  LocalMovies, 
  Chat, 
  Sync, 
  Security,
  Star,
  TrendingUp
} from '@mui/icons-material';
import ContentCard from '../ui/ContentCard';
import ContentGrid from '../ui/ContentGrid';

// Animations
const slideInFromBottom = keyframes`
  0% { opacity: 0; transform: translateY(50px); }
  100% { opacity: 1; transform: translateY(0); }
`;

const rotateIn = keyframes`
  0% { opacity: 0; transform: rotate(-10deg) scale(0.8); }
  100% { opacity: 1; transform: rotate(0deg) scale(1); }
`;

const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

// Styled components
const FeaturesContainer = styled(Box)(() => ({
  position: 'relative',
  background: `linear-gradient(180deg, var(--color-background) 0%, var(--color-surface) 50%, var(--color-background) 100%)`,
  overflow: 'hidden',
  paddingTop: 'calc(var(--grid-base) * 15)',
  paddingBottom: 'calc(var(--grid-base) * 15)',
}));

const AsymmetricLayout = styled(Box)(() => ({
  maxWidth: '1600px',
  margin: '0 auto',
  padding: 'var(--grid-margin-mobile)',
  display: 'grid',
  gridTemplateColumns: 'repeat(12, 1fr)',
  gap: 'calc(var(--grid-base) * 4)',
  alignItems: 'start',
  
  '@media (min-width: var(--breakpoint-sm))': {
    padding: 'var(--grid-margin-tablet)',
  },
  '@media (min-width: var(--breakpoint-lg))': {
    padding: 'var(--grid-margin-desktop)',
  },
}));

const HeaderSection = styled(Box)(() => ({
  gridColumn: '1 / span 8',
  marginBottom: 'calc(var(--grid-base) * 6)',
  animation: `${slideInFromBottom} 1s var(--ease-out-expo)`,
  
  '@media (max-width: var(--breakpoint-md))': {
    gridColumn: 'span 12',
  },
}));

const FeatureCard = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'featured'
})<{ featured?: boolean }>(({ featured }) => ({
  background: featured ? 'var(--glass-background-strong)' : 'var(--glass-background)',
  backdropFilter: 'var(--glass-blur)',
  border: featured ? 'var(--glass-border-strong)' : 'var(--glass-border)',
  borderRadius: 'calc(var(--grid-base) * 2)',
  padding: 'calc(var(--grid-base) * 4)',
  position: 'relative',
  overflow: 'hidden',
  transition: `all var(--animation-medium) var(--ease-out-expo)`,
  height: '100%',
  
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: featured 
      ? 'var(--gradient-overlay-hero)' 
      : 'var(--gradient-overlay-feature)',
    opacity: 0,
    transition: `opacity var(--animation-medium) var(--ease-out-expo)`,
    pointerEvents: 'none',
  },
  
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: 'var(--glass-hover-shadow)',
    border: 'var(--glass-hover-border)',
    '&::before': {
      opacity: 1,
    },
  },
}));

const IconWrapper = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'featured'
})<{ featured?: boolean }>(({ featured }) => ({
  width: featured ? '100px' : '80px',
  height: featured ? '100px' : '80px',
  borderRadius: '50%',
  background: 'var(--gradient-brand)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: 'calc(var(--grid-base) * 3)',
  boxShadow: 'var(--glass-shadow)',
  position: 'relative',
  zIndex: 2,
  transition: `all var(--animation-medium) var(--ease-out-expo)`,
  
  '& svg': {
    fontSize: featured ? '2.5rem' : '2rem',
    color: 'var(--color-background)',
  },
  
  '&:hover': {
    transform: 'scale(1.1) rotate(5deg)',
    boxShadow: 'var(--glass-hover-shadow)',
  },
}));

const StatsWidget = styled(Box)(() => ({
  gridColumn: '9 / span 4',
  background: 'var(--glass-background)',
  backdropFilter: 'var(--glass-blur)',
  border: 'var(--glass-border)',
  borderRadius: 'calc(var(--grid-base) * 2)',
  padding: 'calc(var(--grid-base) * 3)',
  animation: `${rotateIn} 1s var(--ease-out-expo) 0.5s both`,
  
  '@media (max-width: var(--breakpoint-md))': {
    gridColumn: 'span 12',
    order: -1,
  },
}));

const TrendingSection = styled(Box)(() => ({
  gridColumn: 'span 12',
  marginTop: 'calc(var(--grid-base) * 8)',
}));

const ShimmerText = styled(Typography)(() => ({
  background: 'linear-gradient(90deg, var(--color-text-secondary) 25%, var(--color-primary) 50%, var(--color-text-secondary) 75%)',
  backgroundSize: '200% 100%',
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  animation: `${shimmer} 2s ease-in-out infinite`,
}));

const AsymmetricFeaturesSection: React.FC = () => {
  const navigate = useNavigate();
  const [stats] = useState({
    activeUsers: 1247,
    watchParties: 89,
    moviesWatched: 15623,
    rating: 4.8
  });

  // Scroll animation hooks
  const { elementRef: headerRef, isInView: headerInView } = useScrollAnimation({ 
    threshold: 0.3, 
    delay: 200 
  });
  const { elementRef: statsRef, isInView: statsInView } = useScrollAnimation({ 
    threshold: 0.5, 
    delay: 400 
  });
  const { containerRef: featuresRef, isItemAnimated } = useStaggeredAnimation(6, 150);
  const { elementRef: trendingRef, isInView: trendingInView } = useScrollAnimation({ 
    threshold: 0.2, 
    delay: 300 
  });

  const features = [
    {
      icon: <PlayArrow />,
      title: 'Synchronized Streaming',
      description: 'Watch together in perfect sync across multiple platforms. No more "3, 2, 1, play!" - our technology handles the timing.',
      featured: true,
      delay: 0,
      gridColumn: 'span 6',
    },
    {
      icon: <Chat />,
      title: 'Real-time Chat',
      description: 'Share reactions, jokes, and commentary with friends while watching. Express yourself with emojis and reactions.',
      delay: 0.2,
      gridColumn: 'span 3',
    },
    {
      icon: <Security />,
      title: 'Privacy First',
      description: 'Your watch history and conversations stay private. We never track or store your personal viewing data.',
      delay: 0.4,
      gridColumn: 'span 3',
    },
    {
      icon: <Group />,
      title: 'Friend Networks',
      description: 'Build lasting connections through shared entertainment. Discover what your friends are watching and get personalized recommendations.',
      delay: 0.6,
      gridColumn: 'span 4',
    },
    {
      icon: <Sync />,
      title: 'Multi-Platform',
      description: 'Works with Netflix, Disney+, YouTube, and more. One app to rule them all.',
      delay: 0.8,
      gridColumn: 'span 4',
    },
    {
      icon: <LocalMovies />,
      title: 'Content Discovery',
      description: 'Explore trending content, friend recommendations, and curated collections. Never run out of things to watch.',
      delay: 1.0,
      gridColumn: 'span 4',
    },
  ];

  const trendingContent = [
    {
      id: '1',
      title: 'Cosmic Odyssey',
      image: 'https://images.unsplash.com/photo-1596727147705-61a532a659bd?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwxfHxzcGFjZSUyMG1vdmllJTIwcG9zdGVyfGVufDB8MHx8fDE3NTUxMzE0MzN8MA&ixlib=rb-4.1.0&q=85',
      description: 'Epic space adventure',
      size: 'hero' as const,
      priority: 10,
    },
    {
      id: '2',
      title: 'Neon Nights',
      image: 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwxfHxuZW9uJTIwY2l0eSUyMG5pZ2h0fGVufDB8MHx8fDE3NTUxMzE0MzN8MA&ixlib=rb-4.1.0&q=85',
      description: 'Cyberpunk thriller',
      size: 'feature' as const,
      priority: 8,
    },
    {
      id: '3',
      title: 'Ocean Depths',
      image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwxfHxvY2VhbiUyMGRlZXB8ZW58MHwwfHx8MTc1NTEzMTQzM3ww&ixlib=rb-4.1.0&q=85',
      description: 'Deep sea documentary',
      size: 'standard' as const,
      priority: 6,
    },
    {
      id: '4',
      title: 'Mountain Peak',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMHBlYWt8ZW58MHwwfHx8MTc1NTEzMTQzM3ww&ixlib=rb-4.1.0&q=85',
      description: 'Adventure documentary',
      size: 'standard' as const,
      priority: 7,
    },
    {
      id: '5',
      title: 'City Lights',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwxfHx1cmJhbiUyMG5pZ2h0JTIwY2l0eXxlbnwwfDB8fHwxNzU1MTMxNDMzfDA&ixlib=rb-4.1.0&q=85',
      description: 'Urban drama',
      size: 'compact' as const,
      priority: 5,
    },
    {
      id: '6',
      title: 'Forest Tales',
      image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwxfHxmb3Jlc3QlMjBuYXR1cmV8ZW58MHwwfHx8MTc1NTEzMTQzM3ww&ixlib=rb-4.1.0&q=85',
      description: 'Nature mystery',
      size: 'wide' as const,
      priority: 6,
    },
  ];

  return (
    <FeaturesContainer>
      <AsymmetricLayout>
        {/* Header Section */}
        <HeaderSection 
          ref={headerRef}
          sx={{
            opacity: headerInView ? 1 : 0,
            transform: headerInView ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <ShimmerText variant="h2" sx={{ mb: 2, fontWeight: 700 }}>
            Why Choose Movy Nyt?
          </ShimmerText>
          
          <Typography 
            variant="body1" 
            sx={{ 
              color: 'text.secondary',
              fontSize: '1.25rem',
              lineHeight: 1.6,
              maxWidth: '600px'
            }}
          >
            Experience the future of social streaming with cutting-edge features designed for seamless entertainment and meaningful connections.
          </Typography>
        </HeaderSection>

        {/* Stats Widget */}
        <StatsWidget 
          ref={statsRef}
          sx={{
            opacity: statsInView ? 1 : 0,
            transform: statsInView ? 'scale(1) rotate(0deg)' : 'scale(0.8) rotate(-5deg)',
            transition: 'all 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
          }}
        >
          <Stack spacing={3}>
            <Box textAlign="center">
              <Typography variant="h6" sx={{ color: 'primary.main', fontWeight: 600, mb: 1 }}>
                Community Stats
              </Typography>
            </Box>
            
            <Stack direction="row" justifyContent="space-between">
              <Box textAlign="center">
                <Typography variant="h4" sx={{ color: 'white', fontWeight: 700 }}>
                  {stats.activeUsers.toLocaleString()}
                </Typography>
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                  Active Users
                </Typography>
              </Box>
              <Box textAlign="center">
                <Typography variant="h4" sx={{ color: 'white', fontWeight: 700 }}>
                  {stats.watchParties}
                </Typography>
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                  Live Parties
                </Typography>
              </Box>
            </Stack>
            
            <Box textAlign="center">
              <Stack direction="row" alignItems="center" justifyContent="center" spacing={1}>
                <Star sx={{ color: 'warning.main' }} />
                <Typography variant="h5" sx={{ color: 'white', fontWeight: 600 }}>
                  {stats.rating}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  / 5.0 rating
                </Typography>
              </Stack>
            </Box>

            <AvatarGroup 
              max={4} 
              sx={{ 
                justifyContent: 'center',
                '& .MuiAvatar-root': { 
                  border: '2px solid var(--color-primary)',
                  width: 32,
                  height: 32
                } 
              }}
            >
              <Avatar src="https://i.pravatar.cc/150?img=11" />
              <Avatar src="https://i.pravatar.cc/150?img=12" />
              <Avatar src="https://i.pravatar.cc/150?img=13" />
              <Avatar src="https://i.pravatar.cc/150?img=14" />
            </AvatarGroup>
          </Stack>
        </StatsWidget>

        {/* Feature Cards Grid */}
        <Box ref={featuresRef} sx={{ display: 'contents' }}>
          {features.map((feature, index) => (
            <Box 
              key={index}
              sx={{ 
                gridColumn: feature.gridColumn,
                opacity: isItemAnimated(index) ? 1 : 0,
                transform: isItemAnimated(index) ? 'translateY(0)' : 'translateY(50px)',
                transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
                '@media (max-width: var(--breakpoint-md))': {
                  gridColumn: feature.featured ? 'span 12' : 'span 6',
                },
                '@media (max-width: var(--breakpoint-sm))': {
                  gridColumn: 'span 12',
                },
              }}
            >
            <FeatureCard featured={feature.featured}>
              <IconWrapper featured={feature.featured}>
                {feature.icon}
              </IconWrapper>
              
              <Typography 
                variant={feature.featured ? "h4" : "h5"} 
                sx={{ 
                  mb: 2, 
                  color: 'white',
                  fontWeight: 600,
                  position: 'relative',
                  zIndex: 2
                }}
              >
                {feature.title}
              </Typography>
              
              <Typography 
                variant="body1" 
                sx={{ 
                  color: 'text.secondary',
                  lineHeight: 1.6,
                  position: 'relative',
                  zIndex: 2,
                  fontSize: feature.featured ? '1.125rem' : '1rem'
                }}
              >
                {feature.description}
              </Typography>
            </FeatureCard>
            </Box>
          ))}
        </Box>

        {/* Trending Content Section */}
        <TrendingSection 
          ref={trendingRef}
          sx={{
            opacity: trendingInView ? 1 : 0,
            transform: trendingInView ? 'translateY(0)' : 'translateY(40px)',
            transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <Box sx={{ mb: 4, textAlign: 'center' }}>
            <Stack direction="row" alignItems="center" justifyContent="center" spacing={1} sx={{ mb: 2 }}>
              <TrendingUp sx={{ color: 'primary.main' }} />
              <Typography variant="h3" sx={{ color: 'white', fontWeight: 700 }}>
                Trending Now
              </Typography>
            </Stack>
            
            <Typography variant="body1" sx={{ color: 'text.secondary', fontSize: '1.125rem' }}>
              See what the community is watching and join the conversation
            </Typography>
          </Box>

          <ContentGrid spacing={3} overlap={true} asymmetric={true}>
            {trendingContent.map((content, index) => (
              <Box 
                key={content.id}
                sx={{ 
                  animation: `${slideInFromBottom} 0.8s var(--ease-out-expo) ${1.2 + index * 0.1}s both`
                }}
              >
                <ContentCard
                  id={content.id}
                  title={content.title}
                  image={content.image}
                  description={content.description}
                  size={content.size}
                  priority={content.priority}
                  onClick={() => navigate('/watch')}
                />
              </Box>
            ))}
          </ContentGrid>
        </TrendingSection>
      </AsymmetricLayout>
    </FeaturesContainer>
  );
};

export default AsymmetricFeaturesSection;
