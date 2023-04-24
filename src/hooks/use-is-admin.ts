import { useUser } from '@clerk/nextjs';

export const useIsAdmin = () => {
  const { user } = useUser();
  return user?.publicMetadata.role === 'admin';
};
