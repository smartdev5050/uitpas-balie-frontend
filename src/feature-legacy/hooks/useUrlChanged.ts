import { useRouter } from "next/router";
import {
  useHandleWindowMessage,
  WindowMessageTypes,
} from "./useHandleWindowMessage";

export const useUrlChanged = () => {
  const { asPath, ...router } = useRouter();

  useHandleWindowMessage({
    [WindowMessageTypes.URL_CHANGED]: ({ payload }) => {
      const url = new URL(
        `${window.location.protocol}//${window.location.host}${payload?.path}`
      );
      const query = Object.fromEntries(url.searchParams.entries());
      router.push({ pathname: url.pathname, query });
    },
    [WindowMessageTypes.HTTP_ERROR_CODE]: ({ payload }) => {
      if ([401, 403].includes(payload?.code as number)) {
        console.log("TODO");
        // removeAuthenticationCookies();
        // router.push('/login');
      }
    },
  });
};
