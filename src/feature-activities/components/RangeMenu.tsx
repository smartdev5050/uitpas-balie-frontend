import { MenuUnstyled } from "@mui/base";
import {
  Popper,
  StyledDateItem,
  StyledListbox,
  StyledDivider,
} from "./DateMenu.styles";
import { useTranslation } from "react-i18next";
import {
  DATE_FORMAT_SEPARATED_FNS,
  dateToISODateString,
  useMenu,
} from "@/lib/utils";
import { useState, isValidElement, Fragment } from "react";
import { StyledMenuItem } from "@/layouts/components/Navbar.styles";
import { DateInput, Stack, Typography } from "@/lib/ui";
import { usePaginationQuery } from "@/lib/utils/hooks/usePaginationQuery";
import { TDateSelection } from "@/lib/utils/dateUtils";
import { RangeMenuButton } from "@/feature-activities/components/RangeMenuButton";
import { useRouter, useSearchParams } from "next/navigation";

export type rangeMenuItem = {
  display: string | JSX.Element;
  value?: keyof typeof TDateSelection;
};

const rangeMenuItems: rangeMenuItem[] = [
  {
    display: "activities.rangeMenu.today",
    value: "today",
  },
  {
    display: "activities.rangeMenu.next7Days",
    value: "next7days",
  },
  {
    display: "activities.rangeMenu.next30Days",
    value: "next30Days",
  },
  {
    display: "activities.rangeMenu.next12Months",
    value: "next12Months",
  },
  {
    display: "activities.rangeMenu.unlimited",
    value: "unlimited",
  },
  {
    display: <StyledDivider />,
  },
  {
    display: "activities.rangeMenu.pastActivities",
    value: "pastActivities",
  },
  {
    display: "activities.rangeMenu.chooseDate",
    value: "chooseDate",
  },
];

type RangeMenuProps = {
  defaultRange?: string;
  disabled: boolean;
};

export const RangeMenu = ({ defaultRange, disabled }: RangeMenuProps) => {
  const { t } = useTranslation();
  const router = useRouter();
  const searchParams = useSearchParams();
  const {
    menuActions,
    isOpen,
    menuAnchorEl,
    buttonRef,
    onButtonClick,
    onClose,
  } = useMenu();
  const { handleQuery } = usePaginationQuery();
  const [currentItem, setCurrentItem] = useState<rangeMenuItem>(
    rangeMenuItems.find((item) => item.value === defaultRange) ??
      rangeMenuItems[3]
  );
  const [customDateRanges, setCustomDateRanges] = useState<{
    from: string;
    to: string;
  }>({
    from: searchParams.get("from")
      ? String(searchParams.get("from"))
      : dateToISODateString(new Date()),
    to: searchParams.get("to")
      ? String(searchParams.get("to"))
      : dateToISODateString(new Date()),
  });

  const handleItemClick = (item: rangeMenuItem) => {
    onClose(true);
    setCurrentItem(item);
    return handleQuery("range", item.value!);
  };

  const handleDateChange = (date: Date, rangeType: "from" | "to") => {
    const dateString = dateToISODateString(date);
    setCustomDateRanges((prev) => ({ ...prev, [rangeType]: dateString }));
    return handleQuery(rangeType, dateString);
  };

  return (
    <Stack sx={{ flex: 1 }}>
      {currentItem.value === "chooseDate" ? (
        <Stack
          sx={{
            flexDirection: { sm: "column", md: "row" },
            columnGap: 2,
            rowGap: 1,
            alignItems: { sm: "flex-start", md: "center" },
          }}
        >
          <RangeMenuButton
            {...{ currentItem, isOpen, onButtonClick, buttonRef, disabled }}
          />
          <Stack direction="row" gap={2}>
            <Stack>
              <Typography level="body2">
                <strong> {t("activities.startDate")}</strong>
              </Typography>
              <DateInput
                onChange={(date) => date && handleDateChange(date, "from")}
                selected={new Date(customDateRanges.from)}
                dateFormat={DATE_FORMAT_SEPARATED_FNS}
              />
            </Stack>
            <Stack>
              <Typography level="body2">
                <strong> {t("activities.endDate")}</strong>
              </Typography>
              <DateInput
                onChange={(date) => date && handleDateChange(date, "to")}
                selected={new Date(customDateRanges.to)}
                dateFormat={DATE_FORMAT_SEPARATED_FNS}
              />
            </Stack>
          </Stack>
        </Stack>
      ) : (
        <RangeMenuButton
          {...{ currentItem, isOpen, onButtonClick, buttonRef, disabled }}
        />
      )}

      <MenuUnstyled
        actions={menuActions}
        open={isOpen}
        onClose={() => onClose(false)}
        anchorEl={menuAnchorEl}
        slots={{ root: Popper, listbox: StyledListbox }}
        slotProps={{
          root: { placement: "bottom-start" },
        }}
      >
        {rangeMenuItems.map((item, i) =>
          isValidElement(item.display) ? (
            <Fragment key={`range-item-${i}`}>{item.display}</Fragment>
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
