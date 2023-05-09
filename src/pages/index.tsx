import { NextPageWithLayout } from './_app';
import { Box, Button, Stack, Typography } from '@mui/material';
import React from 'react';
import Link from 'next/link';
import { SecondaryText } from '~/components/common/Typography/typography';

const IndexPage: NextPageWithLayout = () => {
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
          <SecondaryText>1. 9. 2023</SecondaryText> a hra bude trvat <SecondaryText>20 dnů</SecondaryText>. Každý večer
          zveřejníme v 20:00 novou otázku.
        </Typography>
        <Stack direction={'column'} mx={'auto'} gap={1}>
          <Link className={'no-style'} href={'/demo'} passHref>
            <Button color={'secondary'} variant={'contained'} sx={{ width: '250px' }}>
              Vyzkoušet demo
            </Button>
          </Link>
          <Link className={'no-style'} href={'/faq'} passHref>
            <Button color={'secondary'} variant={'outlined'} sx={{ width: '250px' }}>
              FAQ
            </Button>
          </Link>
        </Stack>
      </Box>
    </Stack>
  );
};

export default IndexPage;
