import Image from "next/image";
import { useIsLoggedIn } from "@/lib/auth";
import { Stack } from "@/lib/ui";
import { Header, LogoLink, NavLink } from "./Navbar.Atoms";
import { useActiveCounter } from "@/feature-counter";
import { useSetActiveCounter } from "@/feature-counter/context/useSetActiveCounter";

export const Navbar = () => {
  // TODO: should be user
  const isLoggedIn = useIsLoggedIn();
  const counter = useActiveCounter();
  const setActiveCounter = useSetActiveCounter();

  // TODO: and balie selected
  if (!isLoggedIn || !counter) return null;

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
            Balie wijzigen
          </NavLink>
        </Stack>
        <div>Afmelden</div>
      </Stack>
    </Header>
  );
};
