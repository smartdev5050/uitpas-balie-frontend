import { useAuth } from "@/lib/auth";
import {
  useHandleWindowMessage,
  WindowMessageTypes,
} from "./useHandleWindowMessage";

export const useAuthChanged = () => {
  const { logout } = useAuth();

  useHandleWindowMessage({
    // [WindowMessageTypes.LOGIN]: () => {
    //   fetchToken();
    // },
    [WindowMessageTypes.LOGOUT]: () => {
      logout();
    },
  });
};
