import { trpc } from '~/utils/trpc';
import { NextPageWithLayout } from './_app';
import { Button, Typography } from '@mui/material';
import React from 'react';
import { Loader } from '~/components/common/Loader/Loader';
import { MessageBox } from '~/components/common/MessageBox/MessageBox';

const IndexPage: NextPageWithLayout = () => {
  const postsQuery = trpc.post.list.useQuery(
    {
      limit: 5,
    },
    {
      trpc: {
        ssr: false,
      },
    },
  );

  if (postsQuery.isLoading) {
    return <Loader />;
  }

  if (postsQuery.error) {
    return (
      <MessageBox
        message={`Could not fetch posts: ${postsQuery.error.message}`}
        type={'error'}
      />
    );
  }

  return (
    <>
      <Typography variant={'h4'}>City Hunter!</Typography>
      <h2>Latest Posts</h2>
      <Button variant={'contained'} color={'secondary'}>
        <Typography fontWeight="bold">nice hochu</Typography>
      </Button>
      <br />
      {postsQuery.data?.items.length ?? 'nic'} items fetched
    </>
  );
};

export default IndexPage;

/**
 * If you want to statically render this page
 * - Export `appRouter` & `createContext` from [trpc].ts
 * - Make the `opts` object optional on `createContext()`
 *
 * @link https://trpc.io/docs/ssg
 */
// export const getStaticProps = async (context: GetStaticPropsContext) => {
// const ssg = createProxySSGHelpers({
//   router: appRouter,
//   ctx: { auth: null },
//   transformer: superjson, // optional - adds superjson serializatio
// });
//
// await ssg.post.list.prefetch({ limit: 5 });
//
// return {
//   props: {
//     trpcState: ssg.dehydrate(),
//   },
//   // revalidate: 100,
// };
// };
