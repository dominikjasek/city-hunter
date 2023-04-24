import { publicProcedure, router } from '../trpc';
import { db } from '~/db/drizzle';
import { cities, tournaments } from '~/db/schema';
import { eq } from 'drizzle-orm/expressions';

export const tournamentRouter = router({
  getAll: publicProcedure.query(async () => {
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
      tournamentslist: tournamentsItems,
    };
  }),
});
