import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useSilexLogout = () => {
  const { refetch } = useQuery<{ data: { token: string } }>(
    ["logout"],
    () => {
      const tokenEndpoint = process.env["NEXT_PUBLIC_LEGACY_LOGOUT_ENDPOINT"];
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
