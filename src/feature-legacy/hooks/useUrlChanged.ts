import { useRouter } from "next/router";
import {
  useHandleWindowMessage,
  WindowMessageTypes,
} from "./useHandleWindowMessage";
import getConfig from "next/config";
import { useLogout } from "@/lib/auth";

export const useUrlChanged = () => {
  const { asPath, ...router } = useRouter();
  const logout = useLogout();

  const { publicRuntimeConfig } = getConfig();
  const legacyUrl = new URL(publicRuntimeConfig.legacyAppUrl);

  useHandleWindowMessage({
    [WindowMessageTypes.URL_CHANGED]: ({ payload }) => {
      const pathWithoutLegacyPrefix = `${payload?.path}`.replace(
        legacyUrl.pathname,
        ""
      );

      const url = new URL(
        `${window.location.protocol}//${window.location.host}${pathWithoutLegacyPrefix}`
      );
      const query = Object.fromEntries(url.searchParams.entries());

      router.push({ pathname: url.pathname, query });
    },
    [WindowMessageTypes.HTTP_ERROR_CODE]: ({ payload }) => {
      if ([401, 403].includes(payload?.code as number)) {
        logout();
      }
    },
  });
};
