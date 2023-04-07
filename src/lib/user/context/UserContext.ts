import { createContext } from "react";
import { UserInfo } from "@/lib/dataAccess";

export const UserContext = createContext<{ user: UserInfo | null }>({
  user: null,
});
