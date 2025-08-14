import React from 'react';
import { Box, Typography, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import GroupIcon from '@mui/icons-material/Group';
import LocalMoviesIcon from '@mui/icons-material/LocalMovies';
import GlassCard from '../ui/GlassCard';

const FeaturesContainer = styled(Box)(({ theme }) => ({
  padding: '120px 20px',
  background: `radial-gradient(ellipse at center, rgba(26, 26, 46, 0.8) 0%, ${theme.palette.background.default} 70%)`,
  position: 'relative'
}));

const FeatureCard = styled(GlassCard)({
  padding: '40px 30px',
  textAlign: 'center',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `linear-gradient(135deg, transparent 0%, rgba(0, 255, 255, 0.05) 50%, transparent 100%)`,
    borderRadius: '12px',
    opacity: 0,
    transition: 'opacity 0.3s ease-in-out'
  },
  '&:hover::before': {
    opacity: 1
  }
});

const IconWrapper = styled(Box)(({ theme }) => ({
  width: '80px',
  height: '80px',
  borderRadius: '50%',
  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: '24px',
  boxShadow: '0 8px 32px rgba(0, 255, 255, 0.3)',
  transition: 'all 0.3s ease-in-out',
  '& svg': {
    fontSize: '2rem',
    color: theme.palette.background.default
  }
}));

const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: <PlayArrowIcon />,
      title: 'Watch Together',
      description: 'Synchronized streaming with friends across multiple platforms. Perfect timing, every time.',
      delay: 0
    },
    {
      icon: <GroupIcon />,
      title: 'Friend Connections',
      description: 'Build your social network and discover what your friends are watching. Share recommendations instantly.',
      delay: 0.2
    },
    {
      icon: <LocalMoviesIcon />,
      title: 'Universal Catalog',
      description: 'Access content from Netflix, Disney+, YouTube and more. One platform for all your streaming needs.',
      delay: 0.4
    }
  ];

  return (
    <FeaturesContainer>
      <Box sx={{ maxWidth: '1200px', mx: 'auto' }}>
        <Typography 
          variant="h2" 
          component="h2" 
          sx={{ 
            textAlign: 'center', 
            mb: 2,
            background: 'linear-gradient(135deg, #ffffff, #b8b8b8)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}
        >
          Why Choose Movy Nyt?
        </Typography>
        
        <Typography 
          variant="body1" 
          sx={{ 
            textAlign: 'center', 
            mb: 6, 
            color: 'text.secondary',
            maxWidth: '600px',
            mx: 'auto',
            fontSize: '1.125rem'
          }}
        >
          Experience the future of social streaming with cutting-edge features designed for seamless entertainment.
        </Typography>

        <Stack 
          direction={{ xs: 'column', md: 'row' }} 
          spacing={4}
          sx={{ mt: 6 }}
        >
          {features.map((feature, index) => (
            <Box 
              key={index} 
              sx={{ 
                flex: 1,
                animation: `fadeInUp 0.8s ease-out ${feature.delay}s both`,
                '@keyframes fadeInUp': {
                  '0%': {
                    opacity: 0,
                    transform: 'translateY(30px)'
                  },
                  '100%': {
                    opacity: 1,
                    transform: 'translateY(0)'
                  }
                }
              }}
            >
              <FeatureCard>
                <IconWrapper>
                  {feature.icon}
                </IconWrapper>
                
                <Typography 
                  variant="h3" 
                  component="h3" 
                  sx={{ 
                    mb: 2, 
                    color: 'text.primary',
                    fontWeight: 600
                  }}
                >
                  {feature.title}
                </Typography>
                
                <Typography 
                  variant="body1" 
                  sx={{ 
                    color: 'text.secondary',
                    lineHeight: 1.6
                  }}
                >
                  {feature.description}
                </Typography>
              </FeatureCard>
            </Box>
          ))}
        </Stack>
      </Box>
    </FeaturesContainer>
  );
};

export default FeaturesSection;