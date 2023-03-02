const { i18n } = require("./next-i18next.config");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n,
  publicRuntimeConfig: {
    legacyAppUrl: process.env.NEXT_PUBLIC_LEGACY_APP_URL,
  },
};

module.exports = nextConfig;
