import { MapLocation } from '~/db/types';
import { D_1, D_2, T_1, T_2 } from '~/utils/score/constants';

// https://stackoverflow.com/questions/18883601/function-to-calculate-distance-between-two-coordinates
// https://en.wikipedia.org/wiki/Haversine_formula
export const haversineDistance = (point1: MapLocation, point2: MapLocation) => {
  const deg2rad = (deg: number) => {
    return deg * (Math.PI / 180);
  };

  const R = 6_378_000; // Radius of the earth in m
  const dLat = deg2rad(point2.lat - point1.lat); // deg2rad below
  const dLon = deg2rad(point2.lng - point1.lng);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(point1.lat)) * Math.cos(deg2rad(point2.lat)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in m
};

const MAXIMAL_DISTANCE_SCORE = 100;
const evaluateDistanceScore = (distance: number) => {
  const score = D_1 - D_2 * distance;
  return Math.max(0, Math.min(MAXIMAL_DISTANCE_SCORE, score));
};

const MAXIMAL_TIME_PENALTY_COEFFICIENT = 1;
// up to 12 seconds is still no penalty
const evaluateTimePenaltyCoefficient = (durationInSeconds: number) => {
  const durationInMinutes = durationInSeconds / 60;
  const timePenaltyCoefficient = T_1 - T_2 * Math.log10(durationInMinutes + 1);
  return Math.max(0, Math.min(MAXIMAL_TIME_PENALTY_COEFFICIENT, timePenaltyCoefficient));
};

export const evaluateResultsFromLocations = (
  answer: MapLocation,
  correctLocation: MapLocation,
  durationInSeconds: number,
) => {
  const distance = haversineDistance(answer, correctLocation);
  const score = evaluateScoreFromDistance(distance, durationInSeconds);
  return {
    score,
    distance,
  };
};

export const evaluateScoreFromDistance = (distanceInMeters: number, durationInSeconds: number): number => {
  const distanceScore = evaluateDistanceScore(distanceInMeters);
  const timePenaltyCoefficient = evaluateTimePenaltyCoefficient(durationInSeconds);
  return Math.ceil(timePenaltyCoefficient * distanceScore);
};
