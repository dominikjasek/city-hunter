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

const AdminQuestionsPages: NextPage = () => {
  const router = useRouter();
  const { cityId, tournamentId } = router.query;
  console.log('tournamentId', tournamentId);
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
    <Box>
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
              <SecondaryText>Konec</SecondaryText>: {question.startDate ? formatDateTime(question.startDate) : '-'}
            </Typography>
            <Typography>ID: {question.id}</Typography>
            <Typography>Název: {question.title}</Typography>
            <Typography>Popis otázky: {question.questionDescription}</Typography>
            <Typography>Popis odpovědi: {question.answerDescription}</Typography>
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
                    style={{
                      objectFit: 'contain',
                    }}
                  />
                </Box>
              );
            })}
          </Stack>
          <Stack>
            <Box sx={{ width: 300, height: 300 }}>
              <MapWithAnswers
                locations={[{ type: 'solution', location: question.location }]}
                zoom={question.mapZoom}
                centerPoint={question.centerPoint}
                showLegendUserAnswer={false}
              />
            </Box>
          </Stack>
        </Stack>
      ))}
    </Box>
  );
};

export default AdminQuestionsPages;

export const getStaticProps = async () => {
  return {
    props: {},
  };
};
