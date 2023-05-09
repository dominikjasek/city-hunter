export const createDurationString = (durationInSeconds: number): string => {
  const hours = Math.floor(durationInSeconds / 3600);
  const minutes = Math.floor((durationInSeconds - hours * 3600) / 60);
  const seconds = Math.floor(durationInSeconds - hours * 3600 - minutes * 60);
  const hoursString = hours > 0 ? `${hours.toString().padStart(2, '0')}:` : '';
  const minutesString = minutes.toString().padStart(2, '0');
  const secondsString = seconds.toString().padStart(2, '0');
  return `${hoursString}${minutesString}:${secondsString}`;
};
