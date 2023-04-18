import { publicProcedure, router } from '../trpc';
import { db } from '~/db/drizzle';
import { cities } from '~/db/schema';

export const cityRouter = router({
  list: publicProcedure.query(async ({ input, ctx }) => {
    return db.select().from(cities);
  }),
});
