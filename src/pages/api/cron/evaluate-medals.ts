import { db } from '~/db/drizzle';
import { answers, questions } from '~/db/schema';
import { between, eq } from 'drizzle-orm/expressions';
import { add, sub } from 'date-fns';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const now = new Date();
  const before1Minutes = sub(now, { minutes: 1 });
  const after1Minutes = add(now, { minutes: 1 });

  const recentlyEndedQuestions = await db
    .select({
      questionId: questions.id,
      userId: answers.userId,
      score: answers.score,
    })
    .from(answers)
    .innerJoin(questions, eq(answers.questionId, questions.id))
    .where(between(questions.endDate, before1Minutes, after1Minutes));
  console.log('recentlyEndedQuestions', recentlyEndedQuestions);

  const allPossibleQuestionIds = recentlyEndedQuestions.reduce(
    (acc, curr) => acc.add(curr.questionId),
    new Set<number>(),
  );

  allPossibleQuestionIds.forEach((questionId) => {
    const answers = recentlyEndedQuestions.filter((item) => item.questionId === questionId);
    const sortedAnswers = answers.sort((a, b) => b.score - a.score);

    // Update in db - TODO
  });

  return res.json({ success: true });
}
