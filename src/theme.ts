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
      main: '#57C84D',
    },
  },
  typography: {
    fontFamily: firaCode.style.fontFamily,
  },
});

export default theme;
