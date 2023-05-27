import { NextPage } from 'next';
import { trpc } from '~/utils/trpc';
import { useRouter } from 'next/router';
import { Loader } from '~/components/common/Loader/Loader';
import { MessageBox } from '~/components/common/MessageBox/MessageBox';
import { Box, Stack, Typography, useTheme } from '@mui/material';
import { MapWithAnswers } from '~/components/MapPicker/MapWithAnswers';
import { formatDateTime } from '~/utils/formatter/dateFormatter';
import Image from 'next/image';
import { SecondaryText } from '~/components/common/Typography/typography';
import { NextSeo } from 'next-seo';
import { imagePlaceholderProps } from '~/utils/image-placeholder/image-placeholder';

const EXPECTED_QUESTION_LENGTH = 20;
const EXPECTED_START_TIME_BRNO = '20:00'; //getMinutes returns only single digit
const EXPECTED_END_TIME_BRNO = '21:00'; //getMinutes returns only single digit
const EXPECTED_START_TIME_TREBIC = '19:00'; //getMinutes returns only single digit
const EXPECTED_END_TIME_TREBIC = '20:00'; //getMinutes returns only single digit

const renderBoolean = (value: boolean) => {
  return value ? '✅' : '❌';
};

const AdminQuestionsPages: NextPage = () => {
  const router = useRouter();
  const { cityId, tournamentId } = router.query;
  const theme = useTheme();

  const { data: questions, isLoading } = trpc.question.getAdminQuestions.useQuery(
    { tournamentId: tournamentId?.toString(), cityId: cityId ? Number(cityId) : undefined },
    {
      enabled: router.isReady,
      refetchOnMount: true,
    },
  );

  if (isLoading) {
    return <Loader title="Načítám..." />;
  }

  if (!questions) {
    return <MessageBox message={'Nepodařilo se načíst data.'} type={'error'} />;
  }

  return (
    <>
      <NextSeo nofollow={true} noindex={true} />
      <Box>
        {tournamentId && (
          <Stack direction={'column'} justifyContent={'center'} alignItems={'center'} gap={2} sx={{ p: 2 }}>
            <SecondaryText>Kontrola soutěže:</SecondaryText>
            <Typography>
              Jsou definovány všechna ({EXPECTED_QUESTION_LENGTH}) kola <code>roundOrder</code>{' '}
              {renderBoolean(
                questions.length === EXPECTED_QUESTION_LENGTH &&
                  questions.every((q, index) => q.roundOrder && q.roundOrder === index + 1), // we expect that questions are already sorted by roundOrder from api
              )}
            </Typography>
            <Typography>
              Všechny otázky začínají v čase{' '}
              {tournamentId === 'trebic' ? EXPECTED_START_TIME_TREBIC : EXPECTED_START_TIME_BRNO}{' '}
              {renderBoolean(
                questions.every((q) => {
                  const startDate = `${q.startDate?.getHours()}:${q.startDate
                    ?.getMinutes()
                    .toString()
                    .padStart(2, '0')}`;
                  return tournamentId === 'trebic'
                    ? startDate === EXPECTED_START_TIME_TREBIC
                    : startDate === EXPECTED_START_TIME_BRNO;
                }),
              )}
            </Typography>
            <Typography>
              Všechny otázky začínají v čase{' '}
              {tournamentId === 'trebic' ? EXPECTED_END_TIME_TREBIC : EXPECTED_END_TIME_BRNO}{' '}
              {renderBoolean(
                questions.every((q) => {
                  const endDate = `${q.endDate?.getHours()}:${q.endDate?.getMinutes().toString().padStart(2, '0')}`;
                  return tournamentId === 'trebic'
                    ? endDate === EXPECTED_END_TIME_TREBIC
                    : endDate === EXPECTED_END_TIME_BRNO;
                }),
              )}
            </Typography>
            <Typography>
              Všechny otázky trvají 1 hodinu{' '}
              {renderBoolean(
                questions.every(
                  (q) => q.startDate && q.endDate && q.endDate.getTime() - q.startDate.getTime() === 1000 * 60 * 60,
                ),
              )}
            </Typography>
            <Typography>
              Otázky mají mezi sebou rozestup přesně 24h{' '}
              {renderBoolean(
                questions.every((_, index) => {
                  if (index === 0) {
                    return true;
                  }
                  const prevQuestion = questions[index - 1];
                  const currentQuestion = questions[index];
                  if (
                    !currentQuestion?.startDate ||
                    !currentQuestion?.endDate ||
                    !prevQuestion?.startDate ||
                    !prevQuestion?.endDate
                  ) {
                    return false;
                  }
                  return (
                    currentQuestion.startDate &&
                    prevQuestion.endDate &&
                    currentQuestion.startDate.getTime() - prevQuestion.startDate.getTime() === 1000 * 60 * 60 * 24 &&
                    currentQuestion.endDate.getTime() - prevQuestion.endDate.getTime() === 1000 * 60 * 60 * 24
                  );
                }),
              )}
            </Typography>
          </Stack>
        )}
        {questions.map((question) => (
          <Stack
            key={question.id}
            direction={'row'}
            justifyContent={'space-between'}
            sx={{ border: 0.3, borderColor: 'rgba(255,255,255,0.3)', p: 2, m: 2, textAlign: 'initial' }}
            gap={1}
          >
            <Stack direction={'column'} justifyContent={'start'} alignItems={'start'} gap={1}>
              <Typography>
                <SecondaryText>Den</SecondaryText>: {question.roundOrder ?? '-'}
              </Typography>
              <Typography>
                <SecondaryText>Začátek</SecondaryText>: {question.startDate ? formatDateTime(question.startDate) : '-'}
              </Typography>
              <Typography>
                <SecondaryText>Konec</SecondaryText>: {question.endDate ? formatDateTime(question.endDate) : '-'}
              </Typography>
              <Typography>ID: {question.id}</Typography>
              <Typography>Název: {question.title}</Typography>
              <Typography>Popis otázky: {question.questionDescription}</Typography>
              <Typography>Popis odpovědi: {question.answerDescription}</Typography>
            </Stack>
            <Stack>
              {[question.questionImageUrl, ...question.answerImagesUrl].map((image, index) => {
                return (
                  <Box
                    key={image}
                    sx={{
                      minWidth: 200,
                      minHeight: 200,
                      position: 'relative',
                      flex: { xs: 'none' },
                      border: 1,
                      m: 0.2,
                      borderColor: index === 0 ? theme.palette.secondary.main : 'rgb(255,255,255,0.3)',
                    }}
                  >
                    <Image
                      src={image}
                      alt={image}
                      fill
                      {...imagePlaceholderProps}
                      style={{
                        objectFit: 'contain',
                      }}
                    />
                  </Box>
                );
              })}
            </Stack>
            <Stack>
              <MapWithAnswers
                width={300}
                height={300}
                locations={[{ type: 'solution', location: question.location }]}
                zoom={question.mapZoom}
                centerPoint={question.centerPoint}
                showLegendUserAnswer={false}
              />
            </Stack>
          </Stack>
        ))}
      </Box>
    </>
  );
};

export default AdminQuestionsPages;

export const getStaticProps = async () => {
  return {
    props: {},
  };
};
