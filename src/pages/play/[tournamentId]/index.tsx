import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import { createProxySSGHelpers } from '@trpc/react-query/ssg';
import { appRouter } from '~/server/routers/_app';
import superjson from 'superjson';
import { trpc } from '~/utils/trpc';
import { Loader } from '~/components/common/Loader/Loader';
import { Badge, Box, Button, Card, Stack, Tooltip, Typography } from '@mui/material';
import { db } from '~/db/drizzle';
import { tournaments } from '~/db/schema';
import { formatDate } from '~/utils/formatter/dateFormatter';
import Link from 'next/link';
import { FC } from 'react';
import Image from 'next/image';

const ActionButton: FC<{
  tournamentId: string;
  questionId: number;
  startDate: Date | null;
  endDate: Date | null;
}> = (props) => {
  if (!props.startDate || !props.endDate) {
    throw new Error(`Question with id=${props.questionId} has no start or end date`);
  }

  const BUTTON_WIDTH = 120;

  const now = new Date();
  if (now > props.endDate) {
    return (
      <Link href={`/ranking/${props.tournamentId}/${props.questionId}`}>
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
      <Link href={`/play/${props.tournamentId}/${props.questionId}`}>
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

  if (typeof tournamentId !== 'string') {
    throw new Error(`tournamentId is not a string`);
  }

  const { data: tournament, isLoading: isTournamentDetailsLoading } = trpc.tournament.getTournamentDetails.useQuery(
    {
      tournamentId: tournamentId,
    },
    {
      enabled: Boolean(tournamentId),
    },
  );
  const { data: questions, isLoading: isQuestionsLoading } = trpc.tournament.getQuestionsForId.useQuery(
    {
      tournamentId: tournamentId,
    },
    {
      enabled: Boolean(tournamentId),
    },
  );

  if (isQuestionsLoading || isTournamentDetailsLoading) {
    return <Loader title="Načítám..." />;
  }

  if (!tournament) {
    return <Box>Turnaj s id {tournamentId} nebyl nalezen</Box>;
  }

  if (!questions || questions.length === 0) {
    return <Box>K tomuto turnaji nebyly nalezeny žádná data</Box>;
  }

  return (
    <div>
      <h1>{tournament.name}</h1>
      <Stack direction={'row'} justifyContent={'center'} flexWrap={'wrap'} alignItems={'center'} gap={2}>
        {questions.map((question, index) => (
          <Badge
            key={question.id}
            badgeContent={index + 1}
            color="primary"
            anchorOrigin={{ horizontal: 'left', vertical: 'top' }}
            sx={{ transform: 'translate(10px, 10px)' }}
          >
            <Card
              variant="outlined"
              sx={{
                border: 1,
                borderRadius: 1,
                m: 0.5,
                borderColor: 'rgba(255,255,255,0.2)',
                boxShadow: 2,
                backgroundColor: 'transparent',
                position: 'relative',
                top: -8,
                left: -8,
              }}
            >
              <Stack
                direction={'column'}
                justifyContent={'center'}
                alignItems={'center'}
                gap={1}
                sx={{ position: 'relative', p: 2 }}
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
                {question.title ? <Typography sx={{ flex: 2 }}>{question.title}</Typography> : <br />}
                <Typography sx={{ flex: 2 }}>{question.startDate && formatDate(question.startDate)}</Typography>
                <ActionButton
                  endDate={question.endDate}
                  tournamentId={tournamentId}
                  startDate={question.startDate}
                  questionId={question.id}
                ></ActionButton>
              </Stack>
            </Card>
          </Badge>
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

  const ssg = createProxySSGHelpers({
    router: appRouter,
    ctx: { auth: null },
    transformer: superjson,
  });

  if (!context.params) {
    throw new Error('No params');
  }

  await Promise.all([
    ssg.tournament.getQuestionsForId.prefetch({ tournamentId: tournamentId }),
    ssg.tournament.getTournamentDetails.prefetch({ tournamentId: tournamentId }),
  ]);

  return {
    props: {
      trpcState: ssg.dehydrate(),
      tournamentId,
    },
    revalidate: 60,
  };
};
