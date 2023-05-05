import { GetStaticPaths, NextPage } from 'next';
import { Box, Typography } from '@mui/material';
import { TournamentRoundLinks } from '~/components/ranking/TournamentRoundLinks';
import { useRouter } from 'next/router';
import { trpc } from '~/utils/trpc';
import { Loader } from '~/components/common/Loader/Loader';
import { MessageBox } from '~/components/common/MessageBox/MessageBox';
import { db } from '~/db/drizzle';
import { questions } from '~/db/schema';
import { and, isNotNull } from 'drizzle-orm/expressions';

export const TournamentRoundRankingPage: NextPage = () => {
  const { query } = useRouter();
  const tournamentId = query.tournamentId!.toString();
  const roundOrder = query.roundOrder!.toString();

  const { data: tournamentDetails, isLoading: isTournamentDetailsLoading } =
    trpc.tournament.getTournamentDetails.useQuery({ tournamentId });
  const { data: tournamentQuestions, isLoading: isTournamentQuestionsLoading } =
    trpc.tournament.getTournamentQuestionsForId.useQuery({
      tournamentId,
    });

  if (isTournamentDetailsLoading || isTournamentQuestionsLoading) {
    return <Loader title={'Načítám...'} />;
  }

  if (!tournamentDetails || !tournamentQuestions) {
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

export default TournamentRoundRankingPage;

export const getStaticPaths: GetStaticPaths = async () => {
  const dbQuestions = await db
    .select({ tournamentId: questions.tournamentId, roundOrder: questions.roundOrder })
    .from(questions)
    .where(and(isNotNull(questions.tournamentId), isNotNull(questions.roundOrder)));

  return {
    paths: dbQuestions.map((question) => ({
      params: { tournamentId: question.tournamentId!.toString(), roundOrder: question.roundOrder!.toString() },
    })),
    fallback: false,
  };
};

export async function getStaticProps() {
  return {
    props: {},
  };
}
