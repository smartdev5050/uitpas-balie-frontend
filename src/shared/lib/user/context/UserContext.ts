"use client";

import { createContext } from "react";
import { UserInfo } from "@/shared/lib/dataAccess";

export const UserContext = createContext<{ user: UserInfo | null }>({
  user: null,
});
