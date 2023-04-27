import { NextPageWithLayout } from './_app';
import { Box, Button, Stack, styled, Typography } from '@mui/material';
import React from 'react';
import Image from 'next/image';
import LogoWhite from '@public/Logo-white.svg';
import Link from 'next/link';

const SecondaryColor = styled('span')(({ theme }) => ({
  color: theme.palette.secondary.main,
}));

const IndexPage: NextPageWithLayout = () => {
  return (
    <Stack
      direction={'column'}
      gap={4}
      justifyContent={'space-evenly'}
      alignItems={'center'}
      sx={{ maxWidth: '800px', mx: 'auto', mt: { xs: 0, md: 2 }, mb: 6 }}
    >
      <Box
        sx={{
          minWidth: { xs: 100, sm: 110, md: 130, lg: 200 },
          height: { xs: 100, sm: 110, md: 130, lg: 200 },
          position: 'relative',
        }}
      >
        <Image
          priority
          src={LogoWhite}
          alt="Logo City Hunter"
          fill
          style={{ fill: 'white' }}
        />
      </Box>
      <Box>
        <Typography variant={'h6'} sx={{ mb: 4 }}>
          Díváte se kolem sebe? <SecondaryColor>City Hunter</SecondaryColor> je
          online hra, která to prověří. Úkolem je vyznačit místo na mapě, které
          je zachyceno na obrázku.
        </Typography>
        <Typography variant={'h6'} sx={{ mb: 6 }}>
          Hrajeme v <SecondaryColor>Třebíči</SecondaryColor> a v{' '}
          <SecondaryColor>Brně</SecondaryColor>. Startujeme{' '}
          <SecondaryColor>1. 9. 2023</SecondaryColor> a hra bude trvat{' '}
          <SecondaryColor>20 dnů</SecondaryColor>.
        </Typography>
        <Stack
          direction={'column'}
          mx={'auto'}
          gap={1}
          sx={{ maxWidth: '250px' }}
        >
          <Button color={'secondary'} variant={'contained'}>
            <Link className={'no-style'} href={'/play/demo'}>
              Vyzkoušet demo
            </Link>
          </Button>
          <Button color={'secondary'} variant={'outlined'}>
            <Link className={'no-style'} href={'/play/demo'}>
              FAQ
            </Link>
          </Button>
        </Stack>
      </Box>
    </Stack>
  );
};

export default IndexPage;
