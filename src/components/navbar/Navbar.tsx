import React from 'react';
import { SignedIn, SignedOut, SignIn, UserButton } from '@clerk/nextjs';
import { Box, Stack, Typography } from '@mui/material';
import LogoWhite from '@public/Logo-white.svg';
import Image from 'next/image';

export const Navbar: React.FC = () => {
  return (
    <nav>
      <Stack
        justifyContent={'space-between'}
        alignItems={'center'}
        direction={'row'}
        mx={2}
      >
        {/*<SvgIcon component={Logo} viewBox="0 0 600 476.6" />*/}
        <Stack direction={'row'} alignItems={'center'} gap={1}>
          <Image
            priority
            src={LogoWhite}
            alt="Follow us on Twitter"
            height={46}
            style={{ fill: 'white' }}
          />
          <Typography fontSize={24}>CITY HUNTER</Typography>
        </Stack>
        <Box>
          <SignedIn>
            <UserButton></UserButton>
          </SignedIn>
          <SignedOut>
            <SignIn />
          </SignedOut>
        </Box>
      </Stack>
    </nav>
  );
};
