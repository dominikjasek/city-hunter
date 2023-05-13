import { z } from 'zod';
import { db } from '~/db/drizzle';
import { CreateUser, users } from '~/db/schema';
import { protectedProcedure, publicProcedure, router } from '~/server/trpc';
import { eq } from 'drizzle-orm/expressions';
import { emitQStashEvent } from '~/server/qstash/qstash';

export const authRouter = router({
  getNickName: protectedProcedure.query(async ({ ctx }) => {
    const result = await db
      .select({ nickname: users.nickName })
      .from(users)
      .where(eq(users.id, ctx.auth.userId))
      .limit(1);

    return result[0]?.nickname ?? null;
  }),

  updateNickName: protectedProcedure.input(z.object({ nickName: z.string() })).mutation(async ({ input, ctx }) => {
    await db.update(users).set({ nickName: input.nickName }).where(eq(users.id, ctx.auth.userId));

    await emitQStashEvent({
      topic: 'update-nickname',
      value: {
        userId: ctx.auth.userId,
        nickName: input.nickName,
      },
    });

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
          createdNewUser: false,
        };
      }

      await db.insert(users).values(newUser);

      return {
        createdNewUser: true,
      };
    }),
});
