import { NextPage } from 'next';
import { Box, Card, CardActionArea, Stack, Typography } from '@mui/material';
import { trpc } from '~/utils/trpc';
import { Loader } from '~/components/common/Loader/Loader';
import Link from 'next/link';
import { ssgHelpers } from '~/server/ssgHelpers';
import { formatDate } from '~/utils/formatter/dateFormatter';
import { SecondaryText } from '~/components/common/Typography/typography';

export const Index: NextPage = () => {
  const { data: tournamentsData, isLoading } = trpc.tournament.getAllTournaments.useQuery();

  if (isLoading) {
    return <Loader title={'Načítání...'} />;
  }

  return (
    <Box>
      <Typography variant={'h5'}>Výsledky turnajů:</Typography>
      <Stack direction={'row'} flexWrap={'wrap'} gap={2} justifyContent={'center'}>
        {tournamentsData?.map((tournament) => (
          <Card
            key={tournament.id}
            variant="outlined"
            sx={{
              m: 2,
              boxShadow: 2,
              '&:hover': {
                boxShadow: 6,
              },
              backgroundColor: 'transparent',
              borderColor: 'rgba(255,255,255,0.4)',
              maxWidth: 700,
            }}
          >
            <Link href={`/vysledky/${tournament.id}`} className={'no-style'} passHref>
              <CardActionArea sx={{ zIndex: 1, px: 8, py: 4 }}>
                <Stack direction={'column'} alignItems={'center'} justifyContent={'center'}>
                  <Typography variant={'h5'}>
                    <SecondaryText>{tournament.tournamentName}</SecondaryText>
                  </Typography>
                  <Typography variant={'h6'}>{`${formatDate(tournament.startDate)} - ${formatDate(
                    tournament.endDate,
                  )}`}</Typography>
                  <Typography>Počet kol: {tournament.questionsCount}</Typography>
                  <Typography>Počet hráčů: {tournament.contendersCount}</Typography>
                </Stack>
              </CardActionArea>
            </Link>
          </Card>
        ))}
      </Stack>
    </Box>
  );
};

export default Index;

export const getStaticProps = async () => {
  await ssgHelpers.tournament.getAllTournaments.prefetch();

  return {
    props: {
      trpcState: ssgHelpers.dehydrate(),
    },
  };
};
