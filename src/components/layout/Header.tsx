import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useMediaQuery,
  useTheme,
  Avatar,
  Badge,
  Menu,
  MenuItem
} from '@mui/material';
import { styled } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';

import GlowButton from '../ui/GlowButton';

const StyledAppBar = styled(AppBar)({
  background: 'rgba(26, 26, 46, 0.2)', // More transparent
  backdropFilter: 'blur(20px)',
  borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
  transition: 'all var(--animation-medium) var(--ease-out-expo)',
  
  '&:hover': {
    background: 'rgba(26, 26, 46, 0.3)',
    backdropFilter: 'blur(25px)',
    borderBottom: '1px solid rgba(255, 255, 255, 0.15)',
    boxShadow: '0 6px 25px rgba(0, 0, 0, 0.15)',
  },
  
  // Add subtle gradient overlay
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(135deg, rgba(0, 255, 255, 0.05) 0%, rgba(65, 105, 225, 0.05) 100%)',
    opacity: 0.5,
    pointerEvents: 'none',
  },
});

const LogoText = styled(Typography)(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  fontWeight: 700,
  cursor: 'pointer',
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    textShadow: '0 0 20px rgba(0, 255, 255, 0.5)'
  }
}));

const NavButton = styled(Typography)<{ active?: boolean }>(({ theme, active }) => ({
  padding: '6px 12px', // Reduced padding
  borderRadius: '6px', // Smaller radius
  cursor: 'pointer',
  transition: 'all 0.3s ease-in-out',
  color: active ? theme.palette.primary.main : theme.palette.text.secondary,
  backgroundColor: active ? 'rgba(0, 255, 255, 0.1)' : 'transparent',
  border: active ? '1px solid rgba(0, 255, 255, 0.3)' : '1px solid transparent',
  fontSize: '0.9rem', // Smaller font size
  '&:hover': {
    color: theme.palette.primary.main,
    backgroundColor: 'rgba(0, 255, 255, 0.1)',
    border: '1px solid rgba(0, 255, 255, 0.3)'
  }
}));

const Header: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuAnchor, setUserMenuAnchor] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const navigationItems = [
    { label: 'Home', path: '/' },
    { label: 'Watch Together', path: '/watch-together' },
    { label: 'Friends', path: '/friends' },
    { label: 'Watch', path: '/watch' }
  ];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleNavigate = (path: string) => {
    navigate(path);
    setMobileOpen(false);
  };

  const handleUserMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setUserMenuAnchor(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setUserMenuAnchor(null);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center', pt: 2 }}>
      <LogoText variant="h6" sx={{ my: 2 }} onClick={() => handleNavigate('/')}>
        Movy Nyt
      </LogoText>
      <List>
        {navigationItems.map((item) => (
          <ListItem key={item.label} disablePadding>
            <ListItemButton
              onClick={() => handleNavigate(item.path)}
              sx={{
                textAlign: 'center',
                backgroundColor: location.pathname === item.path ? 'rgba(0, 255, 255, 0.1)' : 'transparent'
              }}
            >
              <ListItemText 
                primary={item.label} 
                sx={{ 
                  color: location.pathname === item.path ? 'primary.main' : 'text.primary' 
                }} 
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Box sx={{ mt: 3, px: 2 }}>
        <GlowButton 
          variant="primary" 
          fullWidth 
          onClick={() => handleNavigate('/auth')}
        >
          Sign In
        </GlowButton>
      </Box>
    </Box>
  );

  return (
    <>
      <StyledAppBar position="sticky">
        <Toolbar>
          {/* Mobile Menu Button */}
          {isMobile && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}

          {/* Logo */}
          <LogoText variant="h5" onClick={() => handleNavigate('/')}>
            Movy Nyt
          </LogoText>

          {/* Desktop Navigation */}
          {!isMobile && (
            <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', gap: 1 }}>
              {navigationItems.map((item) => (
                <NavButton
                  key={item.label}
                  active={location.pathname === item.path}
                  onClick={() => handleNavigate(item.path)}
                >
                  {item.label}
                </NavButton>
              ))}
            </Box>
          )}

          {/* Right Side Actions */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, ml: 'auto' }}>
            {!isMobile && (
              <>
                <IconButton color="inherit" size="small">
                  <Badge badgeContent={3} color="error">
                    <NotificationsIcon sx={{ fontSize: '1.2rem' }} />
                  </Badge>
                </IconButton>
                
                <IconButton onClick={handleUserMenuOpen} color="inherit" size="small">
                  <Avatar 
                    src="https://i.pravatar.cc/150?img=1" 
                    sx={{ width: 28, height: 28 }} // Smaller avatar
                  />
                </IconButton>
                
                <GlowButton 
                  variant="outline" 
                  size="small"
                  onClick={() => handleNavigate('/auth')}
                  sx={{
                    padding: '4px 12px', // Smaller padding
                    fontSize: '0.8rem', // Smaller font
                    minWidth: 'auto',
                    height: '32px', // Fixed height
                  }}
                >
                  Sign In
                </GlowButton>
              </>
            )}
          </Box>
        </Toolbar>
      </StyledAppBar>

      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: 240,
            background: 'rgba(26, 26, 46, 0.95)', // More transparent
            backdropFilter: 'blur(30px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
          }
        }}
      >
        {drawer}
      </Drawer>

      {/* User Menu */}
      <Menu
        anchorEl={userMenuAnchor}
        open={Boolean(userMenuAnchor)}
        onClose={handleUserMenuClose}
        sx={{
          '& .MuiPaper-root': {
            background: 'rgba(26, 26, 46, 0.95)', // More transparent
            backdropFilter: 'blur(30px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
            mt: 1,
            borderRadius: '12px',
          }
        }}
      >
        <MenuItem onClick={handleUserMenuClose}>Profile</MenuItem>
        <MenuItem onClick={handleUserMenuClose}>Settings</MenuItem>
        <MenuItem onClick={handleUserMenuClose}>Logout</MenuItem>
      </Menu>
    </>
  );
};

export default Header;
