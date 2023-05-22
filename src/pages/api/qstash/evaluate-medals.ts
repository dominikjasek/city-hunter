import { db } from '~/db/drizzle';
import { Answer, answers, questions } from '~/db/schema';
import { and, between, eq } from 'drizzle-orm';
import { add, sub } from 'date-fns';
import { NextApiRequest, NextApiResponse } from 'next';
import { verifySignature } from '@upstash/qstash/nextjs';
import { sortAnswersByPoints } from '~/utils/ranking/sortAnswers';
import { revalidateRankingPages } from '~/server/revalidate/revalidate';

const setMedalForQuestionId = async (questionId: number, userId: string, medal: Answer['medal']) => {
  return db
    .update(answers)
    .set({ medal })
    .where(and(eq(answers.userId, userId), eq(answers.questionId, questionId)));
};

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const now = new Date();
  const before2Minutes = sub(now, { minutes: 2 });
  const after2Minutes = add(now, { minutes: 2 });

  const recentlyEndedQuestions = await db
    .select({
      questionId: questions.id,
      roundOrder: questions.roundOrder,
      userId: answers.userId,
      score: answers.score,
      answeredAt: answers.answeredAt,
      tournamentId: questions.tournamentId,
    })
    .from(answers)
    .innerJoin(questions, eq(answers.questionId, questions.id))
    .where(between(questions.endDate, before2Minutes, after2Minutes));

  const questionIdsToEvaluate = recentlyEndedQuestions.reduce(
    (acc, curr) => acc.add(curr.questionId),
    new Set<number>(),
  );

  for (const questionId of questionIdsToEvaluate) {
    const filteredAnswers = recentlyEndedQuestions.filter((item) => item.questionId === questionId);
    if (filteredAnswers.length === 0 || !filteredAnswers[0]) {
      throw new Error(`There are no answers for questionId=${questionId}`);
    }

    const tournamentId = filteredAnswers[0].tournamentId;
    if (!tournamentId) {
      throw new Error('TournamentId is null');
    }

    const sortedAnswers = sortAnswersByPoints(filteredAnswers);

    const updateMedalPromises: Promise<unknown>[] = [];
    if (sortedAnswers[0]) {
      updateMedalPromises.push(setMedalForQuestionId(questionId, sortedAnswers[0].userId, 'GOLD'));
    }
    if (sortedAnswers[1]) {
      updateMedalPromises.push(setMedalForQuestionId(questionId, sortedAnswers[1].userId, 'SILVER'));
    }
    if (sortedAnswers[2]) {
      updateMedalPromises.push(setMedalForQuestionId(questionId, sortedAnswers[2].userId, 'BRONZE'));
    }

    await Promise.all(updateMedalPromises);
  }

  await revalidateRankingPages(res, recentlyEndedQuestions);

  return res.json({ success: true });
}

export default verifySignature(handler);

export const config = {
  api: {
    bodyParser: false,
  },
};
