import { adminProcedure, router } from '~/server/trpc';
import { z } from 'zod';
import { db } from '~/db/drizzle';
import { questions } from '~/db/schema';

export const questionRouter = router({
  create: adminProcedure
    .input(
      z.object({
        title: z.string(),
        questionDescription: z.string(),
        answerDescription: z.string(),
        questionImageUrl: z.string(),
        answerImageUrl: z.string(),
        cityId: z.number(),
        location: z.object({
          lat: z.number(),
          lng: z.number(),
        }),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      await db.insert(questions).values({
        title: input.title,
        questionDescription: input.questionDescription,
        answerDescription: input.answerDescription,
        questionImageUrl: input.questionImageUrl,
        answerImageUrl: input.answerImageUrl,
        cityId: input.cityId,
        location: input.location,
        demo: false,
        authorId: ctx.user.userId,
      });

      return { success: true };
    }),
});
