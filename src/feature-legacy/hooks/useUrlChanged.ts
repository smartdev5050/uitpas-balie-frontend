"use client";

import { usePathname, useRouter } from "next/navigation";
import {
  useHandleWindowMessage,
  WindowMessageTypesReceived,
} from "./useHandleWindowMessage";
import { getConfig } from "@/shared/lib/utils/getConfig";
import { useLogout } from "../../shared/lib/auth";

function removeDoubleSlashesFromUrl(url: string): string {
  return url.replace(/([^:\/])\/\//g, "$1/");
}

export const useUrlChanged = () => {
  const asPath = usePathname();
  const router = useRouter();
  const logout = useLogout();

  const { publicRuntimeConfig } = getConfig();
  const legacyUrl = new URL(publicRuntimeConfig.legacyAppUrl);

  useHandleWindowMessage({
    [WindowMessageTypesReceived.URL_CHANGED]: ({ payload }) => {
      const pathWithoutLegacyPrefix = `${payload?.path}`.replace(
        legacyUrl.pathname,
        ""
      );

      const url = new URL(
        removeDoubleSlashesFromUrl(
          `${window.location.protocol}//${window.location.host}/${pathWithoutLegacyPrefix}`
        )
      );

      if (publicRuntimeConfig.Routes.includes(url.pathname)) {
        router.push(`${url.pathname}?${url.searchParams}`);
      } else {
        history.pushState(null, "", url.pathname + url.search);
      }
    },
    [WindowMessageTypesReceived.HTTP_ERROR_CODE]: ({ payload }) => {
      if ([401, 403].includes(payload?.code as number)) {
        logout();
      }
    },
  });
};
