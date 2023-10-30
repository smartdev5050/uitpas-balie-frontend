import { FC, PropsWithChildren } from "react";
import { Box } from "@/lib/ui";
import { useSetCounterInAngular, useUrlChanged } from "@/feature-legacy";
import { Navbar } from "@/layouts/components/Navbar";
import { useUserInfo } from "@/lib/user";
import { useCounter } from "@/feature-counter";
import { styled } from "@mui/joy";

export const Layout: FC<PropsWithChildren> = ({ children }) => {
  const userInfo = useUserInfo();
  const { activeCounter: counter } = useCounter();
  useUrlChanged();
  useSetCounterInAngular();

  const renderNavBar = userInfo && counter;

  const ChildrenWrapper = styled(Box)({
    paddingTop: renderNavBar ? 56.38 : 0,
  });

  return (
    <Box height="100vh" width="100vw" overflow="hidden">
      {renderNavBar && <Navbar userInfo={userInfo} counter={counter} />}
      <ChildrenWrapper>{children}</ChildrenWrapper>
    </Box>
  );
};
