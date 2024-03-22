"use client";

import { NoSsr } from "@mui/base";
import { useLegacyPath } from "../hooks/useLegacyPath";
import { useNotFoundPaths } from "../hooks/useNotFoundPaths";
import { useAuthChanged } from "../hooks/useAuthChanged";
import { IFrame } from "./IFrame";

export const FallbackPage = () => {
  const legacyPath = useLegacyPath();
  const pathNotFound = useNotFoundPaths();
  useAuthChanged();

  if (pathNotFound) return <div>404 page not found</div>;

  return (
    <NoSsr>
      <IFrame url={legacyPath} />
    </NoSsr>
  );
};
