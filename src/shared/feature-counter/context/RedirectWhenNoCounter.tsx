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
  }>
> = ({ counterPath, children, counter, clearCounter }) => {
  const isLoggedIn = useIsLoggedIn();
  const { push } = useRouter();
  const asPath = usePathname();

  const shouldRedirectToCounters = Boolean(
    isLoggedIn && !counter && asPath !== counterPath
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
