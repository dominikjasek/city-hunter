import { z } from 'zod';
import { db } from '~/db/drizzle';
import { CreateUser, users } from '~/db/schema';
import { protectedProcedure, publicProcedure, router } from '~/server/trpc';
import { eq } from 'drizzle-orm/expressions';

export const authRouter = router({
  getNickName: protectedProcedure.query(async ({ ctx }) => {
    const result = await db
      .select({ nickname: users.nickName })
      .from(users)
      .where(eq(users.id, ctx.auth.userId))
      .limit(1);
    if (!result[0]) throw new Error('User not found');

    return result[0].nickname;
  }),

  updateNickName: protectedProcedure.input(z.object({ nickName: z.string() })).mutation(async ({ input, ctx }) => {
    await db.update(users).set({ nickName: input.nickName }).where(eq(users.id, ctx.auth.userId));

    return {
      success: true,
    };
  }),

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
