/**
 * This is your entry point to setup the root configuration for tRPC on the server.
 * - `initTRPC` should only be used once per app.
 * - We export only the functionality that we use so we can enforce which base procedures should be used
 *
 * Learn how to create protected base procedures and other things below:
 * @see https://trpc.io/docs/v10/router
 * @see https://trpc.io/docs/v10/procedures
 */

import { initTRPC, TRPCError } from '@trpc/server';
import { transformer } from '~/utils/transformer';
import { Context } from './context';

const t = initTRPC.context<Context>().create({
  /**
   * @see https://trpc.io/docs/v10/data-transformers
   */
  transformer,
  /**
   * @see https://trpc.io/docs/v10/error-formatting
   */
  errorFormatter({ shape }) {
    return shape;
  },
});

/**
 * Create a router
 * @see https://trpc.io/docs/v10/router
 */
export const router = t.router;

/**
 * @see https://trpc.io/docs/v10/middlewares
 */
const isAuthed = t.middleware(({ next, ctx }) => {
  // if (!ctx.auth?.user) {
  //   throw new TRPCError({ code: 'UNAUTHORIZED' });
  // }

  if (!ctx.auth?.userId) {
    console.log(process.env.NODE_ENV);
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'Your JWT is not valid',
    });
  }

  return next({
    ctx: {
      auth: ctx.auth,
      isAuthed: true,
    },
  });
});

export const publicProcedure = t.procedure;
export const protectedProcedure = t.procedure.use(isAuthed);

/**
 * @see https://trpc.io/docs/v10/merging-routers
 */
export const mergeRouters = t.mergeRouters;
