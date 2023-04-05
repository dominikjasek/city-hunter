import React from 'react';
import { SignedIn, SignedOut, SignIn, UserButton } from '@clerk/nextjs';

export const Navbar: React.FC = () => {
  return (
    <nav>
      <SignedIn>
        <UserButton></UserButton>
      </SignedIn>
      <SignedOut>
        nejses prihlasenej kamo
        <SignIn />
      </SignedOut>
    </nav>
  );
};
