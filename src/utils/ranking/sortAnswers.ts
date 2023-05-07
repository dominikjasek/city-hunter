type SortableAnswer = { answeredAt: Date; score: number };
type SortableAnswerWithMedals = SortableAnswer & { medalsScore: number };

export const sortAnswersByPoints = <T extends SortableAnswer>(answers: T[]): T[] => {
  const answersCpy = [...answers];

  answersCpy.sort((a, b) => {
    if (a.score === b.score) {
      return a.answeredAt.getTime() - b.answeredAt.getTime();
    }
    return b.score - a.score;
  });

  return answersCpy;
};

export const sortAnswersByMedals = <T extends SortableAnswerWithMedals>(answers: T[]): T[] => {
  const answersCpy = [...answers];

  answersCpy.sort((a, b) => {
    if (a.medalsScore === b.medalsScore) {
      return b.score - a.score;
    }
    return b.medalsScore - a.medalsScore;
  });

  return answersCpy;
};
