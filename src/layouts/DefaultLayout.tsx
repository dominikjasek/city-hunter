import Head from 'next/head';
import { ReactNode } from 'react';
import { Navbar } from '~/components/navbar/Navbar';
import { Box, Container, Typography } from '@mui/material';

type DefaultLayoutProps = { children: ReactNode };

export const DefaultLayout = ({ children }: DefaultLayoutProps) => {
  return (
    <>
      <Head>
        <title>City Hunter</title>
        <link rel="icon" href="/favicon.ico" />
        <meta property="description" content="Online hra pro ty, kteří se dívají kolem sebe" />
        <meta
          property="og:image"
          content="https://res.cloudinary.com/dwdwjz5kb/image/upload/v1683751611/city_hunter_logo_tarlnh.png"
        />
        <meta property="og:title" content="City Hunter" />
        <meta property="og:description" content="Online hra pro ty, kteří se dívají kolem sebe" />
        <meta property="og:url" content="https://cityhunter.cz" />
      </Head>

      <Box
        sx={{
          textAlign: 'center',
          background: 'linear-gradient(139.88deg, #163c5b 2.97%, #853b50 110%)',
          minHeight: '100vh',
          color: 'white',
          pb: '10',
          position: 'relative',
        }}
      >
        <Navbar />
        <Container component={'main'} sx={{ pb: 5, mt: { xs: 2, sm: 1, md: 0 } }} maxWidth={'xl'}>
          {children}
        </Container>
        <Box
          component={'footer'}
          sx={{
            position: 'absolute',
            backgroundColor: 'rgb(0,0,0,0.15)',
            py: 0.5,
            bottom: 0,
            mx: 'auto',
            left: 0,
            right: 0,
          }}
        >
          <Typography fontSize={'0.75rem'} variant={'body2'}>
            City Hunter {new Date().getFullYear()}
          </Typography>
        </Box>
      </Box>
    </>
  );
};
