import { getConfig } from "@/shared/lib/utils/getConfig";
import { usePathname } from "next/navigation";

export const useIsBlacklisted = (): boolean => {
  const pathname = usePathname();

  const { publicRuntimeConfig } = getConfig();

  if (!publicRuntimeConfig.blacklist) return false;

  const blacklistedPages = (
    publicRuntimeConfig.blacklist.split(",") as string[]
  ).map((page) => `/${page.trim()}`);

  return blacklistedPages.includes(pathname);
};
