import React, { useState } from 'react';
import { Box, Typography, TextField, Stack, IconButton, Divider, Alert } from '@mui/material';
import { styled } from '@mui/material/styles';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import GlowButton from '../ui/GlowButton';

const FooterContainer = styled(Box)(() => ({
  background: 'var(--glass-background-subtle)',
  backdropFilter: 'var(--glass-blur-subtle)',
  padding: '40px 20px 20px', // Reduced from 80px 20px 40px
  borderTop: 'var(--glass-border)',
  position: 'relative',
  
  // Add subtle gradient overlay
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'var(--gradient-overlay-dark)',
    opacity: 0.1,
    pointerEvents: 'none',
  },
}));

const NewsletterSection = styled(Box)({
  background: 'var(--glass-background)',
  backdropFilter: 'var(--glass-blur)',
  border: 'var(--glass-border-strong)',
  borderRadius: '16px',
  padding: '24px', // Reduced from 40px
  textAlign: 'center',
  marginBottom: '30px', // Reduced from 60px
  position: 'relative',
  overflow: 'hidden',
  boxShadow: 'var(--glass-shadow)',
  transition: 'all var(--animation-medium) var(--ease-out-expo)',
  
  '&:hover': {
    boxShadow: 'var(--glass-hover-shadow)',
    border: 'var(--glass-hover-border)',
  },
  
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'var(--gradient-overlay-feature)',
    borderRadius: '16px',
    opacity: 0.3,
  }
});

const StyledTextField = styled(TextField)(() => ({
  '& .MuiOutlinedInput-root': {
    background: 'var(--glass-background)',
    backdropFilter: 'var(--glass-blur)',
    borderRadius: '8px',
    border: 'var(--glass-border)',
    transition: 'all var(--animation-medium) var(--ease-out-expo)',
    
    '& fieldset': {
      borderColor: 'transparent',
    },
    
    '&:hover': {
      background: 'var(--glass-background-strong)',
      border: 'var(--glass-hover-border)',
      boxShadow: 'var(--glass-hover-shadow)',
    },
    
    '&.Mui-focused': {
      background: 'var(--glass-background-strong)',
      border: 'var(--glass-active-border)',
      boxShadow: 'var(--glass-active-shadow)',
    }
  },
  
  '& .MuiInputLabel-root': {
    color: 'var(--color-text-secondary)',
    '&.Mui-focused': {
      color: 'var(--color-primary)',
    }
  },
  
  '& .MuiOutlinedInput-input': {
    color: 'var(--color-text-primary)',
  }
}));

const SocialIcon = styled(IconButton)(() => ({
  width: '48px',
  height: '48px',
  background: 'var(--glass-background)',
  backdropFilter: 'var(--glass-blur)',
  border: 'var(--glass-border)',
  color: 'var(--color-text-primary)',
  transition: 'all var(--animation-medium) var(--ease-out-expo)',
  boxShadow: 'var(--glass-shadow)',
  
  '&:hover': {
    background: 'var(--glass-background-strong)',
    border: 'var(--glass-hover-border)',
    transform: 'translateY(-2px)',
    boxShadow: 'var(--glass-hover-shadow)',
  }
}));

const FooterSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubscribe = () => {
    if (!email || !/\S+@\S+\.\S+/.test(email)) return;
    
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubscribed(true);
      setEmail('');
    }, 1000);
  };

  const socialLinks = [
    { icon: <TwitterIcon />, label: 'Twitter' },
    { icon: <FacebookIcon />, label: 'Facebook' },
    { icon: <InstagramIcon />, label: 'Instagram' },
    { icon: <YouTubeIcon />, label: 'YouTube' }
  ];

  const footerLinks = [
    {
      title: 'Product',
      links: ['Features', 'Pricing', 'API', 'Integrations']
    },
    {
      title: 'Company',
      links: ['About', 'Blog', 'Careers', 'Press']
    },
    {
      title: 'Support',
      links: ['Help Center', 'Contact', 'Status', 'Community']
    },
    {
      title: 'Legal',
      links: ['Privacy', 'Terms', 'Cookies', 'Licenses']
    }
  ];

  return (
    <FooterContainer>
      <Box sx={{ maxWidth: '1200px', mx: 'auto' }}>
        {/* Newsletter Section */}
        <NewsletterSection>
          <Box sx={{ position: 'relative', zIndex: 2 }}>
            <Typography 
              variant="h3" 
              component="h2" 
              sx={{ 
                mb: 2,
                background: 'linear-gradient(135deg, #ffffff, #b8b8b8)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              Join Our Newsletter
            </Typography>
            
            <Typography 
              variant="body1" 
              sx={{ 
                mb: 4, 
                color: 'text.secondary',
                maxWidth: '500px',
                mx: 'auto'
              }}
            >
              Get the latest updates on new features, platform integrations, and exclusive streaming events.
            </Typography>

            {subscribed && (
              <Alert severity="success" sx={{ mb: 2, maxWidth: '400px', mx: 'auto' }}>
                Thanks for subscribing! You&apos;ll receive the latest updates.
              </Alert>
            )}
            
            <Stack 
              direction={{ xs: 'column', sm: 'row' }} 
              spacing={2} 
              sx={{ maxWidth: '400px', mx: 'auto' }}
            >
              <StyledTextField
                placeholder="Enter your email"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSubscribe()}
                sx={{ flex: 1 }}
                disabled={subscribed}
              />
              <GlowButton 
                variant="primary"
                onClick={handleSubscribe}
                disabled={loading || subscribed || !email}
              >
                {loading ? 'Subscribing...' : subscribed ? 'Subscribed!' : 'Subscribe'}
              </GlowButton>
            </Stack>
          </Box>
        </NewsletterSection>

        {/* Main Footer Content */}
        <Stack 
          direction={{ xs: 'column', md: 'row' }} 
          spacing={6}
          sx={{ mb: 6 }}
        >
          {/* Brand Section */}
          <Box sx={{ flex: 1 }}>
            <Typography 
              variant="h4" 
              component="h3" 
              sx={{ 
                mb: 2,
                background: 'linear-gradient(135deg, #00ffff, #4169e1)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontWeight: 700
              }}
            >
              Movy Nyt
            </Typography>
            
            <Typography 
              variant="body1" 
              sx={{ 
                mb: 3, 
                color: 'text.secondary',
                lineHeight: 1.6,
                maxWidth: '300px'
              }}
            >
              The future of social streaming. Watch together, stay connected, and share unforgettable moments with friends worldwide.
            </Typography>

            <Stack direction="row" spacing={2}>
              {socialLinks.map((social, index) => (
                <SocialIcon key={index} aria-label={social.label}>
                  {social.icon}
                </SocialIcon>
              ))}
            </Stack>
          </Box>

          {/* Links Sections */}
          {footerLinks.map((section, index) => (
            <Box key={index} sx={{ minWidth: '120px' }}>
              <Typography 
                variant="h6" 
                sx={{ 
                  mb: 2, 
                  color: 'text.primary',
                  fontWeight: 600
                }}
              >
                {section.title}
              </Typography>
              <Stack spacing={1}>
                {section.links.map((link, linkIndex) => (
                  <Typography 
                    key={linkIndex}
                    variant="body2" 
                    sx={{ 
                      color: 'text.secondary',
                      cursor: 'pointer',
                      transition: 'color 0.3s ease-in-out',
                      '&:hover': {
                        color: 'primary.main'
                      }
                    }}
                  >
                    {link}
                  </Typography>
                ))}
              </Stack>
            </Box>
          ))}
        </Stack>

        <Divider sx={{ mb: 4, borderColor: 'rgba(255, 255, 255, 0.1)' }} />

        {/* Bottom Section */}
        <Stack 
          direction={{ xs: 'column', sm: 'row' }} 
          justifyContent="space-between" 
          alignItems="center"
          spacing={2}
        >
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            © 2025 Movy Nyt. All rights reserved.
          </Typography>
          
          <Stack direction="row" spacing={3}>
            <Typography 
              variant="body2" 
              sx={{ 
                color: 'text.secondary',
                cursor: 'pointer',
                '&:hover': {
                  color: 'primary.main'
                }
              }}
            >
              Privacy Policy
            </Typography>
            <Typography 
              variant="body2" 
              sx={{ 
                color: 'text.secondary',
                cursor: 'pointer',
                '&:hover': {
                  color: 'primary.main'
                }
              }}
            >
              Terms of Service
            </Typography>
            <Typography 
              variant="body2" 
              sx={{ 
                color: 'text.secondary',
                cursor: 'pointer',
                '&:hover': {
                  color: 'primary.main'
                }
              }}
            >
              Cookie Policy
            </Typography>
          </Stack>
        </Stack>
      </Box>
    </FooterContainer>
  );
};

export default FooterSection;