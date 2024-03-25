"use client";

import { Organizer, OrganizerPermissions } from "@/shared/lib/dataAccess";
import { Card, CardContent } from "@/web/lib/ui";
import { useCounter } from "@/shared/feature-counter/context/useCounter";
import { CounterPickerData } from "./CounterPickerData";
import { LastCounterData } from "./LastCounterData";
import { CircularProgress } from "@mui/joy";
import { LoginButton } from "@/feature-login/components/LoginButton";
import { useTranslation } from "@/shared/lib/i18n/client";

type CounterPickerProps = {
  data: OrganizerPermissions[];
  filterString: string;
  isLoading: boolean;
};

export const CounterPicker = ({
  data,
  filterString,
  isLoading,
}: CounterPickerProps) => {
  const { t } = useTranslation();
  const { setActiveCounter, lastCounterUsed } = useCounter();

  const handleCounterClick = (organizer: Organizer) => () => {
    setActiveCounter(organizer);
  };

  return (
    <>
      <Card
        sx={{
          //needs fixed height, for scroll and no overflow
          maxHeight: "calc(100vh - 420px)",
          overflowY: "auto",
        }}
      >
        <CardContent>
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
              display: "flex",
              flexDirection: "column",
            }}
          >
            {isLoading ? (
              <CircularProgress
                color="neutral"
                determinate={false}
                size="sm"
                variant="plain"
                sx={{ alignSelf: "center" }}
              />
            ) : (
              <>
                {data.length > 0 && lastCounterUsed && (
                  <LastCounterData
                    lastCounter={lastCounterUsed}
                    handleCounterClick={handleCounterClick}
                  />
                )}
                <CounterPickerData
                  data={data}
                  filterString={filterString}
                  handleCounterClick={handleCounterClick}
                />
              </>
            )}
          </ul>
        </CardContent>
      </Card>
      {!isLoading && data.length === 0 && !filterString ? (
        <LoginButton>{t("login.loginOtherAccountBtn")}</LoginButton>
      ) : null}
    </>
  );
};
