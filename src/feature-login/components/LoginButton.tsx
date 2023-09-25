import { useSearchParams } from "next/navigation";
import { Button } from "@/lib/ui";
import { FC, PropsWithChildren } from "react";
import getConfig from "next/config";

export const LoginButton: FC<PropsWithChildren> = ({ children }) => {
  const search = useSearchParams();
  const { publicRuntimeConfig } = getConfig();

  const destination = /*"/app_v1"; */ search.get("redirectTo") ?? "/";
  const href = `${
    publicRuntimeConfig.oauthPath ?? "/"
  }?destination=${destination}`;

  return (
    <Button
      size="lg"
      component="a"
      href={href}
      variant="solid"
      // sx={{
      //   p: "10px 20px",
      //   fontSize: "18px",
      // }}
    >
      {children}
    </Button>
  );
};
