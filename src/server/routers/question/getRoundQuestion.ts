import { protectedProcedure } from '~/server/trpc';
import { z } from 'zod';
import { GetQuestionResponse, QuestionEntity } from '~/server/routers/question/types';
import { db } from '~/db/drizzle';
import { answers, cities, questions } from '~/db/schema';
import { and, eq } from 'drizzle-orm/expressions';
import { TRPCError } from '@trpc/server';
import { RedisClient } from '~/server/redis';

const OPTIMIZATION_OFFSET_FROM_START_NOT_TO_CHECK_ANSWER = 5000; // 5 seconds

const REDIS_KEY_PREFIX = 'question';
const getRedisKey = (tournamentId: string, roundOrder: number) => `${REDIS_KEY_PREFIX}:${tournamentId}:${roundOrder}`;

const getQuestionWithCache = async (tournamentId: string, roundOrder: number) => {
  const redisClient = new RedisClient();
  const redisKey = getRedisKey(tournamentId, roundOrder);

  const redisQuestion = await redisClient.getObject<QuestionEntity>(redisKey);
  if (redisQuestion) {
    if (!redisQuestion.startDate || !redisQuestion.endDate || !redisQuestion.roundOrder) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Some of required attributes are nullable. These attributes are: startDate, endDate and roundOrder',
      });
    }
    return {
      ...redisQuestion,
      startDate: redisQuestion.startDate,
      endDate: redisQuestion.endDate,
      roundOrder: redisQuestion.roundOrder,
    };
  }

  const question: QuestionEntity | undefined = (
    await db
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
        roundOrder: questions.roundOrder,
        startDate: questions.startDate,
        endDate: questions.endDate,
      })
      .from(questions)
      .where(and(eq(questions.roundOrder, roundOrder), eq(questions.tournamentId, tournamentId)))
      .innerJoin(cities, eq(questions.cityId, cities.id))
      .limit(1)
  )[0];
  if (!question) {
    throw new TRPCError({ code: 'NOT_FOUND' });
  }
  if (!question.startDate || !question.endDate || !question.roundOrder) {
    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: 'Some of required attributes are nullable. These attributes are: startDate, endDate and roundOrder',
    });
  }

  await redisClient.setObject(redisKey, question);

  return {
    ...question,
    // override startDate and endDate because typescript doesnt know that we checked they are not null
    startDate: question.startDate,
    endDate: question.endDate,
    roundOrder: question.roundOrder,
  };
};

export const getRoundQuestion = protectedProcedure
  .input(z.object({ tournamentId: z.string(), roundOrder: z.number() }))
  .query<GetQuestionResponse>(async ({ input, ctx }) => {
    const question = await getQuestionWithCache(input.tournamentId, input.roundOrder);

    const now = new Date();

    if (now.getTime() < question.startDate.getTime()) {
      return {
        status: 'not_started',
        question: {
          startDate: question.startDate!,
        },
      };
    }

    // Optimization: if round started in less then 5 seconds, no one has for sure answered it yet
    if (now.getTime() - OPTIMIZATION_OFFSET_FROM_START_NOT_TO_CHECK_ANSWER < question.startDate.getTime()) {
      return {
        status: 'active',
        question: {
          ...question,
          // override startDate and endDate because typescript doesnt know that we checked they are not null
          roundOrder: question.roundOrder,
          startDate: question.startDate,
          endDate: question.endDate,
        },
      };
    }

    const answer = (
      await db
        .select({
          id: answers.id,
        })
        .from(answers)
        .where(and(eq(answers.questionId, question.id), eq(answers.userId, ctx.auth.userId)))
        .limit(1)
    )[0];

    if (answer) {
      return {
        status: 'answered',
        question: null,
      };
    }

    if (now > question.endDate) {
      return {
        status: 'expired_not_answered',
        question: null,
      };
    }

    return {
      status: 'active',
      question: {
        ...question,
        // override startDate and endDate because typescript doesnt know that we checked they are not null
        roundOrder: question.roundOrder,
        startDate: question.startDate,
        endDate: question.endDate,
      },
    };
  });
