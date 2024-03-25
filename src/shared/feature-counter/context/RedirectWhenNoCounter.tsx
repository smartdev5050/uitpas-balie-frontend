import { FC, PropsWithChildren, useEffect } from "react";
import { useIsLoggedIn } from "../../lib/auth";
import { Counter } from "./CounterContext";
import { usePathname, useRouter } from "next/navigation";

const COUNTER_PATH = "/counters";
const APP_PATH = "/";

export const RedirectWhenNoCounter: FC<
  PropsWithChildren<{ counter: Counter; clearCounter: () => void }>
> = ({ children, counter, clearCounter }) => {
  const isLoggedIn = useIsLoggedIn();
  const { push } = useRouter();
  const asPath = usePathname();

  const shouldRedirectToCounters = Boolean(
    isLoggedIn && !counter && asPath !== COUNTER_PATH
  );
  const shouldRedirectToApp = Boolean(
    isLoggedIn && counter && asPath === COUNTER_PATH
  );

  useEffect(() => {
    if (shouldRedirectToCounters) {
      push(COUNTER_PATH);
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
