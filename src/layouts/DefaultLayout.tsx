import Head from 'next/head';
import { ReactNode } from 'react';
import { Navbar } from '~/components/navbar/Navbar';

type DefaultLayoutProps = { children: ReactNode };

export const DefaultLayout = ({ children }: DefaultLayoutProps) => {
  return (
    <>
      <Head>
        <title>City hunter</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <nav>{<Navbar />}</nav>
        {children}
      </main>
    </>
  );
};
