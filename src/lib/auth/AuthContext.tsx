import { createContext } from "react";

export const AuthContext = createContext<{
  setAuthToken: (token: string, redirectTo?: string) => void | null;
  logout: () => void | null;
}>({
  setAuthToken: () => null,
  logout: () => null,
});
