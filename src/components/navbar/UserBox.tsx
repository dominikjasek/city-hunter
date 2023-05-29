import React, { FC } from 'react';
import { SignedIn, SignedOut, UserButton, useUser } from '@clerk/nextjs';
import { Button, Skeleton } from '@mui/material';
import { useRouter } from 'next/router';
import isWebview from 'is-ua-webview';

export const UserBox: FC = () => {
  const { pathname, push } = useRouter();
  const { isSignedIn } = useUser();

  if (isSignedIn === undefined) {
    return <Skeleton variant="circular" width={32} height={32} />;
  }

  const isWebView = isWebview(window.navigator.userAgent);
  const handleLoginClick = () => {
    if (!isWebView) {
      push('/auth/login');
    } else {
      push('/auth/webview');
    }
  };

  return (
    <>
      <SignedIn>
        <UserButton userProfileUrl={'/auth/user'} userProfileMode={'navigation'} />
      </SignedIn>
      <SignedOut>
        {pathname !== '/auth/login' && (
          <Button color={'secondary'} variant={'contained'} onClick={handleLoginClick}>
            Přihlásit se
          </Button>
        )}
      </SignedOut>
    </>
  );
};
