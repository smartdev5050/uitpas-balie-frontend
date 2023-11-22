import { useAuth } from "@/lib/auth";
import {
  useHandleWindowMessage,
  WindowMessageTypesReceived,
} from "./useHandleWindowMessage";

export const useAuthChanged = () => {
  const { logout } = useAuth();

  useHandleWindowMessage({
    // [WindowMessageTypes.LOGIN]: () => {
    //   fetchToken();
    // },
    [WindowMessageTypesReceived.LOGOUT]: () => {
      logout();
    },
  });
};
