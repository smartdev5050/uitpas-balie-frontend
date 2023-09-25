const { i18n } = require("./next-i18next.config");

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "/app";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n,
  basePath,
  publicRuntimeConfig: {
    legacyAppUrl: process.env.NEXT_PUBLIC_LEGACY_APP_URL,
    basePath,
    apiPath: process.env.NEXT_PUBLIC_API_PATH,
    oauthPath: process.env.NEXT_PUBLIC_OAUTH_PATH,
    oauthUserInfoPath: process.env.NEXT_PUBLIC_OAUTH_USERINFO_PATH,
    legacyTokenEndpoint: process.env.NEXT_PUBLIC_LEGACY_TOKEN_ENDPOINT,
    legacyLogoutEndpoint: process.env.NEXT_PUBLIC_LEGACY_LOGOUT_ENDPOINT,
  },
};

module.exports = nextConfig;
