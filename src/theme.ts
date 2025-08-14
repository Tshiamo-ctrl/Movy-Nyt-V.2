import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#00ffff',
      light: '#4dffff',
      dark: '#00cccc',
      contrastText: '#0a0a0f'
    },
    secondary: {
      main: '#4169e1',
      light: '#6a8aff',
      dark: '#2c4fb3',
      contrastText: '#ffffff'
    },
    success: {
      main: '#00ff88',
      light: '#4dffaa',
      dark: '#00cc6a',
      contrastText: '#0a0a0f'
    },
    warning: {
      main: '#ffd700',
      light: '#ffdf4d',
      dark: '#ccac00',
      contrastText: '#0a0a0f'
    },
    background: {
      default: '#0a0a0f',
      paper: '#1a1a2e'
    },
    text: {
      primary: '#ffffff',
      secondary: '#b8b8b8'
    },
    grey: {
      50: '#f5f5f5',
      100: '#e0e0e0',
      200: '#cccccc',
      300: '#b8b8b8',
      400: '#999999',
      500: '#808080',
      600: '#666666',
      700: '#4d4d4d',
      800: '#333333',
      900: '#1a1a1a'
    },
    common: {
      black: '#0a0a0f',
      white: '#ffffff'
    },
    divider: 'rgba(255, 255, 255, 0.12)'
  },
  typography: {
    fontFamily: '"Inter", "Montserrat", "Roboto", sans-serif',
    h1: {
      fontSize: '3rem',
      fontWeight: 700,
      letterSpacing: '-0.02em',
      lineHeight: 1.2
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      lineHeight: 1.3
    },
    h3: {
      fontSize: '1.5rem',
      fontWeight: 500,
      lineHeight: 1.4
    },
    body1: {
      fontSize: '1rem',
      fontWeight: 400,
      lineHeight: 1.6
    },
    caption: {
      fontSize: '0.875rem',
      fontWeight: 500,
      lineHeight: 1.4
    }
  },
  shape: {
    borderRadius: 12
  },
  shadows: [
    'none',
    '0 2px 8px rgba(0, 255, 255, 0.15)',
    '0 4px 16px rgba(0, 255, 255, 0.2)',
    '0 8px 24px rgba(0, 255, 255, 0.25)',
    '0 12px 32px rgba(0, 255, 255, 0.3)',
    '0 16px 40px rgba(0, 255, 255, 0.35)',
    '0 20px 48px rgba(0, 255, 255, 0.4)',
    '0 24px 56px rgba(0, 255, 255, 0.45)',
    '0 28px 64px rgba(0, 255, 255, 0.5)',
    '0 32px 72px rgba(0, 255, 255, 0.55)',
    '0 36px 80px rgba(0, 255, 255, 0.6)',
    '0 40px 88px rgba(0, 255, 255, 0.65)',
    '0 44px 96px rgba(0, 255, 255, 0.7)',
    '0 48px 104px rgba(0, 255, 255, 0.75)',
    '0 52px 112px rgba(0, 255, 255, 0.8)',
    '0 56px 120px rgba(0, 255, 255, 0.85)',
    '0 60px 128px rgba(0, 255, 255, 0.9)',
    '0 64px 136px rgba(0, 255, 255, 0.95)',
    '0 68px 144px rgba(0, 255, 255, 1)',
    '0 72px 152px rgba(0, 255, 255, 1)',
    '0 76px 160px rgba(0, 255, 255, 1)',
    '0 80px 168px rgba(0, 255, 255, 1)',
    '0 84px 176px rgba(0, 255, 255, 1)',
    '0 88px 184px rgba(0, 255, 255, 1)',
    '0 92px 192px rgba(0, 255, 255, 1)'
  ]
});

export default theme;