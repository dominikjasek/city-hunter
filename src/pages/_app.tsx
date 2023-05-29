import type { NextPage } from 'next';
import type { AppProps, AppType } from 'next/app';
import type { ReactElement, ReactNode } from 'react';
import { DefaultLayout } from '~/layouts/DefaultLayout';
import './../styles/global.css';
import { trpc } from '~/utils/trpc';
import { ClerkProvider } from '@clerk/nextjs';
import { localization } from '~/utils/clerk/localization';
import createEmotionCache from '~/createEmotionCache';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from '~/theme';
import { DialogProvider } from '~/components/contexts/DialogProvider';
import { Analytics as VercelAnalytics } from '@vercel/analytics/react';
import 'nprogress/nprogress.css';
import { usePageLoader } from '~/hooks/use-page-loader';
import { useRouter } from 'next/router';

export type NextPageWithLayout<TProps = Record<string, unknown>, TInitialProps = TProps> = NextPage<
  TProps,
  TInitialProps
> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

export type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
  emotionCache?: EmotionCache;
};

const clientSideEmotionCache = createEmotionCache();

const MyApp = (({ Component, pageProps, emotionCache = clientSideEmotionCache }: AppPropsWithLayout) => {
  usePageLoader();
  const { push } = useRouter();

  return (
    <>
      <VercelAnalytics />
      <CacheProvider value={emotionCache}>
        <ThemeProvider theme={theme}>
          <ClerkProvider
            {...pageProps}
            localization={localization}
            publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
            navigate={(to) => push(to)}
          >
            <CssBaseline />
            <DialogProvider>
              <DefaultLayout>
                <Component {...pageProps} />
              </DefaultLayout>
            </DialogProvider>
          </ClerkProvider>
        </ThemeProvider>
      </CacheProvider>
    </>
  );
}) as AppType;

export default trpc.withTRPC(MyApp);
