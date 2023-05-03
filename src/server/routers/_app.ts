/**
 * This file contains the root router of your tRPC-backend
 */
import { publicProcedure, router } from '../trpc';
import { authRouter } from '~/server/routers/authRouter';
import { cityRouter } from '~/server/routers/cityRouter';
import { questionRouter } from '~/server/routers/question/questionRouter';
import { tournamentRouter } from '~/server/routers/tournamentRouter';

export const appRouter = router({
  healthcheck: publicProcedure.query(() => 'yay!'),
  auth: authRouter,
  city: cityRouter,
  tournament: tournamentRouter,
  question: questionRouter,
});

export type AppRouter = typeof appRouter;
