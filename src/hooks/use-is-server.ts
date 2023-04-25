export const useIsServer = () => {
  return typeof window === 'undefined';
};
