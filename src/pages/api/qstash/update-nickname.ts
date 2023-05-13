import { NextApiRequest, NextApiResponse } from 'next';
import { verifySignature } from '@upstash/qstash/nextjs';
import { db } from '~/db/drizzle';
import { eq } from 'drizzle-orm/expressions';
import { answers, questions } from '~/db/schema';
import { UpdateNicknameEvent } from '~/server/qstash/types';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const updateNickNameEvent = req.body as UpdateNicknameEvent['value'];

  const tournamentsUserParticipates = await db
    .select({ roundOrder: questions.roundOrder, tournamentId: questions.tournamentId })
    .from(answers)
    .innerJoin(questions, eq(answers.questionId, questions.id))
    .where(eq(answers.userId, updateNickNameEvent.userId));

  const promises: Promise<unknown>[] = [];
  for (const { tournamentId, roundOrder } of tournamentsUserParticipates) {
    if (!tournamentId) {
      return;
    }
    promises.push(res.revalidate(`/ranking/${tournamentId}`));

    if (!roundOrder) {
      return;
    }
    promises.push(res.revalidate(`/ranking/${tournamentId}/${roundOrder}`));
  }

  await Promise.all(promises);

  return res.json({ success: true });
}

export default verifySignature(handler);

export const config = {
  api: {
    bodyParser: false,
  },
};
