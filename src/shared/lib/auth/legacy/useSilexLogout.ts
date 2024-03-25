import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { getConfig } from "@/shared/lib/utils/getConfig";

export const useSilexLogout = () => {
  const { publicRuntimeConfig } = getConfig();

  const { refetch } = useQuery<{ data: { token: string } }>(
    ["logout"],
    () => {
      const tokenEndpoint = publicRuntimeConfig.legacyLogoutEndpoint;
      if (!tokenEndpoint)
        throw new Error(
          'Required env variable "NEXT_PUBLIC_LEGACY_LOGOUT_ENDPOINT" not set.'
        );

      return axios.get(tokenEndpoint, {
        withCredentials: true,
        headers: {
          Authorization: null,
        },
      });
    },
    {
      enabled: false,
    }
  );

  return refetch;
};
