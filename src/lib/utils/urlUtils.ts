import getConfig from "next/config";
import { getUuid } from "@/lib/utils";

export const getAssetUrl = (url: string): string => {
  const { publicRuntimeConfig } = getConfig();

  return `${publicRuntimeConfig.basePath ?? ""}/${url}`.replaceAll("//", "/");
};

export const getUitInVlaanderenUrl = (
  eventName: string,
  eventId: string
): string => {
  const { publicRuntimeConfig } = getConfig();
  const eventNameEncoded = eventName
    .replaceAll(" ", "-")
    .substring(0, 50)
    .toLowerCase();

  return `${
    publicRuntimeConfig.uitInVlaanderenUrl
  }/agenda/e/${eventNameEncoded}/${getUuid(eventId)}`;
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
