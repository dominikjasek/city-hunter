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
      <Box mt={4}>
        <Typography variant={'h6'} sx={{ mb: 4 }}>
          Díváte se kolem sebe? <SecondaryText>City Hunter</SecondaryText> je online hra, která to prověří. Úkolem je
          vyznačit místo na mapě, které je zachyceno na obrázku.
        </Typography>
        <Typography variant={'h6'} sx={{ mb: 6 }}>
          <p>
            Hra už skončila 🙂 Hráli jsme v <SecondaryText>Třebíči</SecondaryText> a v{' '}
            <SecondaryText>Brně</SecondaryText>. Startovali jsme <SecondaryText>4. 6. 2023</SecondaryText> a hra trvala{' '}
            <SecondaryText>20 dní</SecondaryText>.
          </p>
          <p>
            Každý večer byla zveřejněna nová otázka a měli jste 1 hodinu, abyste odpověděli. V Třebíči jsme začínali
            každý den v 19:00, v Brně pak o hodinu později - ve 20:00.
          </p>
          <p>Děkuji všem, kdo se hry zúčastnili, pokud by ji někdo chtěl uspořádat ve svém měste, kontaktujte mě 🥳</p>
        </Typography>
        <Stack direction={'column'} mx={'auto'} gap={1}>
          <Link className={'no-style'} href={'/demo'} passHref>
            <Button color={'secondary'} variant={'contained'} sx={{ width: '250px' }}>
              Vyzkoušet ukázku
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
