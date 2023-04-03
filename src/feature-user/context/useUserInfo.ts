import { useContext } from "react";
import { UserContext } from "@/feature-user/context/UserContext";

export const useUserInfo = () => {
  const { user } = useContext(UserContext);
  return user;
};
