import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import {
  Box,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useTheme,
} from '@mui/material';
import { TournamentRoundLinks } from '~/components/ranking/TournamentRoundLinks';
import { trpc } from '~/utils/trpc';
import { Loader } from '~/components/common/Loader/Loader';
import { MessageBox } from '~/components/common/MessageBox/MessageBox';
import { db } from '~/db/drizzle';
import { questions } from '~/db/schema';
import { and, isNotNull } from 'drizzle-orm/expressions';
import { ssgHelpers } from '~/server/ssgHelpers';
import { MapWithAnswers } from '~/components/MapPicker/MapWithAnswers';
import { useUser } from '@clerk/nextjs';
import { useMemo, useState } from 'react';
import { AnswerLocation } from '~/components/MapPicker/types';

interface TournamentRoundRankingPageProps {
  tournamentId: string;
  roundOrder: number;
}

export const TournamentRoundRankingPage: NextPage<TournamentRoundRankingPageProps> = (props) => {
  const tournamentId = props.tournamentId;
  const roundOrder = props.roundOrder;
  const user = useUser();

  const { data: questionRanking, isLoading: isQuestionRankingLoading } = trpc.ranking.getQuestionRanking.useQuery({
    tournamentId,
    roundOrder,
  });
  const { data: tournamentDetails, isLoading: isTournamentDetailsLoading } =
    trpc.tournament.getTournamentDetails.useQuery({ tournamentId });
  const { data: tournamentQuestions, isLoading: isTournamentQuestionsLoading } =
    trpc.tournament.getTournamentQuestionsForId.useQuery({
      tournamentId,
    });

  const theme = useTheme();

  const [inspectUserId, setInspectUserId] = useState<string | null>(null);
  const myAnswer = useMemo(
    () => questionRanking?.answers.find((answer) => answer.userId === user.user?.id),
    [questionRanking, questionRanking?.answers, user, user.user?.id],
  );

  const mapLocations = useMemo<AnswerLocation[]>(() => {
    const locations: AnswerLocation[] = [];

    if (inspectUserId) {
      const inspectUserAnswer = questionRanking?.answers.find((answer) => answer.userId === inspectUserId);
      if (inspectUserAnswer) {
        locations.push({ type: 'user-answer', location: inspectUserAnswer.location, isHighlighted: false });
      }
      return locations;
    }

    if (questionRanking) {
      locations.push({ type: 'solution', location: questionRanking.question.correctLocation });
    }

    if (myAnswer) {
      locations.push({ type: 'user-answer', location: myAnswer.location, isHighlighted: true });
    }

    return locations;
  }, [questionRanking, myAnswer?.id, inspectUserId]);

  if (isQuestionRankingLoading || isTournamentDetailsLoading || isTournamentQuestionsLoading) {
    return <Loader title={'Načítám...'} />;
  }

  if (!questionRanking || !tournamentDetails || !tournamentQuestions) {
    return (
      <MessageBox
        message={'Něco se pokazilo, nepodařilo se nám načíst data. Zkuste to prosím později'}
        type={'warning'}
      />
    );
  }

  return (
    <Box maxWidth={'lg'} mx={'auto'}>
      <Typography variant={'h5'}>Žebříček - {tournamentDetails.name}</Typography>
      <TournamentRoundLinks tournamentId={tournamentDetails.id} tournamentQuestions={tournamentQuestions} />
      <Stack direction={{ xs: 'column', md: 'row' }} gap={2} justifyContent={'start'} alignItems={'start'}>
        <TableContainer
          sx={{
            backgroundColor: 'transparent',
            backgroundImage: 'inherit',
            maxWidth: 600,
            mx: 'auto',
            border: 0.3,
            borderColor: 'rgba(255,255,255,0.3)',
          }}
          component={Paper}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Pořadí</TableCell>
                <TableCell>Přezdívka</TableCell>
                <TableCell align={'center'}>Čas</TableCell>
                <TableCell align={'center'}>Skóre</TableCell>
                <TableCell align="center">Medaile</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {questionRanking.answers.map((row, index) => (
                <TableRow
                  key={row.userId}
                  sx={{
                    '&:last-child td, &:last-child th': { border: 0 },
                    backgroundColor: 'transparent',
                    '&:hover': { backgroundColor: theme.palette.primary.main },
                  }}
                  onMouseEnter={(_) => setInspectUserId(row.userId)}
                  onMouseLeave={(_) => setInspectUserId(null)}
                >
                  <TableCell align="center">{index + 1}</TableCell>
                  <TableCell component="th" scope="row">
                    {row.nickName}
                  </TableCell>
                  <TableCell align="center">{row.durationInSeconds}</TableCell>
                  <TableCell align="center">{row.score}</TableCell>
                  <TableCell align="center">
                    <Typography fontSize={'1.5rem'}>
                      {row.medal === 'GOLD' && '🥇'}
                      {row.medal === 'SILVER' && '🥈'}
                      {row.medal === 'BRONZE' && '🥉'}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box sx={{ width: '100%', position: 'sticky', top: 20 }}>
          <MapWithAnswers
            centerPoint={questionRanking.map.centerPoint}
            zoom={questionRanking.map.mapZoom}
            locations={mapLocations}
          />
        </Box>
      </Stack>
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
    paths: dbQuestions
      .map((question) => {
        if (!question.tournamentId || !question.roundOrder) {
          return null;
        }
        return { params: { tournamentId: question.tournamentId, roundOrder: question.roundOrder.toString() } };
      })
      .filter(Boolean),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<{ tournamentId: string; roundOrder: number }> = async (context) => {
  const tournamentId = context.params?.tournamentId;
  const roundOrder = Number(context.params?.roundOrder);

  if (typeof tournamentId !== 'string') {
    throw new Error('No tournamentId or it is not a string');
  }

  await ssgHelpers.ranking.getQuestionRanking.prefetch({ tournamentId, roundOrder });
  await ssgHelpers.tournament.getTournamentQuestionsForId.prefetch({ tournamentId });
  await ssgHelpers.tournament.getTournamentDetails.prefetch({ tournamentId });

  return {
    props: {
      trpcState: ssgHelpers.dehydrate(),
      tournamentId,
      roundOrder,
    },
    revalidate: 60, // because of nickname update
  };
};
