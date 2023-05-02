import { format } from 'date-fns';

export const formatDate = (date: Date) => {
  return format(date, 'd.M.yyyy');
};

export const formatDateTime = (date: Date) => {
  return format(date, 'd.M.yyyy HH:mm');
};

export const formatTime = (date: Date) => {
  return format(date, 'HH:mm');
};
