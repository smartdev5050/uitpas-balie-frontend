import { MenuItemUnstyled, MenuUnstyled } from "@mui/base";
import { Popper, StyledListbox } from "./DateMenu.styles";
import { useTranslation } from "react-i18next";
import { Button } from "@mui/joy";
import { useMenu } from "@/lib/utils";

const menuItems = [
  {
    label: "activities.dateMenu.today",
    value: "today",
  },
  {
    label: "activities.dateMenu.next7Days",
    value: "next7Days",
  },
  {
    label: "activities.dateMenu.next30Days",
    value: "next30Days",
  },
  {
    label: "activities.dateMenu.next12Months",
    value: "next12Months",
  },
  {
    label: "activities.dateMenu.unlimited",
    value: "unlimited",
  },
  {
    label: "activities.dateMenu.pastActivities",
    value: "pastActivities",
  },
  {
    label: "activities.dateMenu.chooseDate",
    value: "chooseDate",
  },
];

export const DateMenu = () => {
  const { t } = useTranslation();
  const {
    menuActions,
    // isOpen,
    menuAnchorEl,
    buttonRef,
    onButtonKeyDown,
    onButtonClick,
    onClose,
  } = useMenu();

  const isOpen = true;

  return (
    <>
      <Button>menu</Button>
      <Button>icon</Button>
      <MenuUnstyled
        open={isOpen}
        // onClose={onClose}
        anchorEl={menuAnchorEl}
        slots={{ root: Popper, listbox: StyledListbox }}
        slotProps={{ root: { placement: "bottom-start" } }}
      >
        {menuItems.map((item) => (
          <MenuItemUnstyled key={item.value}>{t(item.label)}</MenuItemUnstyled>
        ))}
      </MenuUnstyled>
    </>
  );
};
