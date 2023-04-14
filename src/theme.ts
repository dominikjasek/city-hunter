import { Fira_Code, Fira_Sans } from 'next/font/google';
import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

export const fira = Fira_Code({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  fallback: ['Helvetica', 'Arial', 'sans-serif'],
});

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: '#f1bf14',
    },
    secondary: {
      main: '#245680',
    },
    error: {
      main: red.A400,
    },
  },
  typography: {
    fontFamily: fira.style.fontFamily,
  },
});

export default theme;
