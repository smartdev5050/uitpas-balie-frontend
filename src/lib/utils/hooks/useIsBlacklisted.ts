import getConfig from "next/config";
import { usePathname } from "next/navigation";

export const useIsBlacklisted = () => {
  const pathname = usePathname();

  const { publicRuntimeConfig } = getConfig();

  const blacklistedPages = (
    publicRuntimeConfig.blacklist.split(",") as string[]
  ).map((page) => `/${page.trim()}`);

  return blacklistedPages.includes(pathname);
};
