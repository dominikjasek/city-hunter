import { adminProcedure, publicProcedure, router } from '~/server/trpc';
import { z } from 'zod';
import { db } from '~/db/drizzle';
import { cities, questions } from '~/db/schema';
import { eq } from 'drizzle-orm/expressions';
import { TRPCError } from '@trpc/server';
import { evaluateResultsFromLocations } from '~/utils/score/evaluate-score';

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
  answerDemoQuestion: publicProcedure
    .input(
      z.object({
        questionId: z.number(),
        answer: z.object({
          lat: z.number(),
          lng: z.number(),
        }),
        durationInSeconds: z.number(),
      }),
    )
    .mutation(async ({ input }) => {
      const result = await db
        .select({
          location: questions.location,
          answerImagesUrl: questions.answerImagesUrl,
          answerDescription: questions.answerDescription,
        })
        .from(questions)
        .where(eq(questions.id, input.questionId));
      if (!result[0]) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Question not found',
        });
      }
      const question = result[0];
      const { score, distance } = evaluateResultsFromLocations(input.answer, question.location, input.durationInSeconds);

      return {
        score,
        distance,
        answerImagesUrl: question.answerImagesUrl.split(','),
        answerDescription: question.answerDescription,
        answerLocation: input.answer,
        correctLocation: question.location,
      };
    }),
  create: adminProcedure
    .input(
      z.object({
        title: z.string(),
        questionDescription: z.string(),
        answerDescription: z.string(),
        questionImageUrl: z.string(),
        answerImagesUrl: z.array(z.string()),
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
        answerImagesUrl: input.answerImagesUrl.join(','),
        cityId: input.cityId,
        location: input.location,
        demo: false,
        authorId: ctx.user.userId,
      });

      return { success: true };
    }),
});
