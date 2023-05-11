interface DurationStringOptions {
  format: 'hh:mm:ss' | 'minutes and seconds';
}

export const createDurationString = (
  durationInSeconds: number,
  { format = 'hh:mm:ss' } = {} as DurationStringOptions,
): string => {
  const hours = Math.floor(durationInSeconds / 3600);
  const minutes = Math.floor((durationInSeconds - hours * 3600) / 60);
  const seconds = Math.floor(durationInSeconds - hours * 3600 - minutes * 60);
  const hoursString = hours > 0 ? `${hours.toString().padStart(2, '0')}:` : '';
  const minutesString = minutes.toString().padStart(2, '0');
  const secondsString = seconds.toString().padStart(2, '0');

  if (format === 'hh:mm:ss') {
    return `${hoursString}${minutesString}:${secondsString}`;
  }

  if (hours > 0) {
    return `${hours} hodin, ${minutes} minut, ${seconds} sekund`;
  }
  if (minutes > 0) {
    return `${minutes} minut, ${seconds} sekund`;
  }
  return `${seconds} sekund`;
};
