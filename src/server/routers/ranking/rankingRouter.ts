import { publicProcedure, router } from '~/server/trpc';
import { db } from '~/db/drizzle';
import { answers, questions, users } from '~/db/schema';
import { eq } from 'drizzle-orm/expressions';
import { z } from 'zod';
import { TournamentUserScore } from '~/server/routers/ranking/types';

export const rankingRouter = router({
  getTournamentRanking: publicProcedure.input(z.object({ tournamentId: z.string() })).query(async ({ input }) => {
    const dbResult = await db
      .select({ userId: answers.userId, nickName: users.nickName, score: answers.score })
      .from(questions)
      .innerJoin(answers, eq(answers.questionId, questions.id))
      .innerJoin(users, eq(answers.userId, users.id))
      .where(eq(questions.tournamentId, input.tournamentId));

    const groupedByUsers = dbResult.reduce((nextDbItem, curr) => {
      const currUserIndex = nextDbItem.findIndex((item) => item.userId === curr.userId);

      if (currUserIndex === -1 || !nextDbItem[currUserIndex]) {
        nextDbItem.push({
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
        return nextDbItem;
      }

      const currentDbItem = nextDbItem[currUserIndex];

      if (!currentDbItem) {
        throw new Error('currentDbItem is undefined');
      }

      nextDbItem[currUserIndex] = {
        userId: curr.userId,
        nickName: curr.nickName,
        score: currentDbItem.score + curr.score,
        medals: {
          GOLD: currentDbItem.medals.GOLD + 0, //TODO
          SILVER: currentDbItem.medals.SILVER + 0, //TODO
          BRONZE: currentDbItem.medals.BRONZE + 0, //TODO
        },
        medalsScore: 0, //TODO
      };
      return nextDbItem;
    }, [] as TournamentUserScore[]);

    return groupedByUsers;
  }),

  evaluateMedals: publicProcedure.mutation(async () => {
    return 'nazdar 33';
  }),
});
