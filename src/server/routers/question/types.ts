import { MapLocation } from '~/db/types';

type QuestionStatus = 'not_started' | 'active' | 'expired_not_answered' | 'answered';

export interface GetQuestionResponse {
  status: QuestionStatus;
  question: {
    id: number;
    questionDescription: string | null;
    title: string;
    questionImageUrl: string;
    city: {
      id: number;
      name: string;
      centerPoint: MapLocation;
      mapZoom: number;
    };
    startDate: Date;
    endDate: Date;
  } | null;
}
