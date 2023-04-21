/**
 * This file contains the root router of your tRPC-backend
 */
import { publicProcedure, router } from '../trpc';
import { postRouter } from './post';
import { authRouter } from '~/server/routers/auth/authRouter';
import { cityRouter } from '~/server/routers/city';

export const appRouter = router({
  healthcheck: publicProcedure.query(() => 'yay!'),
  auth: authRouter,
  post: postRouter,
  city: cityRouter,
});

export type AppRouter = typeof appRouter;
