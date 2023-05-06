import { db } from '~/db/drizzle';
import { Answer, answers, questions } from '~/db/schema';
import { and, between, eq } from 'drizzle-orm/expressions';
import { add, sub } from 'date-fns';
import { NextApiRequest, NextApiResponse } from 'next';

const setMedalForQuestionId = async (questionId: number, userId: string, medal: Answer['medal']) => {
  return db
    .update(answers)
    .set({ medal })
    .where(and(eq(answers.userId, userId), eq(answers.questionId, questionId)));
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const now = new Date();
  const before2Minutes = sub(now, { minutes: 2 });
  const after2Minutes = add(now, { minutes: 2 });

  const recentlyEndedQuestions = await db
    .select({
      questionId: questions.id,
      userId: answers.userId,
      score: answers.score,
      answeredAt: answers.answeredAt,
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
    const sortedAnswers = filteredAnswers.sort((a, b) => {
      if (a.score === b.score) {
        return a.answeredAt.getTime() - b.answeredAt.getTime();
      }
      return b.score - a.score;
    });

    const dbPromises: Promise<unknown>[] = [];
    if (sortedAnswers[0]) {
      dbPromises.push(setMedalForQuestionId(questionId, sortedAnswers[0].userId, 'GOLD'));
    }
    if (sortedAnswers[1]) {
      dbPromises.push(setMedalForQuestionId(questionId, sortedAnswers[1].userId, 'SILVER'));
    }
    if (sortedAnswers[2]) {
      dbPromises.push(setMedalForQuestionId(questionId, sortedAnswers[2].userId, 'BRONZE'));
    }

    await Promise.all(dbPromises);
  }

  return res.json({ success: true });
}
