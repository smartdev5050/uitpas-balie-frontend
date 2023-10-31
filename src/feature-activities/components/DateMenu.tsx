import { MenuUnstyled } from "@mui/base";
import {
  Popper,
  StyledDateItem,
  StyledListbox,
  TriggerButton,
  StyledDivider,
} from "./DateMenu.styles";
import { useTranslation } from "react-i18next";
import { useMenu } from "@/lib/utils";
import { useState, isValidElement, Fragment } from "react";
import Icon from "@mdi/react";
import { mdiMenuDown } from "@mdi/js";
import { StyledMenuItem } from "@/layouts/components/Navbar.styles";
import { Stack, Typography } from "@/lib/ui";

type menuItem = {
  display: string | JSX.Element;
  value?: string;
};

const menuItems: menuItem[] = [
  {
    display: "activities.dateMenu.today",
    value: "today",
  },
  {
    display: "activities.dateMenu.next7Days",
    value: "next7Days",
  },
  {
    display: "activities.dateMenu.next30Days",
    value: "next30Days",
  },
  {
    display: "activities.dateMenu.next12Months",
    value: "next12Months",
  },
  {
    display: "activities.dateMenu.unlimited",
    value: "unlimited",
  },
  {
    display: <StyledDivider />,
  },
  {
    display: "activities.dateMenu.pastActivities",
    value: "pastActivities",
  },
  {
    display: "activities.dateMenu.chooseDate",
    value: "chooseDate",
  },
];

type DateMenuProps = {
  handleQuery: (queryKey: string, queryValue: string) => void;
  defaultRange?: string;
  disabled: boolean;
};

export const DateMenu = ({
  handleQuery,
  defaultRange,
  disabled,
}: DateMenuProps) => {
  const { t } = useTranslation();
  const {
    menuActions,
    isOpen,
    menuAnchorEl,
    buttonRef,
    onButtonClick,
    onClose,
  } = useMenu();
  const [currentItem, setCurrentItem] = useState<menuItem>(
    menuItems.find((item) => item.value === defaultRange) ?? menuItems[3]
  );

  const handleItemClick = (item: menuItem) => {
    setCurrentItem(item);
    handleQuery("range", item.value!);
    onClose();
  };

  return (
    <Stack sx={{ width: { md: "50%" } }}>
      <Typography level="body2">
        <strong> {t("activities.dateRange")}</strong>
      </Typography>

      <Stack direction="row">
        <TriggerButton
          type="button"
          active={false}
          onClick={onButtonClick}
          ref={buttonRef}
          disabled={disabled}
        >
          {typeof currentItem.display === "string" && t(currentItem.display)}
        </TriggerButton>
        <TriggerButton
          type="button"
          active={isOpen}
          onClick={() => buttonRef.current?.click()}
          sx={{ px: 0 }}
          disabled={disabled}
        >
          <Icon path={mdiMenuDown} size={1} />
        </TriggerButton>
      </Stack>

      <MenuUnstyled
        actions={menuActions}
        open={isOpen}
        onClose={onClose}
        anchorEl={menuAnchorEl}
        slots={{ root: Popper, listbox: StyledListbox }}
        slotProps={{
          root: { placement: "bottom-start" },
        }}
      >
        {menuItems.map((item, i) =>
          isValidElement(item.display) ? (
            <Fragment key={`menu-item-${i}`}>{item.display}</Fragment>
          ) : (
            typeof item.display === "string" && (
              <StyledMenuItem
                key={item.value}
                onClick={() => handleItemClick(item)}
              >
                <StyledDateItem>{t(item.display)}</StyledDateItem>
              </StyledMenuItem>
            )
          )
        )}
      </MenuUnstyled>
    </Stack>
  );
};
