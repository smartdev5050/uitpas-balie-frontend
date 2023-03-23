import { useEffect } from "react";
import { useAuth, useFetchToken } from "@/lib/auth";
import {
  useHandleWindowMessage,
  WindowMessageTypes,
} from "./useHandleWindowMessage";

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
