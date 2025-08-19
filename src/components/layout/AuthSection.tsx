import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, TextField, Stack, Divider, IconButton, Alert } from '@mui/material';
import { styled } from '@mui/material/styles';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import GlowButton from '../ui/GlowButton';
import GlassCard from '../ui/GlassCard';

const AuthContainer = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  display: 'flex',
  background: `linear-gradient(135deg, ${theme.palette.background.default} 0%, #1a1a2e 100%)`,
  position: 'relative',
  overflow: 'hidden',
  
  // Add animated background elements
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'radial-gradient(circle at 20% 80%, rgba(0, 255, 255, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(65, 105, 225, 0.1) 0%, transparent 50%)',
    animation: 'float 6s ease-in-out infinite alternate',
    zIndex: 1,
  },
  
  '@keyframes float': {
    '0%': { transform: 'translateY(0px) rotate(0deg)' },
    '100%': { transform: 'translateY(-20px) rotate(2deg)' },
  },
}));

const VisualSide = styled(Box)({
  background: 'linear-gradient(135deg, rgba(0, 255, 255, 0.1) 0%, rgba(65, 105, 225, 0.1) 100%)',
  position: 'relative',
  overflow: 'hidden',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 2,
  
  // Add floating elements
  '&::after': {
    content: '""',
    position: 'absolute',
    top: '10%',
    right: '10%',
    width: '100px',
    height: '100px',
    background: 'radial-gradient(circle, rgba(0, 255, 255, 0.2) 0%, transparent 70%)',
    borderRadius: '50%',
    animation: 'pulse 4s ease-in-out infinite',
  },
  
  '@keyframes pulse': {
    '0%, 100%': { transform: 'scale(1)', opacity: 0.3 },
    '50%': { transform: 'scale(1.2)', opacity: 0.6 },
  },
});

const FormSide = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '40px 20px',
  position: 'relative',
  zIndex: 2,
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
      <VisualSide sx={{ flex: 1, display: { xs: 'none', md: 'flex' } }}>
        <Box sx={{ textAlign: 'center', p: 4 }}>
          <Typography 
            variant="h2" 
            sx={{ 
              mb: 3,
              background: 'linear-gradient(135deg, #00ffff, #4169e1)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            Welcome to the Future of Streaming
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary', fontSize: '1.125rem' }}>
            Join millions of users who are already enjoying synchronized streaming experiences with friends worldwide.
          </Typography>
        </Box>
      </VisualSide>

      <FormSide sx={{ flex: 1 }}>
        <GlassCard sx={{ p: 4, maxWidth: '400px', width: '100%' }}>
          <Typography 
            variant="h3" 
            component="h1" 
            sx={{ 
              textAlign: 'center', 
              mb: 1,
              color: 'text.primary'
            }}
          >
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </Typography>
          
          <Typography 
            variant="body2" 
            sx={{ 
              textAlign: 'center', 
              mb: 4, 
              color: 'text.secondary' 
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