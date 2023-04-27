import { adminProcedure, publicProcedure, router } from '~/server/trpc';
import { z } from 'zod';
import { db } from '~/db/drizzle';
import { cities, questions } from '~/db/schema';
import { eq } from 'drizzle-orm/expressions';

export const questionRouter = router({
  getRandomDemoQuestion: publicProcedure.query(async () => {
    const demoQuestions = await db
      .select({
        id: questions.id,
        title: questions.title,
        questionDescription: questions.questionDescription,
        questionImageUrl: questions.questionImageUrl,
        city: {
          id: cities.id,
          name: cities.name,
          centerPoint: cities.centerPoint,
          mapZoom: cities.mapZoom,
        },
      })
      .from(questions)
      .where(eq(questions.demo, true))
      .innerJoin(cities, eq(questions.cityId, cities.id));

    console.log('demoQuestions', demoQuestions);
    return demoQuestions[Math.floor(Math.random() * demoQuestions.length)];
  }),
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
