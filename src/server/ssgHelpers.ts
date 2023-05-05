import { createServerSideHelpers } from '@trpc/react-query/server';
import { appRouter } from '~/server/routers/_app';
import superjson from 'superjson';

export const ssgHelpers = createServerSideHelpers({
  router: appRouter,
  ctx: { auth: null },
  transformer: superjson, // optional - adds superjson serialization
});
