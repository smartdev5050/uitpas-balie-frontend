import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { getConfig } from "@/lib/utils/getConfig";

export type UserInfo = {
  email: string;
  email_verified: boolean;
  given_name: string;
  "https://public.be/first_name": string;
  "https://public.be/uitidv1id": string;
  name: string;
  nickname: string;
  picture: string;
  sub: string;
  updated_at: string;
};

type Props = {
  token?: string;
  enabled?: boolean;
};
export const useGetUserInfo = ({ token, enabled = true }: Props) => {
  const { publicRuntimeConfig } = getConfig();

  return useQuery(
    ["auth0", "userInfo"],
    () => {
      return axios.get<UserInfo>(publicRuntimeConfig.oauthUserInfoPath ?? "");
    },
    {
      enabled,
    }
  );
};
