import Image from "next/image";
import { useTranslation } from "next-i18next";
import { Stack, Typography, Button } from "@/lib/ui";
import { useUserInfo } from "@/lib/user";
import { useLogout } from "@/lib/auth";
import { useActiveCounter, useSetActiveCounter } from "@/feature-counter";
import { Header, LogoLink, NavLink } from "./Navbar.Atoms";
import { CounterMenu } from "./CounterMenu";

export const Navbar = () => {
  const { t } = useTranslation();
  const userInfo = useUserInfo();
  const counter = useActiveCounter();
  const setActiveCounter = useSetActiveCounter();
  const logout = useLogout();

  if (!userInfo || !counter) return null;

  return (
    <Header sx={{zIndex:1}}>
      <Stack direction="row" justifyContent="space-between" width="100%" px={1}>
        <Stack direction="row" alignItems="center" spacing={2}>
          <LogoLink href="/">
            <Image
              src="images/svg/logo-uitpas.svg"
              width="90"
              height="25"
              alt="Logo UiTPAS"
            />
          </LogoLink>
          <CounterMenu name={counter.name} />
          <NavLink
            href="/counters"
            onClick={(e) => {
              e.preventDefault();
              setActiveCounter(null);
            }}
          >
            {t("counter.changeCounter")}
          </NavLink>
        </Stack>
        <Stack direction="row" alignItems="center" spacing={2}>
          <Typography
            level="body2"
            sx={(theme) => ({ color: theme.vars.palette.neutral[200] })}
          >
            {t("login.loggedInAs", { name: userInfo.nickname })}
          </Typography>
          <Button
            variant="outlined"
            color="neutral"
            sx={{ py: "5px", px: "24px", fontSize: "13px" }}
            size="sm"
            onClick={logout}
          >
            {t("login.logoutBtn")}
          </Button>
        </Stack>
      </Stack>
    </Header>
  );
};
