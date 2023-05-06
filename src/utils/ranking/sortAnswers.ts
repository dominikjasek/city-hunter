type SortableAnswer = { answeredAt: Date; score: number };

export const sortAnswers = <T extends SortableAnswer>(answers: T[]): T[] => {
  const answersCpy = [...answers];

  answersCpy.sort((a, b) => {
    if (a.score === b.score) {
      return a.answeredAt.getTime() - b.answeredAt.getTime();
    }
    return b.score - a.score;
  });

  return answersCpy;
};
