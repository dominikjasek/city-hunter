import { NextPage } from 'next';
import { trpc } from '~/utils/trpc';
import { Loader } from '~/components/common/Loader/Loader';
import { Box, Typography } from '@mui/material';
import { TournamentPlayContainer } from '~/components/tournament/TournamentPlayContainer';
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
      {tournamentsData?.map((tournament) => (
        <Link key={tournament.id} href={`/hrat/${tournament.id}`} className={'no-style'} passHref>
          <TournamentPlayContainer
            tournamentId={tournament.id}
            cityName={tournament.cityName}
            startDate={tournament.startDate}
            endDate={tournament.endDate}
            previewImageUrl={tournament.previewImageUrl}
            tournamentName={tournament.tournamentName}
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
