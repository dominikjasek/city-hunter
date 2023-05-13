import { NextApiResponse } from 'next';

type UpdatedQuestion = {
  roundOrder: number | null;
  tournamentId: string | null;
};

type NonNullUpdatedQuestion = {
  [K in keyof UpdatedQuestion]: NonNullable<UpdatedQuestion[K]>;
};

export const revalidateRankingPages = async (res: NextApiResponse, questions: UpdatedQuestion[]) => {
  const promises: Promise<unknown>[] = [];
  const revalidatedTournamentIds: string[] = [];
  const revalidatedTournamentRoundOrders: NonNullUpdatedQuestion[] = [];

  for (const question of questions) {
    if (!question.tournamentId) {
      continue;
    }

    if (!revalidatedTournamentIds.includes(question.tournamentId)) {
      promises.push(res.revalidate(`/ranking/${question.tournamentId}`));
      revalidatedTournamentIds.push(question.tournamentId);
    }

    if (
      !question.roundOrder ||
      revalidatedTournamentRoundOrders.some(
        (item) => item.tournamentId === question.tournamentId && item.roundOrder === question.roundOrder,
      )
    ) {
      continue;
    }

    promises.push(res.revalidate(`/ranking/${question.tournamentId}/${question.roundOrder}`));
    revalidatedTournamentRoundOrders.push({
      tournamentId: question.tournamentId,
      roundOrder: question.roundOrder,
    });
  }

  await Promise.all(promises);
};
