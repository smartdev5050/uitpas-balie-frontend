import { NoSsr } from "@mui/base";
import { useLegacyPath } from "@/feature-legacy/hooks/useLegacyPath";
import { IFrame } from "@/feature-legacy/components/IFrame";
import { useNotFoundPaths } from "@/feature-legacy/hooks/useNotFoundPaths";
import { useAuthChanged } from "@/feature-legacy/hooks/useAuthChanged";

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
