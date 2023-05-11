import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import { NextRequest } from 'next/server';
import { appRouter } from '~/server/routers/_app';
import { createContext } from '~/server/context';
import * as Sentry from '@sentry/nextjs';

export const config = {
  runtime: 'edge',
  regions: ['fra1'],
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
        Sentry.captureException(error);
        console.error('❌ Something went wrong', error);
      }
    },
    createContext: createContext as any,
  });
}
