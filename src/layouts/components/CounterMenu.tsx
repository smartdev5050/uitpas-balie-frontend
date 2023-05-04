import Icon from "@mdi/react";
import { mdiMenuDown } from "@mdi/js";

import MenuUnstyled from "@mui/base/MenuUnstyled";
import { useMenu } from "@/lib/utils";
import {
  Popper,
  StyledLink,
  StyledListbox,
  StyledMenuItem,
  TriggerButton,
} from "@/layouts/components/Navbar.Atoms";
import { useTranslation } from "next-i18next";

const menuItems = [
  {
    label: "home",
    link: "/",
  },
  {
    label: "activities",
    link: "/activities",
  },
  {
    label: "counterMemberships",
    link: "/counter-memberships",
  },
  {
    label: "checkindevices",
    link: "/checkindevices",
  },
  {
    label: "expenseReport",
    link: "/expense-report",
  },
  {
    label: "counterStatistics",
    link: "/counter-statistics",
  },
];

type Props = {
  name?: string;
};
export const CounterMenu = ({ name }: Props) => {
  const { t } = useTranslation();
  const {
    menuActions,
    isOpen,
    menuAnchorEl,
    buttonRef,
    onButtonKeyDown,
    onButtonClick,
    onClose,
  } = useMenu();

  return (
    <>
      <TriggerButton
        type="button"
        onClick={onButtonClick}
        onKeyDown={onButtonKeyDown}
        ref={buttonRef}
        active={isOpen}
      >
        <span>{name}</span>
        <Icon path={mdiMenuDown} size={1} />
      </TriggerButton>

      <MenuUnstyled
        actions={menuActions}
        open={isOpen}
        onClose={onClose}
        anchorEl={menuAnchorEl}
        slots={{ root: Popper, listbox: StyledListbox }}
        slotProps={{ listbox: { id: "simple-menu" } }}
      >
        {menuItems.map((menuItem) => (
          <StyledMenuItem key={menuItem.link}>
            <StyledLink href={menuItem.link}>
              {t(`nav.${menuItem.label}`)}
            </StyledLink>
          </StyledMenuItem>
        ))}
      </MenuUnstyled>
    </>
  );
};
