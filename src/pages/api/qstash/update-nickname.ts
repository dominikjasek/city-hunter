import { NextApiRequest, NextApiResponse } from 'next';
import { verifySignature } from '@upstash/qstash/nextjs';
import { db } from '~/db/drizzle';
import { eq } from 'drizzle-orm';
import { answers, questions } from '~/db/schema';
import { UpdateNicknameEvent } from '~/server/qstash/types';
import { revalidateRankingPages } from '~/server/revalidate/revalidate';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const updateNickNameEvent = req.body as UpdateNicknameEvent['value'];

  const answeredQuestions = await db
    .select({ roundOrder: questions.roundOrder, tournamentId: questions.tournamentId })
    .from(answers)
    .innerJoin(questions, eq(answers.questionId, questions.id))
    .where(eq(answers.userId, updateNickNameEvent.userId));

  await revalidateRankingPages(res, answeredQuestions);

  return res.json({ success: true });
}

export default verifySignature(handler);

export const config = {
  api: {
    bodyParser: false,
  },
};
