import getConfig from "next/config";

export const getAssetUrl = (url: string): string => {
  const { publicRuntimeConfig } = getConfig();

  return `${publicRuntimeConfig.basePath ?? ""}/${url}`.replaceAll("//", "/");
};
