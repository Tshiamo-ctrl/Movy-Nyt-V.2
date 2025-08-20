import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, TextField, Stack, Divider, IconButton, Alert } from '@mui/material';
import { styled } from '@mui/material/styles';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import GlowButton from '../ui/GlowButton';
import GlassCard from '../ui/GlassCard';

const AuthContainer = styled(Box)(() => ({
  minHeight: '100vh',
  display: 'flex',
  position: 'relative',
  overflow: 'hidden',
  
  // Mobile layout adjustments
  '@media (max-width: 900px)': {
    flexDirection: 'column',
  },
  
  // Add diffused movie background image
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `
      linear-gradient(135deg, rgba(10, 10, 15, 0.95) 0%, rgba(26, 26, 46, 0.9) 50%, rgba(10, 10, 15, 0.95) 100%),
      url('https://images.unsplash.com/photo-1489599540918-8c3d2de66e1a?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwxfHxtb3ZpZSUyMHRoZWF0ZXJ8ZW58MHwwfHx8MTc1NTEzMTQzM3ww&ixlib=rb-4.1.0&q=85&w=1920&h=1080')
    `,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed',
    filter: 'blur(2px) brightness(0.3)',
    zIndex: 1,
    
    '@media (max-width: 900px)': {
      backgroundAttachment: 'scroll',
    },
  },
  
  // Add animated overlay elements
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `
      radial-gradient(circle at 20% 80%, rgba(0, 255, 255, 0.15) 0%, transparent 50%),
      radial-gradient(circle at 80% 20%, rgba(65, 105, 225, 0.15) 0%, transparent 50%),
      radial-gradient(circle at 50% 50%, rgba(0, 255, 255, 0.05) 0%, transparent 70%)
    `,
    animation: 'float 8s ease-in-out infinite alternate',
    zIndex: 2,
  },
  
  // Add floating particles
  '& .particle': {
    position: 'absolute',
    width: '4px',
    height: '4px',
    background: 'rgba(0, 255, 255, 0.6)',
    borderRadius: '50%',
    animation: 'particleFloat 6s ease-in-out infinite',
    zIndex: 2,
  },
  
  '& .particle:nth-child(1)': {
    top: '20%',
    left: '10%',
    animationDelay: '0s',
    animationDuration: '8s',
  },
  
  '& .particle:nth-child(2)': {
    top: '60%',
    right: '15%',
    animationDelay: '2s',
    animationDuration: '10s',
  },
  
  '& .particle:nth-child(3)': {
    bottom: '30%',
    left: '20%',
    animationDelay: '4s',
    animationDuration: '12s',
  },
  
  '@keyframes float': {
    '0%': { transform: 'translateY(0px) rotate(0deg)' },
    '100%': { transform: 'translateY(-15px) rotate(1deg)' },
  },
  
  '@keyframes particleFloat': {
    '0%, 100%': { 
      transform: 'translateY(0px) translateX(0px)',
      opacity: 0.6,
    },
    '50%': { 
      transform: 'translateY(-20px) translateX(10px)',
      opacity: 1,
    },
  },
}));

const VisualSide = styled(Box)({
  position: 'relative',
  overflow: 'hidden',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 3,
  
  // Mobile adjustments
  '@media (max-width: 900px)': {
    minHeight: '40vh',
    padding: '2rem 1rem',
  },
  
  // Add floating elements
  '&::after': {
    content: '""',
    position: 'absolute',
    top: '10%',
    right: '10%',
    width: '120px',
    height: '120px',
    background: 'radial-gradient(circle, rgba(0, 255, 255, 0.3) 0%, transparent 70%)',
    borderRadius: '50%',
    animation: 'pulse 4s ease-in-out infinite',
    
    '@media (max-width: 900px)': {
      width: '80px',
      height: '80px',
      top: '5%',
      right: '5%',
    },
  },
  
  '&::before': {
    content: '""',
    position: 'absolute',
    bottom: '15%',
    left: '15%',
    width: '80px',
    height: '80px',
    background: 'radial-gradient(circle, rgba(65, 105, 225, 0.3) 0%, transparent 70%)',
    borderRadius: '50%',
    animation: 'pulse 6s ease-in-out infinite reverse',
    
    '@media (max-width: 900px)': {
      width: '60px',
      height: '60px',
      bottom: '10%',
      left: '10%',
    },
  },
  
  '@keyframes pulse': {
    '0%, 100%': { transform: 'scale(1)', opacity: 0.4 },
    '50%': { transform: 'scale(1.3)', opacity: 0.7 },
  },
});

const FormSide = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '40px 20px',
  position: 'relative',
  zIndex: 3,
  
  // Mobile adjustments
  '@media (max-width: 900px)': {
    padding: '20px 16px',
    minHeight: '60vh',
  },
});

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    background: 'rgba(26, 26, 46, 0.5)',
    backdropFilter: 'blur(10px)',
    borderRadius: '8px',
    '& fieldset': {
      borderColor: 'rgba(255, 255, 255, 0.2)'
    },
    '&:hover fieldset': {
      borderColor: 'rgba(0, 255, 255, 0.5)'
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.primary.main,
      boxShadow: `0 0 20px rgba(0, 255, 255, 0.3)`
    }
  },
  '& .MuiInputLabel-root': {
    color: theme.palette.text.secondary,
    '&.Mui-focused': {
      color: theme.palette.primary.main
    }
  },
  '& .MuiOutlinedInput-input': {
    color: theme.palette.text.primary
  }
}));

const SocialButton = styled(IconButton)(({ theme }) => ({
  width: '48px',
  height: '48px',
  background: 'rgba(26, 26, 46, 0.5)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  color: theme.palette.text.primary,
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    background: 'rgba(0, 255, 255, 0.1)',
    border: '1px solid rgba(0, 255, 255, 0.3)',
    transform: 'translateY(-2px)',
    boxShadow: '0 8px 25px rgba(0, 255, 255, 0.2)'
  }
}));

const AuthSection: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (!isLogin) {
      if (!formData.fullName) {
        newErrors.fullName = 'Full name is required';
      }
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Please confirm your password';
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      
      // Redirect after success
      setTimeout(() => {
        navigate('/');
      }, 1500);
    }, 1500);
  };

  const handleInputChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value
    }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  return (
    <AuthContainer>
      {/* Floating particles */}
      <Box className="particle" />
      <Box className="particle" />
      <Box className="particle" />
      
      <VisualSide sx={{ flex: 1, display: { xs: 'none', md: 'flex' } }}>
        <Box sx={{ textAlign: 'center', p: 4, position: 'relative', zIndex: 4 }}>
          <Typography 
            variant="h2" 
            sx={{ 
              mb: 3,
              background: 'linear-gradient(135deg, #00ffff, #4169e1)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontSize: { xs: '1.75rem', sm: '2rem', md: '2.5rem', lg: '3rem' },
              fontWeight: 700,
              textShadow: '0 0 30px rgba(0, 255, 255, 0.3)',
              lineHeight: 1.2,
            }}
          >
            Welcome to the Future of Streaming
          </Typography>
          <Typography variant="body1" sx={{ 
            color: 'text.secondary', 
            fontSize: { xs: '1rem', sm: '1.125rem' },
            mb: 4,
            maxWidth: '500px',
            margin: '0 auto 2rem auto',
            lineHeight: 1.6,
            px: { xs: 2, sm: 0 },
          }}>
            Join millions of users who are already enjoying synchronized streaming experiences with friends worldwide.
          </Typography>
          
          {/* Add decorative elements */}
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            gap: { xs: 1, sm: 2 }, 
            mb: 3,
            flexWrap: 'wrap'
          }}>
            <Box sx={{
              width: { xs: '40px', sm: '60px' },
              height: { xs: '40px', sm: '60px' },
              borderRadius: '50%',
              background: 'linear-gradient(135deg, rgba(0, 255, 255, 0.2), rgba(65, 105, 225, 0.2))',
              border: '2px solid rgba(0, 255, 255, 0.3)',
              animation: 'float 3s ease-in-out infinite',
            }} />
            <Box sx={{
              width: { xs: '50px', sm: '80px' },
              height: { xs: '50px', sm: '80px' },
              borderRadius: '50%',
              background: 'linear-gradient(135deg, rgba(65, 105, 225, 0.2), rgba(0, 255, 255, 0.2))',
              border: '2px solid rgba(65, 105, 225, 0.3)',
              animation: 'float 4s ease-in-out infinite reverse',
            }} />
            <Box sx={{
              width: { xs: '40px', sm: '60px' },
              height: { xs: '40px', sm: '60px' },
              borderRadius: '50%',
              background: 'linear-gradient(135deg, rgba(0, 255, 255, 0.2), rgba(65, 105, 225, 0.2))',
              border: '2px solid rgba(0, 255, 255, 0.3)',
              animation: 'float 3.5s ease-in-out infinite',
            }} />
          </Box>
          
          {/* Add feature highlights */}
          <Box sx={{ 
            display: 'grid', 
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(auto-fit, minmax(200px, 1fr))' }, 
            gap: { xs: 1.5, sm: 2 }, 
            maxWidth: '600px',
            margin: '0 auto',
            px: { xs: 2, sm: 0 },
          }}>
            <Box sx={{
              p: { xs: 1.5, sm: 2 },
              background: 'rgba(0, 255, 255, 0.1)',
              borderRadius: '12px',
              border: '1px solid rgba(0, 255, 255, 0.2)',
              backdropFilter: 'blur(10px)',
            }}>
              <Typography variant="h6" sx={{ color: 'primary.main', mb: 1, fontSize: { xs: '1rem', sm: '1.25rem' } }}>
                🎬 Sync Watch
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: { xs: '0.875rem', sm: '1rem' } }}>
                Watch together with friends in perfect sync
              </Typography>
            </Box>
            <Box sx={{
              p: { xs: 1.5, sm: 2 },
              background: 'rgba(65, 105, 225, 0.1)',
              borderRadius: '12px',
              border: '1px solid rgba(65, 105, 225, 0.2)',
              backdropFilter: 'blur(10px)',
            }}>
              <Typography variant="h6" sx={{ color: 'secondary.main', mb: 1, fontSize: { xs: '1rem', sm: '1.25rem' } }}>
                🌟 Premium Content
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: { xs: '0.875rem', sm: '1rem' } }}>
                Access to exclusive movies and shows
              </Typography>
            </Box>
          </Box>
        </Box>
      </VisualSide>

      <FormSide sx={{ flex: 1 }}>
        <GlassCard sx={{ 
          p: { xs: 3, md: 4 }, 
          maxWidth: '400px', 
          width: '100%',
          background: 'rgba(26, 26, 46, 0.8)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
        }}>
          <Typography 
            variant="h3" 
            component="h1" 
            sx={{ 
              textAlign: 'center', 
              mb: 1,
              color: 'text.primary',
              fontWeight: 600,
            }}
          >
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </Typography>
          
          <Typography 
            variant="body2" 
            sx={{ 
              textAlign: 'center', 
              mb: 4, 
              color: 'text.secondary',
              lineHeight: 1.5,
            }}
          >
            {isLogin ? 'Sign in to continue your streaming journey' : 'Join the social streaming revolution'}
          </Typography>

          {success && (
            <Alert severity="success" sx={{ mb: 2 }}>
              {isLogin ? 'Welcome back!' : 'Account created successfully!'} Redirecting...
            </Alert>
          )}
          
          <Stack spacing={3}>
            {!isLogin && (
              <StyledTextField
                fullWidth
                label="Full Name"
                variant="outlined"
                type="text"
                value={formData.fullName}
                onChange={handleInputChange('fullName')}
                error={!!errors.fullName}
                helperText={errors.fullName}
              />
            )}
            
            <StyledTextField
              fullWidth
              label="Email Address"
              variant="outlined"
              type="email"
              value={formData.email}
              onChange={handleInputChange('email')}
              error={!!errors.email}
              helperText={errors.email}
            />
            
            <StyledTextField
              fullWidth
              label="Password"
              variant="outlined"
              type="password"
              value={formData.password}
              onChange={handleInputChange('password')}
              error={!!errors.password}
              helperText={errors.password}
            />

            {!isLogin && (
              <StyledTextField
                fullWidth
                label="Confirm Password"
                variant="outlined"
                type="password"
                value={formData.confirmPassword}
                onChange={handleInputChange('confirmPassword')}
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword}
              />
            )}

            <GlowButton 
              variant="primary" 
              fullWidth 
              size="large"
              sx={{ mt: 2 }}
              onClick={handleSubmit}
              disabled={loading || success}
            >
              {loading ? 'Processing...' : success ? 'Success!' : (isLogin ? 'Sign In' : 'Create Account')}
            </GlowButton>

            <Divider sx={{ my: 2, color: 'text.secondary' }}>
              or continue with
            </Divider>

            <Stack direction="row" spacing={2} justifyContent="center">
              <SocialButton>
                <GoogleIcon />
              </SocialButton>
              <SocialButton>
                <FacebookIcon />
              </SocialButton>
            </Stack>

            <Typography 
              variant="body2" 
              sx={{ 
                textAlign: 'center', 
                mt: 3,
                color: 'text.secondary'
              }}
            >
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <Typography 
                component="span" 
                sx={{ 
                  color: 'primary.main', 
                  cursor: 'pointer',
                  textDecoration: 'underline',
                  '&:hover': {
                    color: 'primary.light'
                  }
                }}
                onClick={() => setIsLogin(!isLogin)}
              >
                {isLogin ? 'Sign up' : 'Sign in'}
              </Typography>
            </Typography>
          </Stack>
        </GlassCard>
      </FormSide>
    </AuthContainer>
  );
};

export default AuthSection;