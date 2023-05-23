import { protectedProcedure } from '~/server/trpc';
import { z } from 'zod';
import { GetQuestionResponse, QuestionEntity } from '~/server/routers/question/types';
import { db } from '~/db/drizzle';
import { answers, questions } from '~/db/schema';
import { and, eq } from 'drizzle-orm';
import { TRPCError } from '@trpc/server';
import { RedisClient } from '~/server/redis/redis';

const OPTIMIZATION_OFFSET_FROM_START_NOT_TO_CHECK_ANSWER = 5000; // 5 seconds

const REDIS_KEY_PREFIX = 'question';
const getRedisKey = (tournamentId: string, roundOrder: number) => `${REDIS_KEY_PREFIX}:${tournamentId}:${roundOrder}`;

const getQuestionWithCache = async (tournamentId: string, roundOrder: number) => {
  const redisClient = new RedisClient();
  const redisKey = getRedisKey(tournamentId, roundOrder);

  const redisQuestion = await redisClient.getObject<QuestionEntity>(redisKey);
  if (redisQuestion) {
    return redisQuestion;
  }

  const dbResult = await db.query.questions.findFirst({
    where: and(eq(questions.roundOrder, roundOrder), eq(questions.tournamentId, tournamentId)),
    columns: {
      id: true,
      title: true,
      questionDescription: true,
      questionImageUrl: true,
      roundOrder: true,
      startDate: true,
      endDate: true,
    },
    with: {
      city: {
        columns: {
          id: true,
          name: true,
          centerPoint: true,
          mapZoom: true,
        },
      },
    },
  });

  if (!dbResult) {
    throw new TRPCError({ code: 'NOT_FOUND', message: 'Question was not found' });
  }
  if (dbResult.city === null) {
    throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Question is not assigned to any city.' });
  }
  if (!dbResult.startDate || !dbResult.endDate || !dbResult.roundOrder) {
    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: 'Some of required attributes are nullable. These attributes are: startDate, endDate and roundOrder',
    });
  }

  // override startDate and endDate because typescript doesnt know that we checked they are not null
  const question = {
    ...dbResult,
    city: dbResult.city,
    startDate: dbResult.startDate,
    endDate: dbResult.endDate,
    roundOrder: dbResult.roundOrder,
  } satisfies QuestionEntity;

  await redisClient.setObject(redisKey, question);

  return question;
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
          endDate: question.endDate!,
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
        question: {
          startDate: question.startDate!,
          endDate: question.endDate!,
        },
      };
    }

    if (now > question.endDate) {
      return {
        status: 'expired_not_answered',
        question: {
          startDate: question.startDate!,
          endDate: question.endDate!,
        },
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
