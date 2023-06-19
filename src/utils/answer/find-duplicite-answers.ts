import { Answer } from '~/db/schema';

/**
 * Returns array of answer ids that are duplicite (these answers can be deleted)
 * @param answersWithDuplicates
 */
export const findDupliciteAnswers = (answersWithDuplicates: Answer[]): Answer[] => {
  const resolvedUserIds: Set<string> = new Set();
  const duplicatedAnswers: Answer[] = [];
  for (const answer of answersWithDuplicates) {
    if (resolvedUserIds.has(answer.userId)) {
      duplicatedAnswers.push(answer);
      continue;
    }
    resolvedUserIds.add(answer.userId);
  }
  return duplicatedAnswers;
};
