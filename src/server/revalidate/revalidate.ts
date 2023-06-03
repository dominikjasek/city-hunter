import { NextApiResponse } from 'next';
import { assertRequiredFields } from '~/utils/typescript/assertRequiredFields';

type UpdatedQuestion = {
  roundOrder: number;
  tournamentId: string;
};

export const revalidateRankingPages = async (res: NextApiResponse, questions: UpdatedQuestion[]) => {
  const promises: Promise<unknown>[] = [];
  const revalidatedRoutes: Set<string> = new Set();

  const revalidateRoute = (route: string) => {
    if (revalidatedRoutes.has(route)) {
      return;
    }
    promises.push(res.revalidate(route));
    revalidatedRoutes.add(route);
  };

  for (const question of questions) {
    const nonNullableQuestion = assertRequiredFields(question, ['tournamentId', 'roundOrder']);

    revalidateRoute(`/ranking/${nonNullableQuestion.tournamentId}`);
    revalidateRoute(`/ranking/${nonNullableQuestion.tournamentId}/${nonNullableQuestion.roundOrder}`);
  }

  await Promise.all(promises);
};
