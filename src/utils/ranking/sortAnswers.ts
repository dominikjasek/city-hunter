type SortableAnswer = { answeredAt: Date; score: number; distance: number };
type SortableAnswerWithMedals = SortableAnswer & { medalsScore: number };

export const sortAnswersByPoints = <T extends SortableAnswer>(answers: T[]): T[] => {
  const answersCpy = [...answers];

  answersCpy.sort((a, b) => {
    if (a.score !== b.score) {
      return b.score - a.score;
    }
    if (a.answeredAt.getTime() !== b.answeredAt.getTime()) {
      return a.answeredAt.getTime() - b.answeredAt.getTime();
    }
    return a.distance - b.distance;
  });

  return answersCpy;
};
