import { trpc } from '../utils/trpc';
import { NextPageWithLayout } from './_app';
import { inferProcedureInput } from '@trpc/server';
import Link from 'next/link';
import { Fragment } from 'react';
import type { AppRouter } from '~/server/routers/_app';
import { createProxySSGHelpers } from '@trpc/react-query/ssg';
import { appRouter } from '~/server/routers/_app';
import { createContext } from '~/server/context';
import { GetStaticPropsContext } from 'next';
import superjson from 'superjson';

const IndexPage: NextPageWithLayout = (props) => {
  console.log('props', props);
  const utils = trpc.useContext();
  const postsQuery = trpc.post.list.useQuery({
    limit: 5,
  });

  // const addPost = trpc.post.add.useMutation({
  //   async onSuccess() {
  //     // refetches posts after a post is added
  //     await utils.post.list.invalidate();
  //   },
  // });

  // prefetch all posts for instant navigation
  // useEffect(() => {
  //   const allPosts = postsQuery.data?.pages.flatMap((page) => page.items) ?? [];
  //   for (const { id } of allPosts) {
  //     void utils.post.byId.prefetch({ id });
  //   }
  // }, [postsQuery.data, utils]);

  return (
    <>
      <h1>Welcome to your tRPC starter!</h1>
      <p>
        If you get stuck, check <a href="https://trpc.io">the docs</a>, write a
        message in our <a href="https://trpc.io/discord">Discord-channel</a>, or
        write a message in{' '}
        <a href="https://github.com/trpc/trpc/discussions">
          GitHub Discussions
        </a>
        .
      </p>

      <h2>
        Latest Posts
        {postsQuery.status === 'loading' && '(loading)'}
      </h2>

      {/*<button*/}
      {/*  onClick={() => postsQuery.fetchPreviousPage()}*/}
      {/*  disabled={*/}
      {/*    !postsQuery.hasPreviousPage || postsQuery.isFetchingPreviousPage*/}
      {/*  }*/}
      {/*>*/}
      {/*  {postsQuery.isFetchingPreviousPage*/}
      {/*    ? 'Loading more...'*/}
      {/*    : postsQuery.hasPreviousPage*/}
      {/*    ? 'Load More'*/}
      {/*    : 'Nothing more to load'}*/}
      {/*</button>*/}

      {postsQuery.data?.items.map((item, index) => (
        <Fragment key={item.id || index}>
          <article key={item.id}>
            <h3>
              {item.id} - {item.title}
            </h3>
            <Link href={`/post/${item.id}`}>View more</Link>
          </article>
        </Fragment>
      ))}

      <hr />

      <h3>Add a Post</h3>

      {/*<form*/}
      {/*  onSubmit={async (e) => {*/}
      {/*    /***/}
      {/*     * In a real app you probably don't want to use this manually*/}
      {/*     * Checkout React Hook Form - it works great with tRPC*/}
      {/*     * @see https://react-hook-form.com/*/}
      {/*     * @see https://kitchen-sink.trpc.io/react-hook-form*/}
      {/*    e.preventDefault();*/}
      {/*    const $form = e.currentTarget;*/}
      {/*    const values = Object.fromEntries(new FormData($form));*/}
      {/*    type Input = inferProcedureInput<AppRouter['post']['add']>;*/}
      {/*    const input: Input = {*/}
      {/*      title: values.title as string,*/}
      {/*      text: values.text as string,*/}
      {/*    };*/}
      {/*    try {*/}
      {/*      // await addPost.mutateAsync(input);*/}

      {/*      $form.reset();*/}
      {/*    } catch (cause) {*/}
      {/*      console.error({ cause }, 'Failed to add post');*/}
      {/*    }*/}
      {/*  }}*/}
      {/*>*/}
      {/*  <label htmlFor="title">Title:</label>*/}
      {/*  <br />*/}
      {/*  <input*/}
      {/*    id="title"*/}
      {/*    name="title"*/}
      {/*    type="text"*/}
      {/*    // disabled={addPost.isLoading}*/}
      {/*  />*/}

      {/*  <br />*/}
      {/*  <label htmlFor="text">Text:</label>*/}
      {/*  <br />*/}
      {/*  <textarea id="text" name="text" disabled={addPost.isLoading} />*/}
      {/*  <br />*/}
      {/*  <input type="submit" disabled={addPost.isLoading} />*/}
      {/*  {addPost.error && (*/}
      {/*    <p style={{ color: 'red' }}>{addPost.error.message}</p>*/}
      {/*  )}*/}
      {/*</form>*/}
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
export const getStaticProps = async (context: GetStaticPropsContext) => {
  const ssg = createProxySSGHelpers({
    router: appRouter,
    ctx: { auth: null },
    transformer: superjson, // optional - adds superjson serializatio
  });

  await ssg.post.list.prefetch({ limit: 5 });

  return {
    props: {
      trpcState: ssg.dehydrate(),
    },
    revalidate: 1,
  };
};
