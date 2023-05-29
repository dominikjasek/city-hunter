import React, { FC } from 'react';
import { SignedIn, SignedOut, UserButton, useUser } from '@clerk/nextjs';
import { Button, Skeleton } from '@mui/material';
import { useDialog } from '~/components/contexts/DialogProvider';
import { useRouter } from 'next/router';
import isWebview from 'is-ua-webview';

export const UserBox: FC = () => {
  const { setOpenLoginDialog } = useDialog();
  const { pathname, push } = useRouter();
  const { isSignedIn } = useUser();

  if (isSignedIn === undefined) {
    return <Skeleton variant="circular" width={32} height={32} />;
  }

  const isWebView = isWebview(window.navigator.userAgent);
  const handleLoginClick = () => {
    if (!isWebView) {
      setOpenLoginDialog(true);
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
