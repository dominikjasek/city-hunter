import { MapLocation } from '~/db/types';

interface NotStartedQuestion {
  status: 'not_started';
  question: {
    startDate: Date;
  };
}

interface ActiveQuestion {
  status: 'active';
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
  };
}

interface ExpiredNotAnsweredQuestion {
  status: 'expired_not_answered';
  question: null;
}

interface AnsweredQuestion {
  status: 'answered';
  question: null;
}

export type GetQuestionResponse = NotStartedQuestion | ActiveQuestion | ExpiredNotAnsweredQuestion | AnsweredQuestion;

export interface QuestionEntity {
  id: number;
  title: string;
  questionDescription: string | null;
  questionImageUrl: string;
  city: {
    id: number;
    name: string;
    centerPoint: MapLocation;
    mapZoom: number;
  };
  roundOrder: number | null;
  startDate: Date | null;
  endDate: Date | null;
}
