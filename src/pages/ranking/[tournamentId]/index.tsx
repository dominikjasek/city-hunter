import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { Box, MenuItem, Select, Stack, Typography } from '@mui/material';
import { trpc } from '~/utils/trpc';
import { useRouter } from 'next/router';
import { db } from '~/db/drizzle';
import { tournaments } from '~/db/schema';
import { Loader } from '~/components/common/Loader/Loader';
import { MessageBox } from '~/components/common/MessageBox/MessageBox';
import { TournamentRoundLinks } from '~/components/ranking/TournamentRoundLinks';
import { useState } from 'react';
import { TableMedals } from '~/components/ranking/TableTournamentMedails';
import { TableTournamentPoints } from '~/components/ranking/TableTournamentPoints';
import { ssgHelpers } from '~/server/ssgHelpers';

export const TournamentRankingPage: NextPage = () => {
  const { query } = useRouter();
  const tournamentId = query.tournamentId!.toString();

  const [viewMode, setViewMode] = useState<'points' | 'medals'>('points');

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
      <Stack direction={'column'} justifyContent={'space-between'} gap={2}>
        <Stack sx={{ mr: 8 }} direction={'row'} justifyContent={'center'} alignItems={'center'} gap={2}>
          <Typography>Hodnocení podle</Typography>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={viewMode}
            sx={{ width: 120 }}
            onChange={(e) => setViewMode(e.target.value as typeof viewMode)}
          >
            <MenuItem value={'points'}>Skóre</MenuItem>
            <MenuItem value={'medals'}>Medaile</MenuItem>
          </Select>
        </Stack>
        {viewMode === 'points' ? <TableTournamentPoints ranking={ranking} /> : <TableMedals ranking={ranking} />}
      </Stack>
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

export const getStaticProps: GetStaticProps<{ tournamentId: string }> = async (context) => {
  const tournamentId = context.params?.tournamentId;

  if (typeof tournamentId !== 'string') {
    throw new Error('No tournamentId or it is not a string');
  }

  await ssgHelpers.ranking.getTournamentRanking.prefetch({ tournamentId });

  return {
    props: {
      trpcState: ssgHelpers.dehydrate(),
      tournamentId,
    },
  };
};
