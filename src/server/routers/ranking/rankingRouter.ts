import { publicProcedure, router } from '~/server/trpc';
import { db } from '~/db/drizzle';
import { answers, cities, questions, users } from '~/db/schema';
import { and, eq, lt } from 'drizzle-orm/expressions';
import { z } from 'zod';
import { TournamentUserScore } from '~/server/routers/ranking/types';
import { sortAnswers } from '~/utils/ranking/sortAnswers';
import { createDurationString } from '~/utils/ranking/createDurationString';

export const rankingRouter = router({
  getTournamentRanking: publicProcedure.input(z.object({ tournamentId: z.string() })).query(async ({ input }) => {
    const dbResult = await db
      .select({ userId: answers.userId, nickName: users.nickName, score: answers.score, medal: answers.medal })
      .from(questions)
      .innerJoin(answers, eq(answers.questionId, questions.id))
      .innerJoin(users, eq(answers.userId, users.id))
      .where(eq(questions.tournamentId, input.tournamentId));

    const groupedByUsers = dbResult.reduce((acc, curr) => {
      const currUserIndex = acc.findIndex((item) => item.userId === curr.userId);

      if (currUserIndex === -1 || !acc[currUserIndex]) {
        acc.push({
          userId: curr.userId,
          nickName: curr.nickName,
          score: 0,
          medals: {
            GOLD: 0,
            SILVER: 0,
            BRONZE: 0,
          },
          medalsScore: 0,
        });
        return acc;
      }

      if (!acc[currUserIndex]) {
        throw new Error('userScore is undefined');
      }

      const gold = acc[currUserIndex]!.medals.GOLD + (curr.medal === 'GOLD' ? 1 : 0);
      const silver = acc[currUserIndex]!.medals.GOLD + (curr.medal === 'SILVER' ? 1 : 0);
      const bronze = acc[currUserIndex]!.medals.GOLD + (curr.medal === 'BRONZE' ? 1 : 0);

      acc[currUserIndex] = {
        userId: curr.userId,
        nickName: curr.nickName,
        score: acc[currUserIndex]!.score + curr.score,
        medals: {
          GOLD: gold,
          SILVER: silver,
          BRONZE: bronze,
        },
        medalsScore: gold * 3 + silver * 2 + bronze,
      };
      return acc;
    }, [] as TournamentUserScore[]);

    return groupedByUsers;
  }),

  getQuestionRanking: publicProcedure
    .input(z.object({ tournamentId: z.string(), roundOrder: z.number() }))
    .query(async ({ input }) => {
      const now = new Date();

      const questionDetails = (
        await db
          .select({
            id: questions.id,
            cityId: questions.cityId,
            questionImageUrl: questions.questionImageUrl,
            answerImagesUrl: questions.answerImagesUrl,
            questionDescription: questions.questionDescription,
            answerDescription: questions.answerDescription,
            correctLocation: questions.location,
            endDate: questions.endDate,
          })
          .from(questions)
          .where(
            and(
              eq(questions.roundOrder, input.roundOrder),
              eq(questions.tournamentId, input.tournamentId),
              lt(questions.endDate, now),
            ),
          )
          .limit(1)
      )[0];

      if (!questionDetails) {
        throw new Error('Question not found');
      }

      const userAnswers = await db
        .select({
          userId: answers.userId,
          nickName: users.nickName,
          score: answers.score,
          medal: answers.medal,
          answeredAt: answers.answeredAt,
          location: answers.location,
        })
        .from(answers)
        .innerJoin(questions, eq(answers.questionId, questions.id))
        .innerJoin(users, eq(answers.userId, users.id))
        .where(eq(answers.questionId, questionDetails.id));

      const city = (await db.select().from(cities).where(eq(cities.id, questionDetails.cityId!)).limit(1))[0]!;

      console.log('userAnswers', userAnswers);

      return {
        answers: sortAnswers(
          userAnswers.map((answer) => ({
            ...answer,
            durationInSeconds: createDurationString(
              (answer.answeredAt.getTime() - questionDetails.endDate!.getTime()) / 1000,
            ),
          })),
        ),
        question: questionDetails,
        map: {
          centerPoint: city.centerPoint,
          mapZoom: city.mapZoom,
        },
      };
    }),
});
