import { initTRPC, TRPCError } from '@trpc/server';
import { transformer } from '~/utils/transformer';
import { Context } from './context';
import { verify } from '~/server/jwt';
import { clerkClient } from '@clerk/nextjs/server';
import { PublicMetadata } from '~/utils/clerk/types';

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
  const token = await ctx.auth.getToken({ template: 'JWT' });
  if (!token) {
    throw new TRPCError({ code: 'UNAUTHORIZED', message: 'token is missing' });
  }
  const jwtUser = await verify(token);

  return next({
    ctx: {
      auth: ctx.auth,
      user: jwtUser,
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

  if ((user.publicMetadata as PublicMetadata).role !== 'admin') {
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
