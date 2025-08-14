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
  background: 'rgba(10, 10, 15, 0.9)',
  backdropFilter: 'blur(20px)',
  borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
  boxShadow: '0 4px 32px rgba(0, 255, 255, 0.1)'
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
  padding: '8px 16px',
  borderRadius: '8px',
  cursor: 'pointer',
  transition: 'all 0.3s ease-in-out',
  color: active ? theme.palette.primary.main : theme.palette.text.secondary,
  backgroundColor: active ? 'rgba(0, 255, 255, 0.1)' : 'transparent',
  border: active ? '1px solid rgba(0, 255, 255, 0.3)' : '1px solid transparent',
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
    { label: 'Catalog', path: '/catalog' },
    { label: 'My Rooms', path: '/my-rooms' }
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
                <IconButton color="inherit">
                  <Badge badgeContent={3} color="error">
                    <NotificationsIcon />
                  </Badge>
                </IconButton>
                
                <IconButton onClick={handleUserMenuOpen} color="inherit">
                  <Avatar 
                    src="https://i.pravatar.cc/150?img=1" 
                    sx={{ width: 32, height: 32 }}
                  />
                </IconButton>
                
                <GlowButton 
                  variant="outline" 
                  size="small"
                  onClick={() => handleNavigate('/auth')}
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
            background: 'rgba(26, 26, 46, 0.95)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.1)'
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
            background: 'rgba(26, 26, 46, 0.95)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            mt: 1
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
