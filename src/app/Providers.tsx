"use client";

import { PropsWithChildren, useEffect } from "react";
import { DEVICE, useDetectMobile } from "@/lib/utils";
import { MobileProviders } from "@/app/MobileProviders";
import { WebProviders } from "@/app/WebProviders";
import { openSansFont } from "@/lib/ui";
import { poppinsFont } from "@/mobile/lib/ui";

export function Providers({ children }: PropsWithChildren) {
  const device = useDetectMobile();

  useEffect(() => {
    document.body.className =
      device === DEVICE.mobile
        ? [poppinsFont.variable, poppinsFont.className].join(" ")
        : [openSansFont.variable, openSansFont.className].join(" ");
  }, [device]);

  if (device === DEVICE.mobile)
    return <MobileProviders>{children}</MobileProviders>;
  if (device === DEVICE.web) return <WebProviders>{children}</WebProviders>;

  return null;
}
