import { useRouter } from "next/router";
import {
  useHandleWindowMessage,
  WindowMessageTypesReceived,
} from "./useHandleWindowMessage";
import getConfig from "next/config";
import { useLogout } from "@/lib/auth";

export const useUrlChanged = () => {
  const { asPath, ...router } = useRouter();
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
        `${window.location.protocol}//${window.location.host}/${pathWithoutLegacyPrefix}`
      );
      const query = Object.fromEntries(url.searchParams.entries());

      if (publicRuntimeConfig.Routes.includes(url.pathname)) {
        router.push({ pathname: url.pathname, query });
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
