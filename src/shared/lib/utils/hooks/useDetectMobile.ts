"use client";

import { usePathname, useRouter } from "next/navigation";
import { useMediaQuery, useTheme } from "@mui/material";
import { useEffect } from "react";
import { getConfig } from "@/shared/lib/utils/getConfig";

export enum DEVICE {
  mobile = "mobile",
  web = "web",
  pending = "pending",
}

export const useDetectMobile = () => {
  const { publicRuntimeConfig } = getConfig();
  const disableMobile = publicRuntimeConfig.blacklist.includes("mobile");
  const path = usePathname();
  const { replace } = useRouter();
  const theme = useTheme();
  const isMobileScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isMobilePath = path.startsWith("/mobile");

  const shouldRedirectToMobile = isMobilePath && !isMobileScreen;
  const shouldRedirectToWeb = !isMobilePath && isMobileScreen;

  useEffect(() => {
    if (shouldRedirectToMobile && !disableMobile) {
      replace(path.replace("/mobile", ""));
    } else if (shouldRedirectToWeb) {
      replace(`/mobile${path}`);
    }
  }, [path, isMobilePath, isMobileScreen]);

  return shouldRedirectToMobile || shouldRedirectToWeb
    ? DEVICE.pending
    : isMobilePath
    ? disableMobile
      ? DEVICE.web
      : DEVICE.mobile
    : DEVICE.web;
};
