// This file sets a custom webpack configuration to use your Next.js app
// with Sentry.
// https://nextjs.org/docs/api-reference/next.config.js/introduction
// https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { withSentryConfig } = require('@sentry/nextjs');

// @ts-check
/* eslint-disable @typescript-eslint/no-var-requires */
const { env } = require('./src/server/env');

/**
 * Don't be scared of the generics here.
 * All they do is to give us autocompletion when using this.
 *
 * @template {import('next').NextConfig} T
 * @param {T} config - A generic parameter that flows through to the return type
 * @constraint {{import('next').NextConfig}}
 */
function getConfig(config) {
  return config;
}

/**
 * @link https://nextjs.org/docs/api-reference/next.config.js/introduction
 */
const nextConfig = getConfig({
  async rewrites() {
    return [
      {
        source: '/hrat/:tournamentId*',
        destination: '/play/:tournamentId*',
      },
      {
        source: '/vysledky/:tournamentId*',
        destination: '/ranking/:tournamentId*',
      },
    ];
  },
  publicRuntimeConfig: {
    NODE_ENV: env.NODE_ENV,
  },
  env: {
    CLERK_JWK_URI: process.env.CLERK_JWK_URI ?? 'nothing',
  },
  /** We run eslint as a separate task in CI */
  eslint: { ignoreDuringBuilds: !!process.env.CI },
  images: {
    domains: ['res.cloudinary.com'],
  },
});

module.exports = withSentryConfig(nextConfig, { silent: true }, { hideSourcemaps: true });
