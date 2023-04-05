import React from 'react';
import { UserButton } from '@clerk/nextjs';

export const Navbar: React.FC = () => {
  return (
    <nav>
      <UserButton></UserButton>
    </nav>
  );
};
