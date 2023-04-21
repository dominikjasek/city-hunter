import { protectedProcedure, router } from '~/server/trpc';
import { z } from 'zod';
import { db } from '~/db/drizzle';
import { questions } from '~/db/schema';

export const questionRouter = router({
  create: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        questionDescription: z.string(),
        answerDescription: z.string(),
        imageUrl: z.string(),
        cityId: z.number(),
        location: z.object({
          lat: z.number(),
          lng: z.number(),
        }),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const executedQuery = await db.insert(questions).values({
        title: input.title,
        questionDescription: input.questionDescription,
        answerDescription: input.answerDescription,
        imageUrl: input.imageUrl,
        cityId: input.cityId,
        location: input.location,
        demo: false,
        authorId: ctx.user.userId,
      });

      console.log('executedQuery', executedQuery);

      return { success: true };
    }),
});
