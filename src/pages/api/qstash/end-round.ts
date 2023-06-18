import { db } from '~/db/drizzle';
import { Answer, answers, questions } from '~/db/schema';
import { and, between, eq } from 'drizzle-orm';
import { add, sub } from 'date-fns';
import { NextApiRequest, NextApiResponse } from 'next';
import { sortAnswersByPoints } from '~/utils/ranking/sortAnswers';
import { revalidateRankingPages } from '~/server/revalidate/revalidate';
import { ExecutedQuery } from '@planetscale/database';
import { haversineDistance } from '~/utils/score/evaluate-score';
import { assertRequiredProperties } from 'required-properties';

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
      location: true,
    },
    with: {
      answers: {
        columns: {
          userId: true,
          score: true,
          answeredAt: true,
          location: true,
        },
      },
    },
  });

  // Update medals
  await Promise.all(
    recentlyEndedQuestions.map(async (question) => {
      // const sortedAnswers = sortAnswersByPoints(question.answers);
      const sortedAnswers = sortAnswersByPoints(
        question.answers.map((answer) => ({
          ...answer,
          distance: haversineDistance(answer.location, question.location),
        })),
      );

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
      recentlyEndedQuestions.map((question) => {
        assertRequiredProperties(question, ['tournamentId', 'roundOrder']);
        return question;
      }),
    ),
  ]);

  // Revalidate tournament play page
  const tournamentsAffected = new Set<string>();
  recentlyEndedQuestions.forEach((question) => {
    assertRequiredProperties(question, ['tournamentId']);
    tournamentsAffected.add(question.tournamentId);
  });
  await Promise.all(Array.from(tournamentsAffected).map((tournamentId) => res.revalidate(`/play/${tournamentId}`)));

  return res.json({ success: true });
}

export default handler;

export const config = {
  api: {
    bodyParser: false,
  },
};
