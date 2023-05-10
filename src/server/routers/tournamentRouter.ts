import { publicProcedure, router } from '../trpc';
import { db } from '~/db/drizzle';
import { cities, questions, tournaments } from '~/db/schema';
import { eq } from 'drizzle-orm/expressions';
import { z } from 'zod';

export const tournamentRouter = router({
  getDetailsForId: publicProcedure.input(z.object({ tournamentId: z.string() })).query(async ({ input }) => {
    const items = await db.select().from(tournaments).where(eq(tournaments.id, input.tournamentId)).limit(1);
    const tournament = items[0];
    if (!tournament) {
      throw new Error('Tournament not found');
    }
    return tournament;
  }),

  getSafelyQuestionsForId: publicProcedure.input(z.object({ tournamentId: z.string() })).query(async ({ input }) => {
    const now = new Date();
    const tournamentQuestions = await db
      .select({
        id: questions.id,
        title: questions.title,
        roundOrder: questions.roundOrder,
        startDate: questions.startDate,
        endDate: questions.endDate,
        questionImageUrl: questions.questionImageUrl,
      })
      .from(questions)
      .where(eq(questions.tournamentId, input.tournamentId))
      .orderBy(questions.startDate);

    return tournamentQuestions.map((question) => {
      const isLaunched = question.startDate && now > question.startDate;
      return {
        id: question.id,
        roundOrder: question.roundOrder,
        startDate: question.startDate!,
        endDate: question.endDate!,
        title: isLaunched ? question.title : null,
        questionImageUrl: isLaunched ? question.questionImageUrl : null,
      };
    });
  }),

  getAllTournaments: publicProcedure.query(async () => {
    const tournamentsItems = await db
      .select({
        city: cities.name,
        previewImageUrl: cities.previewImageUrl,
        id: tournaments.id,
        name: tournaments.name,
        startDate: tournaments.startDate,
        endDate: tournaments.endDate,
      })
      .from(tournaments)
      .innerJoin(cities, eq(tournaments.cityId, cities.id));
    return {
      tournaments: tournamentsItems,
    };
  }),
});
