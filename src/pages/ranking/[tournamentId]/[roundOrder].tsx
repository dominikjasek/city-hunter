import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
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
import { and, isNotNull } from 'drizzle-orm';
import { ssgHelpers } from '~/server/ssgHelpers';
import { MapWithAnswers } from '~/components/MapPicker/MapWithAnswers';
import { useUser } from '@clerk/nextjs';
import { useEffect, useMemo, useState } from 'react';
import { AnswerLocation } from '~/components/MapPicker/types';
import { haversineDistance } from '~/utils/score/evaluate-score';
import Image from 'next/image';
import { LightBox } from '~/components/LightBox/LightBox';
import { SecondaryText } from '~/components/common/Typography/typography';
import { formatDate } from '~/utils/formatter/dateFormatter';
import LockOpen from '@mui/icons-material/LockOpen';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { createDurationString } from '~/utils/ranking/createDurationString';
import { imagePlaceholderProps } from '~/utils/image-placeholder/image-placeholder';

interface TournamentRoundRankingPageProps {
  tournamentId: string;
  roundOrder: number;
}

export const TournamentRoundRankingPage: NextPage<TournamentRoundRankingPageProps> = (props) => {
  const tournamentId = props.tournamentId;
  const roundOrder = props.roundOrder;
  const user = useUser();

  const [showAnswers, setShowAnswers] = useState(false);
  // React remains the value of useState when using dynamic routing
  useEffect(() => {
    setShowAnswers(false);
  }, [tournamentId, roundOrder]);

  const { data: questionRanking, isLoading: isQuestionRankingLoading } = trpc.ranking.getQuestionRanking.useQuery({
    tournamentId,
    roundOrder,
  });
  const { data: tournamentDetails, isLoading: isTournamentDetailsLoading } = trpc.tournament.getDetailsForId.useQuery({
    tournamentId,
  });
  const { data: tournamentQuestions, isLoading: isTournamentQuestionsLoading } =
    trpc.tournament.getSafelyQuestionsForId.useQuery({
      tournamentId,
    });

  const theme = useTheme();
  const [lightboxIndex, setLightboxIndex] = useState(-1);
  const images = useMemo(() => {
    let images: string[] = [];
    if (questionRanking) {
      images.push(questionRanking.question.questionImageUrl);
      if (showAnswers) {
        images = images.concat(questionRanking.question.answerImagesUrl);
      }
    }
    return images;
  }, [questionRanking, showAnswers]);

  const [inspectUserId, setInspectUserId] = useState<string | null>(null);
  const myAnswer = useMemo(
    () => questionRanking?.answers.find((answer) => answer.userId === user.user?.id),
    [questionRanking, user],
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

    if (questionRanking && showAnswers) {
      locations.push({ type: 'solution', location: questionRanking.question.correctLocation });
    }

    if (myAnswer) {
      locations.push({ type: 'user-answer', location: myAnswer.location, isHighlighted: true });
    }

    return locations;
  }, [questionRanking, myAnswer, inspectUserId, showAnswers]);

  if (isQuestionRankingLoading || isTournamentDetailsLoading || isTournamentQuestionsLoading) {
    return <Loader title={'Načítám tady...'} />;
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
      <LightBox
        isOpen={lightboxIndex >= 0}
        index={lightboxIndex}
        imagesUrl={images}
        onClose={() => setLightboxIndex(-1)}
      />
      <Typography variant={'h5'}>Výsledky - {tournamentDetails.name}</Typography>
      <TournamentRoundLinks tournamentId={tournamentDetails.id} tournamentQuestions={tournamentQuestions} />

      <Accordion defaultExpanded sx={{ backgroundColor: 'transparent' }} disableGutters>
        <AccordionSummary expandIcon={<ExpandMore />} aria-controls="panel1a-content" id="panel1a-header">
          <Typography variant={'h6'}>
            {formatDate(questionRanking.question.endDate)} - {questionRanking.question.name}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Stack sx={{ my: 2 }} direction={'row'} justifyContent={'center'}>
            <Stack
              direction={'row'}
              justifyContent={'center'}
              alignItems={'center'}
              sx={{ flex: 2 }}
              gap={1}
              flexWrap={'wrap'}
            >
              {images.map((image) => (
                <Box
                  key={image}
                  sx={{
                    width: { xs: 150, sm: 200, md: 250 },
                    height: { xs: 150, sm: 200, md: 250 },
                    mt: 2,
                    position: 'relative',
                    cursor: 'pointer',
                  }}
                >
                  <Image
                    src={image}
                    alt={questionRanking.question.name}
                    fill
                    {...imagePlaceholderProps}
                    style={{
                      objectFit: 'contain',
                    }}
                    onClick={() => setLightboxIndex(images.indexOf(image))}
                  />
                </Box>
              ))}
            </Stack>
            <Stack direction={'column'} alignItems={'start'} gap={1} sx={{ width: '100%', flex: 2, ml: 2 }}>
              <Typography textAlign={'initial'}>
                <SecondaryText>Zadání</SecondaryText>: {questionRanking.question.questionDescription}
              </Typography>
              <Stack textAlign={'initial'} sx={{ height: '100%' }}>
                {showAnswers ? (
                  <Typography>
                    <SecondaryText>Řešení</SecondaryText>:{' '}
                    <Typography
                      className={'answer'}
                      dangerouslySetInnerHTML={{ __html: questionRanking.question.answerDescription ?? '' }}
                    ></Typography>
                  </Typography>
                ) : (
                  <>
                    <Button
                      variant={'contained'}
                      sx={{ mx: 'auto', mt: 2 }}
                      color={'secondary'}
                      startIcon={<LockOpen />}
                      onClick={() => setShowAnswers(true)}
                    >
                      Zobrazit řešení
                    </Button>
                  </>
                )}
              </Stack>
            </Stack>
          </Stack>
        </AccordionDetails>
      </Accordion>

      <Typography variant={'h6'} my={2}>
        Žebříček
      </Typography>

      <Stack direction={{ xs: 'column', md: 'row' }} gap={2} justifyContent={'start'} alignItems={'start'}>
        <TableContainer
          sx={{
            backgroundColor: 'transparent',
            backgroundImage: 'inherit',
            maxWidth: 700,
            mx: 'auto',
            border: 0.3,
            borderColor: 'rgba(255,255,255,0.3)',
            flex: 3,
          }}
          component={Paper}
        >
          <Table size={'small'}>
            <TableHead>
              <TableRow>
                <TableCell>Pořadí</TableCell>
                <TableCell>Přezdívka</TableCell>
                <TableCell align={'center'}>Čas</TableCell>
                <TableCell align={'center'}>Vzdálenost</TableCell>
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
                  onMouseEnter={() => setInspectUserId(row.userId)}
                  onMouseLeave={() => setInspectUserId(null)}
                >
                  <TableCell align="center">{index + 1}</TableCell>
                  <TableCell component="th" scope="row">
                    {row.nickName}
                  </TableCell>
                  <TableCell align="center">{createDurationString(row.durationInSeconds)}</TableCell>
                  <TableCell align="center">
                    {Math.floor(haversineDistance(row.location, questionRanking.question.correctLocation))} m
                  </TableCell>
                  <TableCell align="center">
                    <SecondaryText>{row.score}</SecondaryText>
                  </TableCell>
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
        <Box
          sx={{ width: '100%', height: { xs: 300, md: 500 }, position: 'sticky', top: 20, flex: { xs: 'none', md: 2 } }}
        >
          <MapWithAnswers
            centerPoint={questionRanking.map.centerPoint}
            zoom={questionRanking.map.mapZoom}
            locations={mapLocations}
            showLegendUserAnswer={true}
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

  await Promise.all([
    ssgHelpers.ranking.getQuestionRanking.prefetch({ tournamentId, roundOrder }),
    ssgHelpers.tournament.getSafelyQuestionsForId.prefetch({ tournamentId }),
    ssgHelpers.tournament.getDetailsForId.prefetch({ tournamentId }),
  ]);

  return {
    props: {
      trpcState: ssgHelpers.dehydrate(),
      tournamentId,
      roundOrder,
    },
  };
};
