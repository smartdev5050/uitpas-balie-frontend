import { useAuth } from "./useAuth";

export const useIsLoggedIn = () => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated;
};
