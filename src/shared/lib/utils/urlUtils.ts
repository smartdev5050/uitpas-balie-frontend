import { getConfig } from "@/shared/lib/utils/getConfig";
import { getUuid } from "@/shared/lib/utils/index";

export const getAssetUrl = (url: string): string => {
  const { publicRuntimeConfig } = getConfig();

  return `${publicRuntimeConfig.basePath ?? ""}/${url}`.replaceAll("//", "/");
};

export const getUitInVlaanderenUrl = (
  eventName: string,
  eventId: string
): string => {
  const { publicRuntimeConfig } = getConfig();

  return `${publicRuntimeConfig.uitInVlaanderenUrl}/agenda/e/e/${getUuid(
    eventId
  )}`;
};

export const getUitInDatabankurl = (eventId: string): string => {
  const { publicRuntimeConfig } = getConfig();

  return `${publicRuntimeConfig.uitInDatabankUrl}/event/${getUuid(eventId)}`;
};

export const getQrCodeUrl = (eventId: string): string => {
  const { publicRuntimeConfig } = getConfig();

  return `${publicRuntimeConfig.legacyApiPath}/checkincodes/${getUuid(
    eventId
  )}/qr-spaarcode.zip`;
};
