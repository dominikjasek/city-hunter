import { publicProcedure, router } from '~/server/trpc';
import { db } from '~/db/drizzle';
import { answers, cities, questions, users } from '~/db/schema';
import { and, eq, lt } from 'drizzle-orm';
import { z } from 'zod';
import { TournamentUserScore } from '~/server/routers/ranking/types';
import { sortAnswersByPoints } from '~/utils/ranking/sortAnswers';
import { assertRequiredFields } from '~/utils/typescript/assertRequiredFields';

export const rankingRouter = router({
  getTournamentRanking: publicProcedure
    .input(z.object({ tournamentId: z.string() }))
    .query<TournamentUserScore[]>(async ({ input }) => {
      const dbQueryResult = await db.query.questions.findMany({
        where: (questions, { eq }) => eq(questions.tournamentId, input.tournamentId),
        columns: {
          id: true,
        },
        with: {
          answers: {
            columns: {
              score: true,
              medal: true,
              answeredAt: true,
            },
            with: {
              user: {
                columns: {
                  id: true,
                  nickName: true,
                },
              },
            },
          },
        },
      });

      const usersRanking: TournamentUserScore[] = [];

      dbQueryResult.forEach((question) => {
        const sortedAnswers = sortAnswersByPoints(question.answers);
        sortedAnswers.forEach((answer) => {
          let currUserIndex = usersRanking.findIndex((item) => item.userId === answer.user.id);

          if (currUserIndex === -1 || !usersRanking[currUserIndex]) {
            usersRanking.push({
              userId: answer.user.id,
              nickName: answer.user.nickName,
              score: 0,
              medals: {
                GOLD: 0,
                SILVER: 0,
                BRONZE: 0,
              },
              medalsScore: 0,
            });

            currUserIndex = usersRanking.length - 1;
          }

          const gold = usersRanking[currUserIndex]!.medals.GOLD + (answer.medal === 'GOLD' ? 1 : 0);
          const silver = usersRanking[currUserIndex]!.medals.SILVER + (answer.medal === 'SILVER' ? 1 : 0);
          const bronze = usersRanking[currUserIndex]!.medals.BRONZE + (answer.medal === 'BRONZE' ? 1 : 0);

          usersRanking[currUserIndex] = {
            userId: answer.user.id,
            nickName: answer.user.nickName,
            medals: {
              GOLD: gold,
              SILVER: silver,
              BRONZE: bronze,
            },
            score: usersRanking[currUserIndex]!.score + answer.score,
            medalsScore: gold * 3 + silver * 2 + bronze,
          };
        });
      });

      return usersRanking;
    }),

  getQuestionRanking: publicProcedure
    .input(z.object({ tournamentId: z.string(), roundOrder: z.number() }))
    .query(async ({ input }) => {
      const now = new Date();

      const questionDetailsDbResult = (
        await db
          .select({
            id: questions.id,
            name: questions.title,
            cityId: questions.cityId,
            questionImageUrl: questions.questionImageUrl,
            answerImagesUrl: questions.answerImagesUrl,
            questionDescription: questions.questionDescription,
            answerDescription: questions.answerDescription,
            correctLocation: questions.location,
            startDate: questions.startDate,
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

      if (!questionDetailsDbResult) {
        throw new Error('Question not found');
      }

      const questionDetails = assertRequiredFields(questionDetailsDbResult, ['startDate', 'endDate', 'cityId']);

      const userAnswers = await db
        .select({
          id: answers.id,
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

      const city = (await db.select().from(cities).where(eq(cities.id, questionDetails.cityId)).limit(1))[0]!;

      const averageScoreFloatingDecimal = userAnswers.reduce((acc, curr) => acc + curr.score, 0) / userAnswers.length;
      const averageScoreRoundedToOneDecimal = Math.round(averageScoreFloatingDecimal * 10) / 10;
      const averageDurationInSeconds =
        userAnswers.reduce(
          (acc, curr) => acc + (curr.answeredAt.getTime() - questionDetails.startDate.getTime()) / 1000,
          0,
        ) / userAnswers.length;

      return {
        answers: sortAnswersByPoints(
          userAnswers.map((answer) => ({
            ...answer,
            durationInSeconds: (answer.answeredAt.getTime() - questionDetails.startDate.getTime()) / 1000,
          })),
        ),
        question: {
          ...questionDetails,
          answerImagesUrl: questionDetails.answerImagesUrl.split(','),
        },
        map: {
          centerPoint: city.centerPoint,
          mapZoom: city.mapZoom,
        },
        statistics: {
          averageScore: averageScoreRoundedToOneDecimal,
          averageDurationInSeconds,
        },
      };
    }),
});
