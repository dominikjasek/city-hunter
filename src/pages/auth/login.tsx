import React from 'react';
import { NextPage } from 'next';
import { SignedIn, SignIn } from '@clerk/nextjs';
import { Stack, Typography } from '@mui/material';

const LoginPage: NextPage = () => {
  return (
    <Stack alignItems={'center'} justifyContent={'center'}>
      <SignedIn>
        <Typography>Už jste přihlášeni, budete přesměrováni...</Typography>
      </SignedIn>
      <SignIn
        appearance={{
          elements: {
            rootBox: {
              '& .cl-signIn-start': {
                overflow: 'hidden',
              },
            },
          },
        }}
      />
    </Stack>
  );
};

export default LoginPage;

export async function getStaticProps() {
  return {
    props: {},
  };
}
