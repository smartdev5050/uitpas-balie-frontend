import {
  useHandleWindowMessage,
  WindowMessageTypes,
} from "@/feature-legacy/hooks/useHandleWindowMessage";
import { useAuth, useFetchToken } from "@/lib/auth";
import { useEffect } from "react";

export const useAuthChanged = () => {
  const { setAuthToken, logout } = useAuth();
  const { fetchToken, token } = useFetchToken();

  useEffect(() => {
    if (token) {
      setAuthToken(token);
    } else {
      logout();
    }
  }, [token, logout, setAuthToken]);

  useHandleWindowMessage({
    [WindowMessageTypes.LOGIN]: () => {
      fetchToken();
    },
    [WindowMessageTypes.LOGOUT]: () => {
      logout();
    },
  });
};
