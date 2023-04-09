/**
 *
 * This is an example router, you can delete this file and then update `../pages/api/trpc/[trpc].tsx`
 */
import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { db } from '~/db/drizzle';
import { CreateUser, users } from '~/db/schema';
import { migrate } from 'drizzle-orm/mysql2/migrator';
import { log } from 'next/dist/server/typescript/utils';
import { protectedProcedure, publicProcedure, router } from '~/server/trpc';

/**
 * Default selector for Post.
 * It's important to always explicitly say which fields you want to return in order to not leak extra information
 * @see https://github.com/prisma/prisma/issues/9353
 */

export const authRouter = router({
  createUser: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        nickName: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      const newUser: CreateUser = {
        id: input.id,
        nickName: input.nickName,
      };

      await db.insert(users).values(newUser);
      return {
        success: true,
      };
    }),
});
