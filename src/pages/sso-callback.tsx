import { AuthenticateWithRedirectCallback } from '@clerk/nextjs';

export const SsoCallback = () => {
  return <AuthenticateWithRedirectCallback />;
};

export default SsoCallback;
