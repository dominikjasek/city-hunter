import Head from 'next/head';
import { ReactNode } from 'react';

type DefaultLayoutProps = { children: ReactNode };

export const DefaultLayout = ({ children }: DefaultLayoutProps) => {
  return (
    <>
      <Head>
        <title>City hunter</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>{children}</main>
    </>
  );
};
