const { i18n } = require("./next-i18next.config");
const getPathsFromFolderStructure = require("./src/getPathsFromFolderStructure");

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "/app";

const paths = getPathsFromFolderStructure("./src/app");

process.env.NEXT_PUBLIC_RUNTIME_CONFIG = JSON.stringify({
  legacyAppUrl: process.env.NEXT_PUBLIC_LEGACY_APP_URL,
  basePath,
  legacyApiPath: process.env.NEXT_PUBLIC_LEGACY_API_PATH,
  apiPaths: {
    NEXT_PUBLIC_API_PATH: process.env.NEXT_PUBLIC_API_PATH,
    NEXT_PUBLIC_SEARCH_API_PATH: process.env.NEXT_PUBLIC_SEARCH_API_PATH,
  },
  Routes: paths.map((path) => `/${path}`),
  uitInVlaanderenUrl: process.env.NEXT_PUBLIC_UITINVLAANDEREN_URL,
  uitInDatabankUrl: process.env.NEXT_PUBLIC_UITDATABANK_URL,
  oauthPath: process.env.NEXT_PUBLIC_OAUTH_PATH,
  oauthUserInfoPath: process.env.NEXT_PUBLIC_OAUTH_USERINFO_PATH,
  legacyTokenEndpoint: process.env.NEXT_PUBLIC_LEGACY_TOKEN_ENDPOINT,
  legacyLogoutEndpoint: process.env.NEXT_PUBLIC_LEGACY_LOGOUT_ENDPOINT,
  blacklist: process.env.NEXT_PUBLIC_BLACKLIST,
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n,
  basePath,
};

module.exports = nextConfig;
