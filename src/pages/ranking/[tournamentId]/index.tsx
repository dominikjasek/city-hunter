import { GetStaticPaths, NextPage } from 'next';
import { Box, Typography } from '@mui/material';
import { trpc } from '~/utils/trpc';
import { useRouter } from 'next/router';
import { db } from '~/db/drizzle';
import { tournaments } from '~/db/schema';
import { Loader } from '~/components/common/Loader/Loader';
import { MessageBox } from '~/components/common/MessageBox/MessageBox';
import { TournamentRoundLinks } from '~/components/ranking/TournamentRoundLinks';

export const TournamentRankingPage: NextPage = () => {
  const { query } = useRouter();
  const tournamentId = query.tournamentId!.toString();

  const { data: tournamentDetails, isLoading: isTournamentDetailsLoading } =
    trpc.tournament.getTournamentDetails.useQuery({ tournamentId });
  const { data: tournamentQuestions, isLoading: isTournamentQuestionsLoading } =
    trpc.tournament.getTournamentQuestionsForId.useQuery({
      tournamentId,
    });
  const { data: ranking, isLoading: isRankingLoading } = trpc.ranking.getTournamentRanking.useQuery({
    tournamentId,
  });

  if (isTournamentDetailsLoading || isRankingLoading || isTournamentQuestionsLoading) {
    return <Loader title={'Načítám...'} />;
  }

  if (!tournamentDetails || !tournamentQuestions || !ranking) {
    return (
      <MessageBox
        message={'Něco se pokazilo, nepodařilo se nám načíst data. Zkuste to prosím později'}
        type={'warning'}
      />
    );
  }

  return (
    <Box>
      <Typography variant={'h5'}>Žebříček - {tournamentDetails.name}</Typography>
      <TournamentRoundLinks tournamentId={tournamentDetails.id} tournamentQuestions={tournamentQuestions} />
    </Box>
  );
};

export default TournamentRankingPage;

export const getStaticPaths: GetStaticPaths = async () => {
  const dbResult = await db.select({ tournamentId: tournaments.id }).from(tournaments);

  return {
    paths: dbResult.map((tournament) => ({ params: { tournamentId: tournament.tournamentId } })),
    fallback: false,
  };
};

export async function getStaticProps() {
  return {
    props: {},
  };
}
