"use client";

import { FC, PropsWithChildren, useEffect } from "react";
import { useGetUserInfo } from "@/shared/lib/dataAccess";
import { useIsLoggedIn } from "@/shared/lib/auth";
import { UserContext } from "./UserContext";

export const UserProvider: FC<PropsWithChildren> = ({ children }) => {
  const isLoggedIn = useIsLoggedIn();
  const { data, remove } = useGetUserInfo({ enabled: isLoggedIn });

  useEffect(() => {
    // When logged out, remove the user info
    if (!isLoggedIn) remove();
  }, [remove, isLoggedIn]);

  // When the user is loggedIn, we should wait for the user info
  if (isLoggedIn && !data?.data) return null;

  return (
    <UserContext.Provider value={{ user: data?.data ?? null }}>
      {children}
    </UserContext.Provider>
  );
};
