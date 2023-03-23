import { useSearchParams } from "next/navigation";
import { Button } from "@/lib/ui";
import { FC, PropsWithChildren } from "react";

export const LoginButton: FC<PropsWithChildren> = ({ children }) => {
  const search = useSearchParams();

  const destination = search.get("redirectTo") ?? "/";
  const href = `${process.env["NEXT_PUBLIC_OAUTH_PATH"]}?destination=${destination}`;

  return (
    <Button
      as="a"
      href={href}
      sx={{
        p: "10px 20px",
        fontSize: "18px",
      }}
    >
      {children}
    </Button>
  );
};
