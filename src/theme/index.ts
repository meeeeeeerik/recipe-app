import { createTheme } from '@mui/material/styles';

export function getTheme(dark: boolean) {
  return createTheme({
    palette: {
      mode: dark ? 'dark' : 'light',
      primary: { main: '#FF6B35' },
      secondary: { main: '#4CAF50' },
      success: { main: '#4CAF50' },
      warning: { main: '#FFC107' },
      background: {
        default: dark ? '#0D0F0A' : '#FAFAF5',
        paper: dark ? '#161810' : '#FFFFFF',
      },
    },
    typography: {
      fontFamily: '"Nunito", "Helvetica Neue", sans-serif',
      h1: { fontWeight: 900 },
      h2: { fontWeight: 800 },
      h3: { fontWeight: 800 },
      h4: { fontWeight: 700 },
      h5: { fontWeight: 700 },
      h6: { fontWeight: 700 },
    },
    shape: { borderRadius: 14 },
    components: {
      MuiCard: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
            border: dark ? '1px solid rgba(255,255,255,0.06)' : '1px solid rgba(0,0,0,0.06)',
            boxShadow: dark ? '0 4px 20px rgba(0,0,0,0.4)' : '0 4px 20px rgba(0,0,0,0.07)',
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: { textTransform: 'none', fontWeight: 700, borderRadius: 10 },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: { fontWeight: 700 },
        },
      },
    },
  });
}

export const CUISINE_COLORS: Record<string, string> = {
  Italian: '#E63946',
  Asian: '#FF9F1C',
  Mexican: '#2EC4B6',
  American: '#3A86FF',
  Mediterranean: '#8338EC',
  Indian: '#FB5607',
  French: '#FFBE0B',
  Japanese: '#FF006E',
};

export const DIFFICULTY_COLORS: Record<string, string> = {
  Easy: '#4CAF50',
  Medium: '#FF9800',
  Hard: '#F44336',
};

export const DIET_COLORS: Record<string, string> = {
  Vegetarian: '#66BB6A',
  Vegan: '#43A047',
  'Gluten-Free': '#FFA726',
  'Dairy-Free': '#42A5F5',
  Keto: '#AB47BC',
  Healthy: '#26C6DA',
};
