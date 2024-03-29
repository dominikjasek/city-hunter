import { adminProcedure, protectedProcedure, publicProcedure, router } from '~/server/trpc';
import { z } from 'zod';
import { db } from '~/db/drizzle';
import { answers, cities, questions } from '~/db/schema';
import { and, asc, desc, eq } from 'drizzle-orm';
import { TRPCError } from '@trpc/server';
import { evaluateResultsFromLocations } from '~/utils/score/evaluate-score';
import { getRoundQuestion } from '~/server/routers/question/getRoundQuestion';

export const questionRouter = router({
  getRoundQuestion: getRoundQuestion,

  answerQuestion: protectedProcedure
    .input(
      z.object({
        questionId: z.number(),
        answer: z.object({
          lat: z.number(),
          lng: z.number(),
        }),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const question = (
        await db
          .select({
            correctLocation: questions.location,
            roundOrder: questions.roundOrder,
            startDate: questions.startDate,
            endDate: questions.endDate,
          })
          .from(questions)
          .where(eq(questions.id, input.questionId))
          .limit(1)
      )[0];
      if (!question) {
        throw new TRPCError({ code: 'NOT_FOUND', message: 'Question not found' });
      }
      if (!question.startDate || !question.endDate) {
        throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR' });
      }

      const answer = (
        await db
          .select({
            id: answers.id,
          })
          .from(answers)
          .where(and(eq(answers.questionId, input.questionId), eq(answers.userId, ctx.auth.userId)))
          .limit(1)
      )[0];
      if (answer) {
        throw new TRPCError({ code: 'BAD_REQUEST', message: 'Already answered' });
      }

      const now = new Date();
      if (now < question.startDate) {
        throw new TRPCError({ code: 'BAD_REQUEST', message: 'Question not started yet' });
      }

      if (now > question.endDate) {
        throw new TRPCError({ code: 'BAD_REQUEST', message: 'Question already finished' });
      }

      const durationInSeconds = (now.getTime() - question.startDate.getTime()) / 1000;
      const { score } = evaluateResultsFromLocations(input.answer, question.correctLocation, durationInSeconds);

      await db.insert(answers).values({
        questionId: input.questionId,
        userId: ctx.auth.userId,
        location: input.answer,
        score,
        answeredAt: now,
      });

      return {
        success: true,
      };
    }),

  getAdminQuestions: adminProcedure
    .input(z.object({ tournamentId: z.string().optional(), cityId: z.number().optional() }))
    .query(async ({ input }) => {
      const preparedQuery = db
        .select({
          id: questions.id,
          title: questions.title,
          roundOrder: questions.roundOrder,
          startDate: questions.startDate,
          endDate: questions.endDate,
          questionImageUrl: questions.questionImageUrl,
          questionDescription: questions.questionDescription,
          answerDescription: questions.answerDescription,
          answerImagesUrl: questions.answerImagesUrl,
          location: questions.location,
          cityId: cities.id,
          cityName: cities.name,
          cityPreviewImageUrl: cities.previewImageUrl,
          mapZoom: cities.mapZoom,
          centerPoint: cities.centerPoint,
        })
        .from(questions)
        .innerJoin(cities, eq(questions.cityId, cities.id))
        .orderBy(asc(questions.roundOrder), desc(questions.id));

      if (input.tournamentId) {
        preparedQuery.where(eq(questions.tournamentId, input.tournamentId));
      }
      if (input.cityId) {
        preparedQuery.where(eq(questions.cityId, input.cityId));
      }

      const result = await preparedQuery;
      return result.map((question) => ({ ...question, answerImagesUrl: question.answerImagesUrl.split(',') }));
    }),

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

    return demoQuestions[Math.floor(Math.random() * demoQuestions.length)];
  }),

  jirkaDominikQuestion: publicProcedure.query(async () => {
    return {
      ahoj: 123,
    };
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
      const { score, distance } = evaluateResultsFromLocations(
        input.answer,
        question.location,
        input.durationInSeconds,
      );

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
        authorId: ctx.user.id,
      });

      return { success: true };
    }),
});
