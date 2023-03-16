import { FC, PropsWithChildren, useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { AuthContext } from "./AuthContext";
import { addInterceptor, removeHeader, setHeaders } from "@/lib/dataAccess";

const LS_KEY = "@uitpas-balie/token";

export const AuthProvider: FC<PropsWithChildren> = () => {
  const { push, pathname } = useRouter();
  const [authTokenLoaded, setAuthTokenLoaded] = useState(false);

  const login = useCallback((token: string) => {
    // Init Axios
    setHeaders({ Authorization: `Bearer ${token}` });
    // Store token, so we're still logged in after refresh
    localStorage.setItem(LS_KEY, token);
    // Let the app know we're ready to render
    setAuthTokenLoaded(true);
  }, []);

  const logout = useCallback(() => {
    // Reset Axios
    removeHeader("Authorization");
    // Remove from local storage
    localStorage.removeItem(LS_KEY);
    // Auth token is not available
    setAuthTokenLoaded(false);
  }, []);

  const initAuth = useCallback(
    (token: string, redirectTo?: string) => {
      login(token);
      // Redirect to a specific path if necessary
      if (redirectTo) {
        push(redirectTo);
      }
    },
    [login, push]
  );

  useEffect(() => {
    // Add axios interceptor: Logout on 401
    addInterceptor((status: number) => {
      if (status === 401) {
        logout();
        // push({
        //   pathname: LOGIN_PATH,
        //   query: `next=${pathname}`,
        // });
      }
    });
  }, [pathname, push, logout]);

  return (
    <AuthContext.Provider
      value={{
        setAuthToken: initAuth,
        logout,
      }}
    />
  );
};
