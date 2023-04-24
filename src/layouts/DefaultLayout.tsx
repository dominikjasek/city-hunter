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
        <Container component={'main'} sx={{ pb: 5 }}>
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
            Vytvořil{' '}
            <a className="no-style" href="mailto: dominik@dominikjasek.cz">
              Dominik Jašek
            </a>
          </Typography>
        </Box>
      </Box>
    </>
  );
};
