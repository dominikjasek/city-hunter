import { MapLocation } from '~/db/types';

interface NotStartedQuestion {
  status: 'not_started';
  question: {
    startDate: Date;
    endDate: Date;
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
  question: {
    startDate: Date;
    endDate: Date;
  };
}

interface ExpiredAnsweredQuestion {
  status: 'expired_answered';
  question: {
    startDate: Date;
    endDate: Date;
  };
}

interface AnsweredQuestion {
  status: 'answered';
  question: {
    startDate: Date;
    endDate: Date;
  };
}

export type GetQuestionResponse =
  | NotStartedQuestion
  | ActiveQuestion
  | ExpiredAnsweredQuestion
  | ExpiredNotAnsweredQuestion
  | AnsweredQuestion;

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
  roundOrder: number;
  startDate: Date;
  endDate: Date;
}
