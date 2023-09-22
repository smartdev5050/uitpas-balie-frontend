const { i18n } = require("./next-i18next.config");

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "/app";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n,
  basePath: process.env.NEXT_PUBLIC_BASE_PATH ?? basePath,
  publicRuntimeConfig: {
    legacyAppUrl: process.env.NEXT_PUBLIC_LEGACY_APP_URL,
    basePath,
  },
};

module.exports = nextConfig;
