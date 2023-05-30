export {};

declare global {
  interface Window {
    SMap: any;
  }
}

export interface MapLocation {
  lat: number;
  lng: number;
}

interface BaseAnswerLocation {
  location: MapLocation;
}

interface UserAnswerLocation extends BaseAnswerLocation {
  type: 'user-answer';
  isMyAnswer: boolean;
}

interface SolutionLocation extends BaseAnswerLocation {
  type: 'solution';
}

export type AnswerLocation = UserAnswerLocation | SolutionLocation;
