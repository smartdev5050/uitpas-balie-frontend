import getConfig from "next/config";
import { useRouter } from "next/router";
import { useMemo } from "react";
import { prefixWhenNotEmpty } from "@/lib/utils";

export const useLegacyPath = () => {
  const { publicRuntimeConfig } = getConfig();
  const {
    query: { param = [], ...queryWithoutParams },
    asPath,
  } = useRouter();

  return useMemo(() => {
    const path = new URL(`http://localhost${asPath}`).pathname;

    const queryString = prefixWhenNotEmpty(
      new URLSearchParams(queryWithoutParams as Record<string, string>),
      "?"
    );

    return `${publicRuntimeConfig.legacyAppUrl}${path}${queryString}`;
  }, [asPath, publicRuntimeConfig.legacyAppUrl, queryWithoutParams]);
};
