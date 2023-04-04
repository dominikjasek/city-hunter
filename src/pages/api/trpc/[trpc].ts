/**
 * This is the API-handler of your app that contains all your API routes.
 * On a bigger app, you will probably want to split this file up into multiple files.
 */
import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import { NextRequest } from 'next/server';
import { appRouter } from '~/server/routers/_app';

// export only the type definition of the API
// None of the actual implementation is exposed to the client
export type AppRouter = typeof appRouter;

// We're using the edge-runtime
export const config = {
  runtime: 'edge',
};

// export API handler
export default async function handler(req: NextRequest) {
  return fetchRequestHandler({
    endpoint: '/api/trpc',
    router: appRouter,
    req,
    onError({ error }) {
      if (error.code === 'INTERNAL_SERVER_ERROR') {
        // send to bug reporting
        console.error('Something went wrong', error);
      }
    },
    createContext: () => ({}),
  });
}
