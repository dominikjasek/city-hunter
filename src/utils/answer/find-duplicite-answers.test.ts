import { describe } from 'vitest';
import { Answer } from '~/db/schema';
import { fromPartial } from '@total-typescript/shoehorn';
import { findDupliciteAnswers } from '~/utils/answer/find-duplicite-answers';

describe('findDupliciteAnswers', () => {
  it('should return empty array if no duplicite answers', () => {
    const answersWithDuplicates: Answer[] = [
      fromPartial({ id: 1, userId: 'john' }),
      fromPartial({ id: 2, userId: 'vaclav' }),
      fromPartial({ id: 3, userId: 'frederick' }),
    ];

    expect(findDupliciteAnswers(answersWithDuplicates)).toEqual([]);
  });

  it('should return duplicite answers', () => {
    const answersWithDuplicates: Answer[] = [
      fromPartial({ id: 1, userId: 'john' }),
      fromPartial({ id: 2, userId: 'john' }),
      fromPartial({ id: 3, userId: 'peter' }),
    ];

    expect(findDupliciteAnswers(answersWithDuplicates)).toEqual([{ id: 2, userId: 'john' }]);
  });

  it('should return multiple duplicite answers for single user only', () => {
    const answersWithDuplicates: Answer[] = [
      fromPartial({ id: 1, userId: 'john' }),
      fromPartial({ id: 2, userId: 'john' }),
      fromPartial({ id: 3, userId: 'peter' }),
      fromPartial({ id: 4, userId: 'john' }),
    ];

    expect(findDupliciteAnswers(answersWithDuplicates)).toEqual([
      { id: 2, userId: 'john' },
      { id: 4, userId: 'john' },
    ]);
  });

  it('should return multiple duplicite answers for multiple users', () => {
    const answersWithDuplicates: Answer[] = [
      fromPartial({ id: 1, userId: 'john' }),
      fromPartial({ id: 2, userId: 'john' }),
      fromPartial({ id: 3, userId: 'peter' }),
      fromPartial({ id: 4, userId: 'peter' }),
      fromPartial({ id: 5, userId: 'john' }),
    ];

    expect(findDupliciteAnswers(answersWithDuplicates)).toEqual([
      { id: 2, userId: 'john' },
      { id: 4, userId: 'peter' },
      { id: 5, userId: 'john' },
    ]);
  });
});
