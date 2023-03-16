import {
  useHandleWindowMessage,
  WindowMessageTypes,
} from "@/feature-legacy/hooks/useHandleWindowMessage";
import { useAuth } from "@/lib/auth";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";

export const useAuthChanged = () => {
  const { setAuthToken, logout } = useAuth();
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
      cacheTime: 0,
    }
  );

  const token = data?.data.token;

  useEffect(() => {
    if (token) {
      setAuthToken(token);
    } else {
      logout();
    }
  }, [token]);

  useHandleWindowMessage({
    [WindowMessageTypes.LOGIN]: () => {
      refetch();
    },
    [WindowMessageTypes.LOGOUT]: () => {
      logout();
    },
  });
};
