import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1565C0',
      light: '#42A5F5',
      dark: '#0D47A1',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#0D47A1',
      light: '#1565C0',
      dark: '#0A2D6B',
      contrastText: '#ffffff',
    },
    accent: {
      main: '#42A5F5',
    },
    success: {
      main: '#10B981',
      light: '#34D399',
      dark: '#059669',
    },
    warning: {
      main: '#F59E0B',
      light: '#FCD34D',
      dark: '#D97706',
    },
    error: {
      main: '#EF4444',
      light: '#F87171',
      dark: '#DC2626',
    },
    background: {
      default: '#F8FAFC',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#0F172A',
      secondary: '#475569',
    },
    grey: {
      50: '#F8FAFC',
      100: '#F1F5F9',
      200: '#E2E8F0',
      300: '#CBD5E1',
      400: '#94A3B8',
      500: '#64748B',
      600: '#475569',
      700: '#334155',
      800: '#1E293B',
      900: '#0F172A',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica Neue", Arial, sans-serif',
    h1: {
      fontWeight: 800,
      fontSize: 'clamp(2rem, 5vw, 3.5rem)',
      lineHeight: 1.2,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontWeight: 700,
      fontSize: 'clamp(1.5rem, 3.5vw, 2.5rem)',
      lineHeight: 1.3,
      letterSpacing: '-0.01em',
    },
    h3: {
      fontWeight: 700,
      fontSize: 'clamp(1.25rem, 2.5vw, 2rem)',
      lineHeight: 1.4,
    },
    h4: {
      fontWeight: 600,
      fontSize: 'clamp(1.1rem, 2vw, 1.5rem)',
      lineHeight: 1.4,
    },
    h5: {
      fontWeight: 600,
      fontSize: '1.25rem',
      lineHeight: 1.5,
    },
    h6: {
      fontWeight: 600,
      fontSize: '1.1rem',
      lineHeight: 1.5,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.7,
      color: '#475569',
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.6,
      color: '#64748B',
    },
    subtitle1: {
      fontWeight: 500,
      fontSize: '1rem',
    },
    subtitle2: {
      fontWeight: 500,
      fontSize: '0.875rem',
    },
    caption: {
      fontSize: '0.75rem',
      color: '#94A3B8',
    },
    overline: {
      fontWeight: 700,
      letterSpacing: '0.15em',
      fontSize: '0.75rem',
    },
    button: {
      fontWeight: 600,
      letterSpacing: '0.02em',
      textTransform: 'none',
    },
  },
  shape: {
    borderRadius: 12,
  },
  shadows: [
    'none',
    '0px 1px 3px rgba(15,23,42,0.06), 0px 1px 2px rgba(15,23,42,0.04)',
    '0px 4px 6px rgba(15,23,42,0.05), 0px 2px 4px rgba(15,23,42,0.05)',
    '0px 10px 15px rgba(15,23,42,0.07), 0px 4px 6px rgba(15,23,42,0.05)',
    '0px 20px 25px rgba(15,23,42,0.08), 0px 8px 10px rgba(15,23,42,0.04)',
    '0px 25px 50px rgba(15,23,42,0.12)',
    '0px 25px 50px rgba(15,23,42,0.12)',
    '0px 25px 50px rgba(15,23,42,0.12)',
    '0px 25px 50px rgba(15,23,42,0.12)',
    '0px 25px 50px rgba(15,23,42,0.12)',
    '0px 25px 50px rgba(15,23,42,0.12)',
    '0px 25px 50px rgba(15,23,42,0.12)',
    '0px 25px 50px rgba(15,23,42,0.12)',
    '0px 25px 50px rgba(15,23,42,0.12)',
    '0px 25px 50px rgba(15,23,42,0.12)',
    '0px 25px 50px rgba(15,23,42,0.12)',
    '0px 25px 50px rgba(15,23,42,0.12)',
    '0px 25px 50px rgba(15,23,42,0.12)',
    '0px 25px 50px rgba(15,23,42,0.12)',
    '0px 25px 50px rgba(15,23,42,0.12)',
    '0px 25px 50px rgba(15,23,42,0.12)',
    '0px 25px 50px rgba(15,23,42,0.12)',
    '0px 25px 50px rgba(15,23,42,0.12)',
    '0px 25px 50px rgba(15,23,42,0.12)',
    '0px 25px 50px rgba(15,23,42,0.15)',
  ],
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          padding: '10px 24px',
          fontWeight: 600,
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 4px 12px rgba(21,101,192,0.3)',
            transform: 'translateY(-1px)',
          },
          transition: 'all 0.2s ease',
        },
        containedPrimary: {
          background: 'linear-gradient(135deg, #1565C0 0%, #42A5F5 100%)',
          '&:hover': {
            background: 'linear-gradient(135deg, #0D47A1 0%, #1565C0 100%)',
          },
        },
        outlinedPrimary: {
          borderWidth: '2px',
          '&:hover': {
            borderWidth: '2px',
          },
        },
        sizeLarge: {
          padding: '14px 32px',
          fontSize: '1rem',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '16px',
          boxShadow: '0px 4px 6px rgba(15,23,42,0.05), 0px 2px 4px rgba(15,23,42,0.05)',
          transition: 'all 0.3s ease',
          '&:hover': {
            boxShadow: '0px 20px 25px rgba(15,23,42,0.1), 0px 8px 10px rgba(15,23,42,0.06)',
            transform: 'translateY(-4px)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: '10px',
            '&:hover fieldset': {
              borderColor: '#1565C0',
            },
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          fontWeight: 500,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: '0 1px 0 rgba(15,23,42,0.08)',
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          fontWeight: 600,
          textTransform: 'none',
          fontSize: '0.95rem',
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: '#E2E8F0',
        },
      },
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
});

export default theme;
