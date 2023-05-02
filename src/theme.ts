import { Fira_Code } from 'next/font/google';
import { createTheme } from '@mui/material/styles';

export const firaCode = Fira_Code({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  fallback: ['Helvetica', 'Arial', 'sans-serif'],
});

// Create a theme instance.
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#245680',
    },
    secondary: {
      main: '#f1bf14',
    },
    error: {
      main: '#DD0B0B',
    },
    warning: {
      main: '#FFE17B',
    },
    info: {
      main: '#7CAED7',
    },
    success: {
      main: '#32d527',
    },
  },
  typography: {
    fontFamily: firaCode.style.fontFamily,
    h1: {
      fontSize: '2.7rem',
      '@media (min-width:600px)': {
        fontSize: '3.3rem',
      },
      '@media (min-width:900px)': {
        fontSize: '4.5rem',
      },
    },
    h2: {
      fontSize: '2.5rem',
      '@media (min-width:600px)': {
        fontSize: '3rem',
      },
      '@media (min-width:900px)': {
        fontSize: '4.2rem',
      },
    },
    h3: {
      fontSize: '2rem',
      '@media (min-width:600px)': {
        fontSize: '2.7rem',
      },
      '@media (min-width:900px)': {
        fontSize: '3.5rem',
      },
    },
    h4: {
      fontSize: '1.8rem',
      '@media (min-width:600px)': {
        fontSize: '2.4rem',
      },
      '@media (min-width:900px)': {
        fontSize: '3rem',
      },
    },
    h5: {
      fontSize: '1.5rem',
      '@media (min-width:600px)': {
        fontSize: '1.8rem',
      },
      '@media (min-width:900px)': {
        fontSize: '2.4rem',
      },
    },
    h6: {
      fontSize: '1rem',
      '@media (min-width:600px)': {
        fontSize: '1.15rem',
      },
      '@media (min-width:900px)': {
        fontSize: '1.3rem',
      },
    },
  },
});

export default theme;
