"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import {
  useHandleWindowMessage,
  WindowMessageTypesReceived,
} from "./useHandleWindowMessage";

// Keep track of which paths were not found. Do not store as a single boolean
// for the current path, because it's possible to navigate from a 404 path to
// another page that's handled by this same Fallback component and then the
// boolean notFound state would not update.
export const useNotFoundPaths = () => {
  const asPath = usePathname();

  const [notFoundPaths, setNotFoundPaths] = useState<string[]>([]);

  useHandleWindowMessage({
    [WindowMessageTypesReceived.URL_UNKNOWN]: () =>
      setNotFoundPaths([asPath, ...notFoundPaths]),
  });

  return notFoundPaths.includes(asPath);
};
