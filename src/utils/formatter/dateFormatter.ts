import { formatInTimeZone } from 'date-fns-tz';

const DEFAULT_TIMEZONE = 'Europe/Prague';

export const formatDate = (date: Date) => {
  return formatInTimeZone(date, DEFAULT_TIMEZONE, 'd.M.yyyy');
};

export const formatDateTime = (date: Date) => {
  return formatInTimeZone(date, DEFAULT_TIMEZONE, 'd.M.yyyy HH:mm');
};

export const formatTime = (date: Date) => {
  return formatInTimeZone(date, DEFAULT_TIMEZONE, 'HH:mm');
};
