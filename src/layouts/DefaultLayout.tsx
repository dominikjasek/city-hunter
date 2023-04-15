import Head from 'next/head';
import { ReactNode } from 'react';
import { Navbar } from '~/components/navbar/Navbar';
import styles from '~/styles/global.module.css';
import { Container } from '@mui/material';

type DefaultLayoutProps = { children: ReactNode };

export const DefaultLayout = ({ children }: DefaultLayoutProps) => {
  return (
    <>
      <Head>
        <title>City Hunter</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.app}>
        <Navbar />
        <main>
          <Container>{children}</Container>
        </main>
      </div>
    </>
  );
};
