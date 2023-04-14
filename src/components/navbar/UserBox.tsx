import React, { FC } from 'react';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { Box, Button } from '@mui/material';
import { useDialog } from '~/components/contexts/DialogProvider';

export const UserBox: FC = () => {
  const { openLoginDialog } = useDialog();

  return (
    <Box>
      <SignedIn>
        <UserButton userProfileUrl={'/user'} userProfileMode={'navigation'} />
      </SignedIn>
      <SignedOut>
        <Button
          color={'secondary'}
          variant={'contained'}
          onClick={() => openLoginDialog()}
        >
          Přihlásit se
        </Button>
      </SignedOut>
    </Box>
  );
};
