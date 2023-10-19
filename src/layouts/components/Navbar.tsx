import Image from "next/image";
import { useTranslation } from "next-i18next";
import { Button, Stack, Typography } from "@/lib/ui";
import { useUserInfo } from "@/lib/user";
import { useLogout } from "@/lib/auth";
import { useCounter } from "@/feature-counter";
import { Header, LogoLink, NavLink } from "./Navbar.styles";
import { CounterMenu } from "./CounterMenu";
import { getAssetUrl } from "@/lib/utils";

export const Navbar = () => {
  const { t } = useTranslation();
  const userInfo = useUserInfo();
  const { activeCounter, setActiveCounter, setLastCounterUsed } = useCounter();
  const logout = useLogout();

  if (!userInfo || !activeCounter) return null;

  return (
    <Header sx={{ zIndex: 1 }}>
      <Stack direction="row" justifyContent="space-between" width="100%" px={1}>
        <Stack direction="row" alignItems="center" spacing={2}>
          <LogoLink href="/">
            <Image
              src={getAssetUrl(`images/svg/logo-uitpas.svg`)}
              width="90"
              height="25"
              alt="Logo UiTPAS"
            />
          </LogoLink>
          <CounterMenu name={activeCounter.name} />
          <NavLink
            href="/counters"
            onClick={(e) => {
              e.preventDefault();
              setLastCounterUsed(activeCounter);
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
