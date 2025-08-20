import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Stack, Chip, Avatar, AvatarGroup, Badge } from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';
import { PersonAdd, PlayArrow, Group } from '@mui/icons-material';
import GlowButton from '../ui/GlowButton';
import ContentCard from '../ui/ContentCard';

// Keyframe animations
const parallaxFloat = keyframes`
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-15px) rotate(1deg); }
`;

const slideInFromLeft = keyframes`
  0% { opacity: 0; transform: translateX(-50px); }
  100% { opacity: 1; transform: translateX(0); }
`;

const slideInFromRight = keyframes`
  0% { opacity: 0; transform: translateX(50px); }
  100% { opacity: 1; transform: translateX(0); }
`;

const fadeInUp = keyframes`
  0% { opacity: 0; transform: translateY(30px); }
  100% { opacity: 1; transform: translateY(0); }
`;

const pulseGlow = keyframes`
  0%, 100% { box-shadow: var(--glass-shadow); }
  50% { box-shadow: var(--glass-hover-shadow); }
`;

// Styled components
const HeroContainer = styled(Box)(() => ({
  minHeight: '50vh', // Reduced from 70vh to 50vh for better content density
  position: 'relative',
  overflow: 'hidden',
  background: 'var(--gradient-overlay-dark)',
  display: 'flex',
  alignItems: 'center',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage: 'url("https://images.unsplash.com/photo-1489599540918-8c3d2de66e1a?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwxfHxtb3ZpZSUyMHRoZWF0ZXIlMjBjaW5lbWElMjBzY3JlZW5zJTIwZGFyayUyMGF0bW9zcGhlcmV8ZW58MHwwfHx8MTc1NTEzMTQzM3ww&ixlib=rb-4.1.0&q=85")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    filter: 'brightness(0.3) contrast(1.2)',
    zIndex: 0,
  },
}));

const AsymmetricGrid = styled(Box)(() => ({
  position: 'relative',
  zIndex: 2,
  maxWidth: '1600px',
  margin: '0 auto',
  padding: 'var(--grid-margin-mobile)',
  display: 'grid',
  gridTemplateColumns: 'repeat(12, 1fr)',
  gridTemplateRows: 'repeat(4, minmax(50px, 1fr))', // Reduced from 6 to 4 rows
  gap: '16px', // Reduced from calc(var(--grid-base) * 2) to 16px
  minHeight: '50vh', // Reduced from 70vh to 50vh
  alignContent: 'center',
  
  '@media (min-width: var(--breakpoint-sm))': {
    padding: 'var(--grid-margin-tablet)',
    gap: '20px', // Reduced from calc(var(--grid-base) * 2.5) to 20px
  },
  '@media (min-width: var(--breakpoint-lg))': {
    padding: 'var(--grid-margin-desktop)',
    gap: '24px', // Reduced from calc(var(--grid-base) * 3) to 24px
  },
}));

const MainHeroCard = styled(Box)(() => ({
  gridColumn: 'span 7',
  gridRow: 'span 3', // Reduced from 4 to 3
  position: 'relative',
  borderRadius: 'calc(var(--grid-base) * 2)', // Reduced from 3 to 2
  background: 'var(--glass-background-strong)',
  backdropFilter: 'var(--glass-blur)',
  border: 'var(--glass-border)',
  overflow: 'hidden',
  animation: `${slideInFromLeft} 1s var(--ease-out-expo)`,
  
  '@media (max-width: var(--breakpoint-md))': {
    gridColumn: 'span 12',
    gridRow: 'span 2', // Reduced from 3 to 2
  },
  
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage: 'url("https://images.unsplash.com/photo-1596727147705-61a532a659bd?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwxfHxzcGFjZSUyMG1vdmllJTIwcG9zdGVyfGVufDB8MHx8fDE3NTUxMzE0MzN8MA&ixlib=rb-4.1.0&q=85")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    opacity: 0.4,
    zIndex: 0,
  },
}));

const HeroContent = styled(Box)(() => ({
  position: 'relative',
  zIndex: 2,
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  padding: 'calc(var(--grid-base) * 2)', // Reduced from 3 to 2
  background: 'var(--gradient-overlay-dark)',
}));

const LogoText = styled(Typography)(() => ({
  background: 'var(--gradient-brand)',
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  textShadow: '0 0 30px rgba(0, 255, 255, 0.5)',
  animation: `${pulseGlow} 3s ease-in-out infinite`,
  fontWeight: 900,
  letterSpacing: '-0.02em',
}));

const SocialProofWidget = styled(Box)(() => ({
  gridColumn: 'span 5',
  gridRow: 'span 1', // Reduced from 2 to 1
  background: 'var(--glass-background)',
  backdropFilter: 'var(--glass-blur)',
  border: 'var(--glass-border)',
  borderRadius: 'calc(var(--grid-base) * 1.5)', // Reduced from 2 to 1.5
  padding: 'calc(var(--grid-base) * 2)', // Reduced from 2.5 to 2
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  animation: `${slideInFromRight} 1s var(--ease-out-expo) 0.3s both`,
  
  '@media (max-width: var(--breakpoint-md))': {
    gridColumn: 'span 12',
    gridRow: 'span 1',
  },
}));

const TrendingGrid = styled(Box)(() => ({
  gridColumn: 'span 5',
  gridRow: 'span 1', // Reduced from 2 to 1
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: '12px', // Reduced from calc(var(--grid-base) * 1.5) to 12px
  
  '@media (max-width: var(--breakpoint-md))': {
    gridColumn: 'span 12',
    gridRow: 'span 1', // Reduced from 2 to 1
    gridTemplateColumns: 'repeat(3, 1fr)',
  },
  '@media (max-width: var(--breakpoint-sm))': {
    gridTemplateColumns: 'repeat(2, 1fr)',
  },
}));

const CallToActionCard = styled(Box)(() => ({
  gridColumn: '1 / span 7',
  gridRow: 'span 1',
  background: 'var(--glass-background-subtle)',
  backdropFilter: 'var(--glass-blur-subtle)',
  border: 'var(--glass-border)',
  borderRadius: 'calc(var(--grid-base) * 1.5)', // Reduced from 2 to 1.5
  padding: 'calc(var(--grid-base) * 1.5)', // Reduced from 2 to 1.5
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  animation: `${fadeInUp} 1s var(--ease-out-expo) 0.6s both`,
  
  '@media (max-width: var(--breakpoint-md))': {
    gridColumn: 'span 12',
    flexDirection: 'column',
    gap: '12px', // Reduced from calc(var(--grid-base) * 1.5) to 12px
  },
}));

const FloatingElement = styled(Box)<{ delay?: number; x: number; y: number }>(({ delay = 0, x, y }) => ({
  position: 'absolute',
  left: `${x}%`,
  top: `${y}%`,
  transform: 'translate(-50%, -50%)',
  animation: `${parallaxFloat} 4s ease-in-out infinite ${delay}s, ${fadeInUp} 1s var(--ease-out-expo) ${delay + 0.5}s both`,
  zIndex: 1,
}));

const AsymmetricHeroSection: React.FC = () => {
  const navigate = useNavigate();
  const [activeUsers] = useState(1247);
  const [watchParties] = useState(89);
  
  const trendingContent = [
    {
      id: '1',
      title: 'Cosmic Odyssey',
      image: 'https://images.unsplash.com/photo-1596727147705-61a532a659bd?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwxfHxzcGFjZSUyMG1vdmllJTIwcG9zdGVyfGVufDB8MHx8fDE3NTUxMzE0MzN8MA&ixlib=rb-4.1.0&q=85',
      size: 'feature' as const,
      priority: 9,
    },
    {
      id: '2',
      title: 'Neon Nights',
      image: 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwxfHxuZW9uJTIwY2l0eSUyMG5pZ2h0fGVufDB8MHx8fDE3NTUxMzE0MzN8MA&ixlib=rb-4.1.0&q=85',
      size: 'standard' as const,
      priority: 7,
    },
    {
      id: '3',
      title: 'Ocean Depths',
      image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwxfHxvY2VhbiUyMGRlZXB8ZW58MHwwfHx8MTc1NTEzMTQzM3ww&ixlib=rb-4.1.0&q=85',
      size: 'compact' as const,
      priority: 6,
    },
    {
      id: '4',
      title: 'Urban Legend',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwxfHx1cmJhbiUyMG5pZ2h0JTIwY2l0eXxlbnwwfDB8fHwxNzU1MTMxNDMzfDA&ixlib=rb-4.1.0&q=85',
      size: 'compact' as const,
      priority: 5,
    },
  ];

  const floatingElements = [
    { type: 'badge', x: 85, y: 20, delay: 0.8 },
    { type: 'avatar', x: 15, y: 75, delay: 1.2 },
  ];

  return (
    <HeroContainer>
      {/* Floating Social Elements */}
      {floatingElements.map((element, index) => (
        <FloatingElement key={index} delay={element.delay} x={element.x} y={element.y}>
          {element.type === 'badge' && (
            <Badge badgeContent={watchParties} color="primary" max={99}>
              <Chip 
                icon={<Group />} 
                label="Live Parties" 
                className="glass-medium"
                sx={{ color: 'white' }}
              />
            </Badge>
          )}
          {element.type === 'avatar' && (
            <AvatarGroup max={3} sx={{ '& .MuiAvatar-root': { border: '2px solid var(--color-primary)' } }}>
              <Avatar src="https://i.pravatar.cc/150?img=1" />
              <Avatar src="https://i.pravatar.cc/150?img=2" />
              <Avatar src="https://i.pravatar.cc/150?img=3" />
            </AvatarGroup>
          )}
        </FloatingElement>
      ))}

      <AsymmetricGrid>
        {/* Main Hero Card */}
        <MainHeroCard>
          <HeroContent>
            <Box>
              <LogoText variant="h1" sx={{ fontSize: { xs: '2.5rem', md: '4rem', lg: '5rem' }, mb: 2 }}>
                Movy Nyt
              </LogoText>
              
              <Typography 
                variant="h2" 
                sx={{ 
                  fontSize: { xs: '1.5rem', md: '2.5rem', lg: '3rem' },
                  fontWeight: 700,
                  color: 'white',
                  textShadow: '0 4px 8px rgba(0, 0, 0, 0.5)',
                  mb: 2
                }}
              >
                Stream Together, Stay Connected
              </Typography>
              
              <Typography 
                variant="body1" 
                sx={{ 
                  fontSize: { xs: '1rem', md: '1.25rem' },
                  color: 'rgba(255, 255, 255, 0.9)',
                  maxWidth: '500px',
                  textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
                  lineHeight: 1.6
                }}
              >
                Experience cinematic moments with friends, wherever they are. Synchronized streaming meets social connection.
              </Typography>
            </Box>

            <Stack direction="row" spacing={2} flexWrap="wrap" gap={2}>
              <Chip 
                icon={<PlayArrow />} 
                label="Watch Together" 
                onClick={() => navigate('/watch-together')}
                className="glass-medium"
                sx={{ 
                  color: 'white', 
                  cursor: 'pointer',
                  '&:hover': { background: 'var(--glass-background-strong)' }
                }}
              />
              <Chip 
                icon={<PersonAdd />} 
                label="Invite Friends" 
                onClick={() => navigate('/friends')}
                variant="outlined"
                className="glass-subtle"
                sx={{ 
                  color: 'white', 
                  borderColor: 'rgba(255, 255, 255, 0.3)',
                  cursor: 'pointer',
                  '&:hover': { borderColor: 'var(--color-primary)' }
                }}
              />
            </Stack>
          </HeroContent>
        </MainHeroCard>

        {/* Social Proof Widget */}
        <SocialProofWidget>
          <Box>
            <Typography variant="h6" sx={{ color: 'white', fontWeight: 600, mb: 1 }}>
              Join the Community
            </Typography>
            <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
              {activeUsers.toLocaleString()} users streaming together
            </Typography>
          </Box>
          <AvatarGroup 
            max={4} 
            sx={{ 
              '& .MuiAvatar-root': { 
                border: '2px solid var(--color-primary)',
                width: 40,
                height: 40
              } 
            }}
          >
            <Avatar src="https://i.pravatar.cc/150?img=5" />
            <Avatar src="https://i.pravatar.cc/150?img=6" />
            <Avatar src="https://i.pravatar.cc/150?img=7" />
            <Avatar src="https://i.pravatar.cc/150?img=8" />
          </AvatarGroup>
        </SocialProofWidget>

        {/* Trending Content Grid */}
        <TrendingGrid>
          {trendingContent.map((content, index) => (
            <Box 
              key={content.id}
              sx={{ 
                animation: `${fadeInUp} 0.8s var(--ease-out-expo) ${0.4 + index * 0.1}s both`
              }}
            >
              <ContentCard
                id={content.id}
                title={content.title}
                image={content.image}
                size={content.size}
                priority={content.priority}
                onClick={() => navigate('/watch')}
                aspectRatio="16/9"
              />
            </Box>
          ))}
        </TrendingGrid>

        {/* Call to Action Card */}
        <CallToActionCard>
          <Box>
            <Typography variant="h6" sx={{ color: 'white', fontWeight: 600, mb: 1 }}>
              Ready to Start Your Journey?
            </Typography>
            <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
              Discover thousands of movies, shows, and exclusive content
            </Typography>
          </Box>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <GlowButton 
              variant="primary" 
              size="large"
              onClick={() => navigate('/watch-together')}
            >
              Start Watching
            </GlowButton>
            <GlowButton 
              variant="outline" 
              size="large"
              onClick={() => navigate('/watch')}
            >
              Browse Content
            </GlowButton>
          </Stack>
        </CallToActionCard>
      </AsymmetricGrid>
    </HeroContainer>
  );
};

export default AsymmetricHeroSection;
