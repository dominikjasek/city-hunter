import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import { trpc } from '~/utils/trpc';
import { Loader } from '~/components/common/Loader/Loader';
import { Box, Button, Card, Stack, Tooltip, Typography } from '@mui/material';
import { db } from '~/db/drizzle';
import { tournaments } from '~/db/schema';
import { formatDateTime } from '~/utils/formatter/dateFormatter';
import Link from 'next/link';
import { FC } from 'react';
import Image from 'next/image';
import { ssgHelpers } from '~/server/ssgHelpers';
import { imagePlaceholderProps } from '~/utils/image-placeholder/image-placeholder';

const ActionButton: FC<{
  tournamentId: string;
  questionId: number;
  roundOrder: number | null;
  startDate: Date | null;
  endDate: Date | null;
}> = (props) => {
  if (!props.startDate || !props.endDate || props.roundOrder === null) {
    throw new Error(`Question with id=${props.questionId} has no start or end date`);
  }

  const BUTTON_WIDTH = 120;

  const now = new Date();
  if (now > props.endDate) {
    return (
      <Link href={`/ranking/${props.tournamentId}/${props.roundOrder}`} className={'no-style'}>
        <Button variant="contained" color="primary" sx={{ width: BUTTON_WIDTH }}>
          Výsledky
        </Button>
      </Link>
    );
  }

  // Button is enabled if startDate is in next 23 hours
  const isActive = now.getTime() + 1000 * 60 * 60 * 23 > props.startDate.getTime();

  if (isActive) {
    return (
      <Link href={`/play/${props.tournamentId}/${props.roundOrder}`} className={'no-style'}>
        <Button variant="contained" color="secondary" sx={{ width: BUTTON_WIDTH }}>
          Hrát
        </Button>
      </Link>
    );
  }

  return (
    <Tooltip title="Odkaz bude aktivní 23 hodin před začátkem">
      <span>
        <Button variant="contained" color="secondary" sx={{ width: BUTTON_WIDTH }} disabled>
          Hrát
        </Button>
      </span>
    </Tooltip>
  );
};

export const TournamentPage: NextPage = () => {
  const { query } = useRouter();
  const { tournamentId } = query;

  const { data: tournament, isLoading: isTournamentDetailsLoading } = trpc.tournament.getDetailsForId.useQuery(
    {
      tournamentId: tournamentId!.toString(),
    },
    {
      enabled: Boolean(tournamentId),
    },
  );
  const { data: questions, isLoading: isQuestionsLoading } = trpc.tournament.getSafelyQuestionsForId.useQuery(
    {
      tournamentId: tournamentId!.toString(),
    },
    {
      enabled: Boolean(tournamentId),
    },
  );

  if (isQuestionsLoading || isTournamentDetailsLoading) {
    return <Loader title="Načítám..." />;
  }

  if (!tournament) {
    return <Box>Soutěž s id {tournamentId} nebyl nalezen</Box>;
  }

  if (!questions || questions.length === 0) {
    return <Box>K této soutěži nebyly nalezeny žádná data</Box>;
  }

  return (
    <div>
      <Typography variant={'h5'}>{tournament.name}</Typography>
      <Stack direction={'row'} justifyContent={'center'} flexWrap={'wrap'} gap={2}>
        {questions.map((question) => (
          <Card
            key={question.id}
            variant="outlined"
            sx={{
              border: 1,
              borderRadius: 1,
              m: 0.5,
              borderColor: 'rgba(255,255,255,0.2)',
              boxShadow: 2,
              backgroundColor: 'transparent',
              width: '100%',
              maxWidth: { xs: '140px', sm: '210ox', md: '250px' },
              display: 'flex',
            }}
          >
            <Stack
              direction={'column'}
              justifyContent={'center'}
              alignItems={'center'}
              gap={1}
              sx={{ position: 'relative', p: 2, width: '100%' }}
            >
              {question.questionImageUrl ? (
                <Box
                  sx={{
                    width: 200,
                    height: 200,
                    position: 'relative',
                  }}
                >
                  <Image
                    src={question.questionImageUrl}
                    alt={'Náhledová fotka'}
                    {...imagePlaceholderProps}
                    fill
                    style={{
                      objectFit: 'contain',
                    }}
                  />
                </Box>
              ) : (
                <Stack
                  sx={{
                    width: 200,
                    height: 200,
                  }}
                  justifyContent={'center'}
                  alignItems={'center'}
                >
                  <Typography fontSize={100} textAlign={'center'} sx={{ opacity: 0.3 }}>
                    ?
                  </Typography>
                </Stack>
              )}
              {question.title ? <Typography>{question.title}</Typography> : <br />}
              <Typography sx={{ flex: 1 }}>{question.startDate && formatDateTime(question.startDate)}</Typography>
              <ActionButton
                endDate={question.endDate}
                tournamentId={tournamentId!.toString()}
                startDate={question.startDate}
                questionId={question.id}
                roundOrder={question.roundOrder}
              ></ActionButton>
            </Stack>
          </Card>
        ))}
      </Stack>
    </div>
  );
};

export default TournamentPage;

export const getStaticPaths: GetStaticPaths = async () => {
  const tournamentItems = await db.select({ id: tournaments.id }).from(tournaments);

  return {
    paths: tournamentItems.map((tournament) => ({ params: { tournamentId: tournament.id } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<{ tournamentId: string }> = async (context) => {
  const tournamentId = context.params?.tournamentId;

  if (typeof tournamentId !== 'string') {
    throw new Error('No tournamentId or it is not a string');
  }

  await Promise.all([
    ssgHelpers.tournament.getSafelyQuestionsForId.prefetch({ tournamentId: tournamentId }),
    ssgHelpers.tournament.getDetailsForId.prefetch({ tournamentId: tournamentId }),
  ]);

  return {
    props: {
      trpcState: ssgHelpers.dehydrate(),
      tournamentId,
    },
    revalidate: 60,
  };
};
