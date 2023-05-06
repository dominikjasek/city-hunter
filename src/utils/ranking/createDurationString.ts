export const createDurationString = (durationInSeconds: number): string => {
  const minutes = Math.floor(durationInSeconds / 60);
  const seconds = Math.ceil(durationInSeconds - minutes * 60);
  const duration = `${minutes}:${String(seconds).padStart(2, '0')}`;
  return duration;
};
