import Image from "next/image";
import { Stack, Typography, Button } from "@/lib/ui";
import { useActiveCounter } from "@/feature-counter";
import { useSetActiveCounter } from "@/feature-counter/context/useSetActiveCounter";
import { useUserInfo } from "@/lib/user";
import { Header, LogoLink, NavLink } from "./Navbar.Atoms";
import { useTranslation } from "next-i18next";
import { useLogout } from "@/lib/auth";

export const Navbar = () => {
  const { t } = useTranslation();
  const userInfo = useUserInfo();
  const counter = useActiveCounter();
  const setActiveCounter = useSetActiveCounter();
  const logout = useLogout();

  if (!userInfo || !counter) return null;

  return (
    <Header>
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
          <NavLink href="/">{counter.name}</NavLink>
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
          <Typography variant="body2" sx={{ color: "grey.200" }}>
            {t("login.loggedInAs", { name: userInfo.nickname })}
          </Typography>
          <Button
            variant="outlined"
            sx={{ py: "5px", px: "24px", fontSize: "13px" }}
            onClick={logout}
          >
            {t("login.logoutBtn")}
          </Button>
        </Stack>
      </Stack>
    </Header>
  );
};
