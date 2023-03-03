import { FC, PropsWithChildren } from "react";
import { Box } from "@/lib/ui";
import { useUrlChanged } from "@/feature-legacy";

export const Layout: FC<PropsWithChildren> = ({ children }) => {
  useUrlChanged();

  return <Box height="100vh">{children}</Box>;
};
