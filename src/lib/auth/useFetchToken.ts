import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useFetchToken = () => {
  const { data, refetch } = useQuery<{ data: { token: string } }>(
    ["token"],
    () => {
      const tokenEndpoint = process.env["NEXT_PUBLIC_LEGACY_TOKEN_ENDPOINT"];
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
  };
};
