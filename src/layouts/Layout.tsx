import { FC, PropsWithChildren } from "react";
import { Box } from "@/web/lib/ui";
import { useSetCounterInAngular, useUrlChanged } from "@/web/feature-legacy";
import { Navbar } from "@/layouts/components/Navbar";
import { useUserInfo } from "@/shared/lib/user";
import { useCounter } from "@/shared/feature-counter/context/useCounter";

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
