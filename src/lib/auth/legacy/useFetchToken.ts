import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { getConfig } from "@/lib/utils/getConfig";

export const useFetchToken = () => {
  const { publicRuntimeConfig } = getConfig();

  const { data, refetch, remove } = useQuery<{ data: { token: string } }>(
    ["token"],
    () => {
      const tokenEndpoint = publicRuntimeConfig.legacyTokenEndpoint;
      if (!tokenEndpoint)
        throw new Error(
          'Required env variable "NEXT_PUBLIC_LEGACY_TOKEN_ENDPOINT" not set.'
        );

      return axios.get(tokenEndpoint, { withCredentials: true });
    },
    {
      enabled: false,
      // cacheTime relates to the expiration of a specific value, while staleTime will be expiring the validity of a certain query.
      cacheTime: 1000, // 1 second
      staleTime: 1000, // 1 second
    }
  );

  const token = data?.data.token;

  return {
    token,
    fetchToken: refetch,
    removeToken: remove,
  };
};
