import type { NextPage } from 'next';
import type { AppType, AppProps } from 'next/app';
import type { ReactElement, ReactNode } from 'react';
import { DefaultLayout } from '~/layouts/DefaultLayout';
import styles from './../styles/global.module.css';
import './../styles/global.css';
import { trpc } from '~/utils/trpc';
import { ClerkProvider } from '@clerk/nextjs';
import { localization } from '~/components/clerk/localization';
import createEmotionCache from '~/createEmotionCache';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme, { fira } from '~/theme';

export type NextPageWithLayout<
  TProps = Record<string, unknown>,
  TInitialProps = TProps,
> = NextPage<TProps, TInitialProps> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

export type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
  emotionCache?: EmotionCache;
};

const clientSideEmotionCache = createEmotionCache();

const MyApp = (({
  Component,
  pageProps,
  emotionCache = clientSideEmotionCache,
}: AppPropsWithLayout) => {
  // const getLayout =
  //   Component.getLayout ??
  //   ((page) => (
  //     <div className={styles.app}>
  //       <DefaultLayout>{page}</DefaultLayout>
  //     </div>
  //   ));

  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={theme}>
        <ClerkProvider {...pageProps} localization={localization}>
          <CssBaseline />
          <DefaultLayout>
            <Component {...pageProps} />
          </DefaultLayout>
        </ClerkProvider>
      </ThemeProvider>
    </CacheProvider>
  );
}) as AppType;

export default trpc.withTRPC(MyApp);
