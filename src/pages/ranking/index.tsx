import { NextPage } from 'next';
import { Box, Typography } from '@mui/material';
import { createProxySSGHelpers } from '@trpc/react-query/ssg';
import { appRouter } from '~/server/routers/_app';
import superjson from 'superjson';
import { trpc } from '~/utils/trpc';
import { Loader } from '~/components/common/Loader/Loader';
import Link from 'next/link';
import { TournamentContainer } from '~/components/tournament/TournamentContainer';

export const Index: NextPage = () => {
  const { data: tournamentsData, isLoading } = trpc.tournament.getAllTournaments.useQuery();

  if (isLoading) {
    return <Loader title={'Načítání...'} />;
  }

  return (
    <Box>
      <Typography variant={'h5'}>Žebříčky turnajů:</Typography>
      {tournamentsData?.tournaments.map((tournament) => (
        <Link key={tournament.id} href={`/ranking/${tournament.id}`} className={'no-style'} passHref>
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

export default Index;

export const getStaticProps = async () => {
  const ssg = createProxySSGHelpers({
    router: appRouter,
    ctx: { auth: null },
    transformer: superjson,
  });

  await ssg.tournament.getAllTournaments.prefetch();

  return {
    props: {
      trpcState: ssg.dehydrate(),
    },
  };
};
