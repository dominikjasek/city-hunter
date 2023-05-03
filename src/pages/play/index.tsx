import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { createProxySSGHelpers } from '@trpc/react-query/ssg';
import { appRouter } from '~/server/routers/_app';
import superjson from 'superjson';
import { trpc } from '~/utils/trpc';
import { FC } from 'react';
import Image from 'next/image';
import { Loader } from '~/components/common/Loader/Loader';
import { Card, CardActionArea, Stack, Typography } from '@mui/material';
import { formatDate } from '~/utils/formatter/dateFormatter';

interface CityContainerProps {
  cityName?: string;
  tournamentId: string;
  tournamentName: string;
  previewImageUrl: string | null;
  startDate: Date | null;
  endDate: Date | null;
}

const TournamentContainer: FC<CityContainerProps> = (props) => {
  const router = useRouter();
  return (
    <Card
      onClick={() => router.push(`/play/${props.tournamentId}`)}
      variant="outlined"
      sx={{
        height: { xs: 120, sm: 200, md: 280 },
        mx: { xs: 0, sm: 1, md: 2 },
        my: 2,
        boxShadow: 2,
        backgroundColor: 'transparent',
      }}
    >
      <CardActionArea
        sx={{
          width: '100%',
          height: '100%',
        }}
      >
        <Stack direction={'row'} width={'100%'} height={'100%'} justifyContent={'space-between'}>
          <Stack
            direction={'column'}
            width={'100%'}
            alignItems={'center'}
            justifyContent={'center'}
            sx={{ ml: 1, zIndex: 1, mr: -10 }}
          >
            <Typography variant={'h4'}>{props.cityName}</Typography>
            <Typography variant={'h5'}>{props.tournamentName}</Typography>
            {props.startDate && props.endDate && (
              <Typography variant={'h6'}>{`${formatDate(props.startDate)} - ${formatDate(props.endDate)}`}</Typography>
            )}
          </Stack>
          {props?.previewImageUrl && (
            <Image
              src={props.previewImageUrl}
              alt={props.cityName ?? props.tournamentName}
              width={1200}
              height={600}
              style={{
                height: '100%',
                width: 'auto',
                WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 100%)',
              }}
            />
          )}
        </Stack>
      </CardActionArea>
    </Card>
  );
};

export const PlayPage: NextPage = () => {
  const { data: tournamentsData, isLoading } = trpc.tournament.getAll.useQuery();

  if (isLoading) {
    return <Loader title={'Načítání...'} />;
  }

  return (
    <div>
      <Typography variant={'h5'}>Hrajeme v těchto městech:</Typography>
      {tournamentsData?.tournaments.map((tournament) => (
        <TournamentContainer
          key={tournament.id}
          tournamentId={tournament.id}
          cityName={tournament.city}
          startDate={tournament.startDate}
          endDate={tournament.endDate}
          previewImageUrl={tournament.previewImageUrl}
          tournamentName={tournament.name}
        />
      ))}
    </div>
  );
};

export default PlayPage;

export const getStaticProps = async () => {
  const ssg = createProxySSGHelpers({
    router: appRouter,
    ctx: { auth: null },
    transformer: superjson,
  });

  await ssg.tournament.getAll.prefetch();

  return {
    props: {
      trpcState: ssg.dehydrate(),
    },
  };
};
