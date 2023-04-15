import React, { FC } from 'react';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { Box, Button } from '@mui/material';
import { useDialog } from '~/components/contexts/DialogProvider';
import { useRouter } from 'next/router';

export const UserBox: FC = () => {
  const { setOpenLoginDialog } = useDialog();
  const { pathname } = useRouter();

  return (
    <Box>
      <SignedIn>
        <UserButton userProfileUrl={'/user'} userProfileMode={'navigation'} />
      </SignedIn>
      <SignedOut>
        {pathname !== '/login' && (
          <Button
            color={'secondary'}
            variant={'contained'}
            onClick={() => setOpenLoginDialog(true)}
          >
            Přihlásit se
          </Button>
        )}
      </SignedOut>
    </Box>
  );
};
