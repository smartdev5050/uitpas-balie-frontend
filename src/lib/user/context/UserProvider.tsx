"use client";

import { useIsLoggedIn } from "@/lib/auth";
import { FC, PropsWithChildren, useEffect } from "react";
import { useGetUserInfo } from "@/lib/dataAccess";
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
