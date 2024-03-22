type PublicRuntimeConfig = {
  legacyAppUrl: string;
  basePath: string;
  legacyApiPath: string;
  apiPaths: Record<string, string>;
  Routes: string[];
  uitInVlaanderenUrl: string;
  uitInDatabankUrl: string;
  oauthPath: string;
  oauthUserInfoPath: string;
  legacyTokenEndpoint: string;
  legacyLogoutEndpoint: string;
  blacklist: string;
};

const publicRuntimeConfig = JSON.parse(
  process.env.NEXT_PUBLIC_RUNTIME_CONFIG || ""
);

export const getConfig = (): { publicRuntimeConfig: PublicRuntimeConfig } => {
  return {
    publicRuntimeConfig,
  };
};
