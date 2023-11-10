import { FC, PropsWithChildren } from "react";
import { Box } from "@/lib/ui";
import { useSetCounterInAngular, useUrlChanged } from "@/feature-legacy";
import { Navbar } from "@/layouts/components/Navbar";
import { useUserInfo } from "@/lib/user";
import { useCounter } from "@/feature-counter";

export const Layout: FC<PropsWithChildren> = ({ children }) => {
  const userInfo = useUserInfo();
  const { activeCounter: counter } = useCounter();
  useUrlChanged();
  useSetCounterInAngular();

  const renderNavBar = userInfo && counter;

  return (
    <Box height="100vh" width="100vw" overflow="hidden">
      {renderNavBar && <Navbar userInfo={userInfo} counter={counter} />}
      {children}
    </Box>
  );
};
