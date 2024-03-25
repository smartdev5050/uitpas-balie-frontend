import { useAuth } from "./useAuth";

export const useLogout = () => {
  const { logout } = useAuth();
  return logout;
};
