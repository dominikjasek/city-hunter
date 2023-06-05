import { db } from '~/db/drizzle';
import { Answer, answers, questions } from '~/db/schema';
import { and, between, eq } from 'drizzle-orm';
import { add, sub } from 'date-fns';
import { NextApiRequest, NextApiResponse } from 'next';
import { sortAnswersByPoints } from '~/utils/ranking/sortAnswers';
import { revalidateRankingPages } from '~/server/revalidate/revalidate';
import { assertRequiredFields } from '~/utils/typescript/assertRequiredFields';
import { ExecutedQuery } from '@planetscale/database';
import { verifySignature } from '@upstash/qstash/nextjs';

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

  const recentlyEndedQuestions = await db.query.questions.findMany({
    where: between(questions.endDate, before2Minutes, after2Minutes),
    columns: {
      id: true,
      roundOrder: true,
      tournamentId: true,
    },
    with: {
      answers: {
        columns: {
          userId: true,
          score: true,
          answeredAt: true,
        },
      },
    },
  });

  // Update medals
  await Promise.all(
    recentlyEndedQuestions.map(async (question) => {
      const sortedAnswers = sortAnswersByPoints(question.answers);

      const updateMedalPromises: Promise<ExecutedQuery>[] = [];
      if (sortedAnswers[0]) {
        updateMedalPromises.push(setMedalForQuestionId(question.id, sortedAnswers[0].userId, 'GOLD'));
      }
      if (sortedAnswers[1]) {
        updateMedalPromises.push(setMedalForQuestionId(question.id, sortedAnswers[1].userId, 'SILVER'));
      }
      if (sortedAnswers[2]) {
        updateMedalPromises.push(setMedalForQuestionId(question.id, sortedAnswers[2].userId, 'BRONZE'));
      }

      await Promise.all(updateMedalPromises);
    }),
  );

  // Revalidate ranking pages
  await Promise.all([
    res.revalidate('/ranking'),
    revalidateRankingPages(
      res,
      recentlyEndedQuestions.map((question) => assertRequiredFields(question, ['tournamentId', 'roundOrder'])),
    ),
  ]);

  // Revalidate tournament play page
  const tournamentsAffected = new Set<string>();
  recentlyEndedQuestions.forEach((question) => {
    const { tournamentId } = assertRequiredFields(question, ['tournamentId']);
    tournamentsAffected.add(tournamentId);
  });
  await Promise.all(Array.from(tournamentsAffected).map((tournamentId) => res.revalidate(`/play/${tournamentId}`)));

  return res.json({ success: true });
}

export default verifySignature(handler);

export const config = {
  api: {
    bodyParser: false,
  },
};