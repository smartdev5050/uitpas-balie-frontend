import { FC, PropsWithChildren } from "react";
import { Box } from "@/lib/ui";
import { useSetCounterInAngular, useUrlChanged } from "@/feature-legacy";

export const Layout: FC<PropsWithChildren> = ({ children }) => {
  useUrlChanged();
  useSetCounterInAngular();

  return <Box height="100vh">{children}</Box>;
};
