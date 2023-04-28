import React, { FC } from 'react';
import { SignedIn, SignedOut, UserButton, useUser } from '@clerk/nextjs';
import { Button, Skeleton } from '@mui/material';
import { useDialog } from '~/components/contexts/DialogProvider';
import { useRouter } from 'next/router';

export const UserBox: FC = () => {
  const { setOpenLoginDialog } = useDialog();
  const { pathname } = useRouter();
  const { isSignedIn } = useUser();

  if (isSignedIn === undefined) {
    return <Skeleton variant="circular" width={32} height={32} />;
  }

  return (
    <>
      <SignedIn>
        <UserButton userProfileUrl={'/user'} userProfileMode={'navigation'} />
      </SignedIn>
      <SignedOut>
        {pathname !== '/login' && (
          <Button color={'secondary'} variant={'contained'} onClick={() => setOpenLoginDialog(true)}>
            Přihlásit se
          </Button>
        )}
      </SignedOut>
    </>
  );
};
