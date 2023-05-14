// eslint-disable-next-line @typescript-eslint/no-var-requires
const { withSentryConfig } = require('@sentry/nextjs');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { withAxiom } = require('next-axiom');

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

module.exports = withAxiom(withSentryConfig(nextConfig, { silent: true }, { hideSourcemaps: true }));
