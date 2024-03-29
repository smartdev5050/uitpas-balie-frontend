"use client";

import { MobileNavBar } from "@/mobile/layouts";
import { Stack } from "@mui/material";
import { SearchInput, Typography } from "@/mobile/lib/ui";
import { useTranslation } from "@/shared/lib/i18n/client";
import { Organizer, OrganizerPermissions } from "@/shared/lib/dataAccess";
import { OutlinedButton } from "@/mobile/lib/ui/uitpas/OutlinedButton";
import { Counter } from "@/shared/feature-counter/context/CounterContext";
import { ChangeEvent } from "react";

type CounterPickerProps = {
  counters: OrganizerPermissions[];
  prevCounter: Counter;
  onSearch: (e: ChangeEvent<HTMLInputElement>) => void;
  onCounterClick: (organizer: Organizer) => () => void;
  searchString: string;
};

export const CounterPicker = ({
  counters,
  prevCounter,
  onSearch,
  onCounterClick,
  searchString,
}: CounterPickerProps) => {
  const { t } = useTranslation();

  return (
    <MobileNavBar>
      <Stack
        sx={(theme) => ({
          height: "calc(100vh - 46px)",
          width: "100%",
          padding: "26px 16px 0 16px",
          rowGap: 3,
        })}
      >
        <Typography variant="h1">
          {t("counter.mobile.selectCounter")}
        </Typography>
        {counters.length >= 10 && (
          <SearchInput
            placeholder={t("counter.mobile.searchCounter")}
            onChange={onSearch}
          />
        )}
        {counters.length === 0 && searchString ? (
          <Typography>
            {t("counter.mobile.noCounterSearch", { searchTerm: searchString })}
          </Typography>
        ) : (
          <>
            {prevCounter && (
              <>
                <Typography variant="h1">
                  {t("counter.mobile.lastUsed")}
                </Typography>
                <OutlinedButton onClick={onCounterClick(prevCounter)}>
                  {prevCounter.name}
                </OutlinedButton>
              </>
            )}
            <Typography variant="h1">
              {t("counter.mobile.otherCounters")}
            </Typography>
            <Stack
              gap="12px"
              sx={{
                overflowY: "scroll",
                "::-webkit-scrollbar": {
                  display: "none",
                },
                scrollbarWidth: "none",
                msOverflowStyle: "none",
                pb: 1,
              }}
            >
              {counters.map((counter) => (
                <>
                  <OutlinedButton
                    key={counter.organizer.id}
                    onClick={onCounterClick(counter.organizer)}
                  >
                    {counter.organizer.name}
                  </OutlinedButton>
                </>
              ))}
            </Stack>
          </>
        )}
      </Stack>
    </MobileNavBar>
  );
};
