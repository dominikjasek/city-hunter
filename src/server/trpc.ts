import { initTRPC, TRPCError } from '@trpc/server';
import { transformer } from '~/utils/transformer';
import { Context } from './context';
import { clerkClient } from '@clerk/nextjs/server';

const t = initTRPC.context<Context>().create({
  transformer,

  errorFormatter({ shape }) {
    return shape;
  },
});

export const router = t.router;

const protectedMiddleware = t.middleware(async ({ next, ctx }) => {
  if (!ctx.auth) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'auth is missing',
      cause: 'auth is missing',
    });
  }
  if (!ctx.auth?.userId) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'userId is missing',
      cause: 'userId is missing',
    });
  }
  const user = await clerkClient.users.getUser(ctx.auth.userId);

  return next({
    ctx: {
      auth: ctx.auth,
      user,
    },
  });
});

const adminMiddleware = t.middleware(async ({ next, ctx }) => {
  if (!ctx.auth?.userId) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'userId is missing',
      cause: 'userId is missing',
    });
  }

  const user = await clerkClient.users.getUser(ctx.auth.userId);

  if (user.publicMetadata.role !== 'admin') {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'user is not admin',
      cause: 'user is not admin',
    });
  }

  return next({
    ctx,
  });
});

export const publicProcedure = t.procedure;
export const protectedProcedure = t.procedure.use(protectedMiddleware);
export const adminProcedure = t.procedure.use(protectedMiddleware).use(adminMiddleware);
