import { NextApiResponse } from 'next';

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
    revalidateRoute(`/ranking/${question.tournamentId}`);
    revalidateRoute(`/ranking/${question.tournamentId}/${question.roundOrder}`);
  }

  await Promise.all(promises);
};
