import { NoSsr } from "@mui/base";
import { useLegacyPath } from "@/feature-legacy/hooks/useLegacyPath";
import { IFrame } from "@/feature-legacy/components/IFrame";
import { useNotFoundPaths } from "@/feature-legacy/hooks/useNotFoundPaths";

export const FallbackPage = () => {
  const legacyPath = useLegacyPath();
  const pathNotFound = useNotFoundPaths();

  if (pathNotFound) return <div>404 page not found</div>;

  return (
    <NoSsr>
      <IFrame url={legacyPath} />
    </NoSsr>
  );
};
