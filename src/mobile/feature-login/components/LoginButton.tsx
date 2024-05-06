"use client";

import { getConfig } from "@/shared/lib/utils/getConfig";
import { useSearchParams } from "next/navigation";
import { Button } from "@/mobile/lib/ui";
import { ButtonProps } from "@mui/material";

export const LoginButton = ({ ...props }: ButtonProps) => {
  const { publicRuntimeConfig } = getConfig();
  const search = useSearchParams();

  const destination = search.get("redirectTo") ?? "/";
  const href = `${
    publicRuntimeConfig.oauthPath ?? "/"
  }?destination=${destination}`;

  return (
    <Button component="a" href={href} {...props}>
      {props.children}
    </Button>
  );
};
