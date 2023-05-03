import { NextPage } from 'next';
import { SignedIn, SignUp } from '@clerk/nextjs';
import { Stack, Typography } from '@mui/material';

export const SignUpPage: NextPage = () => {
  return (
    <Stack alignItems={'center'} justifyContent={'center'}>
      <SignedIn>
        <Typography>Už jste přihlášeni, budete přesměrováni...</Typography>
      </SignedIn>
      <SignUp
        appearance={{
          elements: {
            rootBox: {
              '& .cl-signUp-start': {
                overflow: 'hidden',
              },
            },
          },
        }}
      />
    </Stack>
  );
};

export default SignUpPage;
