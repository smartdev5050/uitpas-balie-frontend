import { useContext } from "react";
import { UserContext } from "./UserContext";

export const useUserInfo = () => {
  const { user } = useContext(UserContext);
  return user;
};
