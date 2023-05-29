import * as Sentry from '@sentry/nextjs';
import * as SentryBrowser from '@sentry/browser';

const SENTRY_DSN = process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN;

Sentry.init({
  dsn: SENTRY_DSN,
  tracesSampleRate: 1.0,
  replaysOnErrorSampleRate: 1.0,
  integrations: [
    new SentryBrowser.Replay({
      maskAllText: false,
      blockAllMedia: false,
    }),
  ],
});
