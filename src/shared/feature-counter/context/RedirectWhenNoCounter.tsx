import { FC, PropsWithChildren, useEffect } from "react";
import { useIsLoggedIn } from "../../lib/auth";
import { Counter } from "./CounterContext";
import { usePathname, useRouter } from "next/navigation";

const APP_PATH = "/";

export const RedirectWhenNoCounter: FC<
  PropsWithChildren<{
    counterPath: string;
    counter: Counter;
    clearCounter: () => void;
    whiteListedPages?: string | string[] | undefined;
  }>
> = ({ counterPath, children, counter, clearCounter, whiteListedPages }) => {
  const isLoggedIn = useIsLoggedIn();
  const { push } = useRouter();
  const asPath = usePathname();

  const shouldRedirectToCounters =
    whiteListedPages === undefined
      ? Boolean(isLoggedIn && !counter && asPath !== counterPath)
      : Array.isArray(whiteListedPages)
      ? Boolean(
          isLoggedIn &&
            !counter &&
            asPath !== counterPath &&
            !whiteListedPages.includes(asPath)
        )
      : Boolean(
          isLoggedIn &&
            !counter &&
            asPath !== counterPath &&
            asPath !== whiteListedPages
        );

  const shouldRedirectToApp = Boolean(
    isLoggedIn && counter && asPath === counterPath
  );

  useEffect(() => {
    if (shouldRedirectToCounters) {
      push(counterPath);
    }
  }, [shouldRedirectToCounters, push]);

  useEffect(() => {
    if (shouldRedirectToApp) {
      push(APP_PATH);
    }
  }, [shouldRedirectToApp, push]);

  useEffect(() => {
    if (!isLoggedIn) clearCounter();
  }, [isLoggedIn, clearCounter]);

  return shouldRedirectToCounters || shouldRedirectToApp ? null : (
    <>{children}</>
  );
};
