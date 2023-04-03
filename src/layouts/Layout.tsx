import { FC, PropsWithChildren } from "react";
import { Box } from "@/lib/ui";
import { useSetCounterInAngular, useUrlChanged } from "@/feature-legacy";
import { Navbar } from "@/layouts/components/Navbar";

export const Layout: FC<PropsWithChildren> = ({ children }) => {
  useUrlChanged();
  useSetCounterInAngular();

  return (
    <Box height="100vh" width="100vw" overflow="hidden">
      <Navbar />
      {children}
    </Box>
  );
};
