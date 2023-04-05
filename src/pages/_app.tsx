import type { NextPage } from 'next';
import type { AppType, AppProps } from 'next/app';
import type { ReactElement, ReactNode } from 'react';
import { DefaultLayout } from '~/layouts/DefaultLayout';
import styles from './../styles/global.module.css';
import './../styles/global.css';
import { trpc } from '~/utils/trpc';
import { ClerkProvider, SignedIn, SignedOut, SignIn } from '@clerk/nextjs';
import { localization } from '~/components/clerk/localization';

export type NextPageWithLayout<
  TProps = Record<string, unknown>,
  TInitialProps = TProps,
> = NextPage<TProps, TInitialProps> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const MyApp = (({ Component, pageProps }: AppPropsWithLayout) => {
  const getLayout =
    Component.getLayout ??
    ((page) => (
      <div className={styles.app}>
        <ClerkProvider {...pageProps} localization={localization}>
          <DefaultLayout>{page}</DefaultLayout>
        </ClerkProvider>
      </div>
    ));

  return getLayout(
    <>
      <SignedIn>
        <Component {...pageProps} />
      </SignedIn>
      <SignedOut>
        <SignIn />
      </SignedOut>
    </>,
  );
}) as AppType;

export default trpc.withTRPC(MyApp);
