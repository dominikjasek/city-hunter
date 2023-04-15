/**
 *
 * This is an example router, you can delete this file and then update `../pages/api/trpc/[trpc].tsx`
 */
import { z } from 'zod';
import { db } from '~/db/drizzle';
import { CreateUser, User, users } from '~/db/schema';
import { publicProcedure, router } from '~/server/trpc';
import { DrizzleTypeError } from 'drizzle-orm/utils';
import { eq } from 'drizzle-orm/expressions';
import DrizzleConfig from '../../../../drizzle.config';

/**
 * Default selector for Post.
 * It's important to always explicitly say which fields you want to return in order to not leak extra information
 * @see https://github.com/prisma/prisma/issues/9353
 */

export const authRouter = router({
  createUser: publicProcedure
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

      const user = await db.select().from(users).where(eq(users.id, input.id));
      if (user.length > 1) {
        throw new Error('Too many users found');
      }

      if (user.length > 0) {
        return {
          success: true,
        };
      }

      await db.insert(users).values(newUser);

      return {
        success: true,
      };
    }),
});
