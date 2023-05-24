import { NextPageWithLayout } from './_app';
import { Box, Button, Stack, Typography, useTheme } from '@mui/material';
import React from 'react';
import Link from 'next/link';
import { SecondaryText } from '~/components/common/Typography/typography';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';

const IndexPage: NextPageWithLayout = () => {
  const theme = useTheme();

  return (
    <Stack
      direction={'column'}
      gap={4}
      justifyContent={'space-evenly'}
      alignItems={'center'}
      sx={{ maxWidth: '800px', mx: 'auto', mt: { xs: 0, md: 2 }, mb: 6 }}
    >
      <Box mt={8}>
        <Typography variant={'h6'} sx={{ mb: 4 }}>
          Díváte se kolem sebe? <SecondaryText>City Hunter</SecondaryText> je online hra, která to prověří. Úkolem je
          vyznačit místo na mapě, které je zachyceno na obrázku.
        </Typography>
        <Typography variant={'h6'} sx={{ mb: 6 }}>
          Hrajeme v <SecondaryText>Třebíči</SecondaryText> a v <SecondaryText>Brně</SecondaryText>. Startujeme{' '}
          <SecondaryText>1. 6. 2023</SecondaryText> a hra bude trvat <SecondaryText>20 dnů</SecondaryText>. Každý večer
          bude zveřejněna v 20:00 nová otázka a do 21:00 budete mít čas odpovědět. Rozhodují vteřiny, jste připraveni?
        </Typography>
        <Stack direction={'column'} mx={'auto'} gap={1}>
          <Link className={'no-style'} href={'/demo'} passHref>
            <Button color={'secondary'} variant={'contained'} sx={{ width: '250px' }}>
              Vyzkoušet demo
            </Button>
          </Link>
        </Stack>
        <Stack direction="row" gap={2} justifyContent={'center'} mt={4}>
          <Link className={'no-style'} href={'https://www.facebook.com/people/City-Hunter/100092175761017/'} passHref>
            <FacebookIcon
              sx={{
                '&:hover': {
                  color: theme.palette.secondary.main,
                },
              }}
            />
          </Link>
          <Link className={'no-style'} href={'https://www.instagram.com/cityhunter.cz'} passHref>
            <InstagramIcon
              sx={{
                '&:hover': {
                  color: theme.palette.secondary.main,
                },
              }}
            />
          </Link>
        </Stack>
      </Box>
    </Stack>
  );
};

export default IndexPage;
