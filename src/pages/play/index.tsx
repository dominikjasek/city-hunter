import { GetStaticPropsContext, NextPage } from 'next';
import { useRouter } from 'next/router';
import { createProxySSGHelpers } from '@trpc/react-query/ssg';
import { appRouter } from '~/server/routers/_app';
import superjson from 'superjson';
import { trpc } from '~/utils/trpc';
import { FC } from 'react';
import { City } from '~/db/schema';
import Image from 'next/image';
import { Loader } from '~/components/common/Loader/Loader';
import { Box, Card, Stack } from '@mui/material';

const CityContainer: FC<{ city: City }> = (props) => {
  return (
    <Card variant="outlined" sx={{ height: { xs: 120, sm: 200, md: 280 } }}>
      <Stack
        direction={'row'}
        width={'100%'}
        height={'100%'}
        justifyContent={'space-between'}
      >
        <Box>{props.city.name}</Box>
        <Image
          src={props.city.previewImageUrl}
          alt={props.city.name}
          width={1200}
          height={600}
          style={{
            height: '100%',
            width: 'auto',
          }}
        />
      </Stack>
    </Card>
  );
};

export const PlayPage: NextPage = () => {
  const { query } = useRouter();
  const { tournamentId } = query;
  console.log('tournamentId', tournamentId);
  const { data: cities, isLoading } = trpc.city.getAll.useQuery();

  if (isLoading) {
    return <Loader title={'Načítání...'} />;
  }

  return (
    <div>
      {cities?.cities.map((city) => (
        <CityContainer key={city.id} city={city} />
      ))}
    </div>
  );
};

export default PlayPage;

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const ssg = createProxySSGHelpers({
    router: appRouter,
    ctx: { auth: null },
    transformer: superjson,
  });

  await ssg.city.getAll.prefetch();

  return {
    props: {
      trpcState: ssg.dehydrate(),
    },
  };
};
