import { NextPage } from 'next';
import { trpc } from '~/utils/trpc';
import { Loader } from '~/components/common/Loader/Loader';
import { Box, Typography } from '@mui/material';
import { TournamentContainer } from '~/components/tournament/TournamentContainer';
import Link from 'next/link';
import { ssgHelpers } from '~/server/ssgHelpers';

export const PlayPage: NextPage = () => {
  const { data: tournamentsData, isLoading } = trpc.tournament.getAllTournaments.useQuery();

  if (isLoading) {
    return <Loader title={'Načítání...'} />;
  }

  return (
    <Box>
      <Typography variant={'h5'}>Hrajeme v těchto městech:</Typography>
      {tournamentsData?.tournaments.map((tournament) => (
        <Link key={tournament.id} href={`/play/${tournament.id}`} className={'no-style'} passHref>
          <TournamentContainer
            tournamentId={tournament.id}
            cityName={tournament.city}
            startDate={tournament.startDate}
            endDate={tournament.endDate}
            previewImageUrl={tournament.previewImageUrl}
            tournamentName={tournament.name}
          />
        </Link>
      ))}
    </Box>
  );
};

export default PlayPage;

export const getStaticProps = async () => {
  await ssgHelpers.tournament.getAllTournaments.prefetch();

  return {
    props: {
      trpcState: ssgHelpers.dehydrate(),
    },
  };
};
