import { Organizer, useGetPermissions } from "@/lib/dataAccess";
import {
  Card,
  CardContent,
  CircularProgress,
  Link,
  Typography,
} from "@/lib/ui";
import { useCounter } from "@/feature-counter";
import { useTranslation } from "next-i18next";
import { Dispatch, SetStateAction, useEffect } from "react";
import { LoginButton } from "@/feature-login/components/LoginButton";

interface CounterPickerProps {
  searchString: string;
  setDataAvailable: Dispatch<SetStateAction<boolean>>;
}

export const CounterPicker = ({
  searchString,
  setDataAvailable,
}: CounterPickerProps) => {
  const { t } = useTranslation();
  const { data, isSuccess } = useGetPermissions();
  const { setActiveCounter, lastCounterUsed } = useCounter();

  const createHandleClick = (organizer: Organizer) => () => {
    setActiveCounter(organizer);
  };

  const finishedAndHasData = isSuccess && data?.data?.length > 0;
  const finishedAndNoData = !finishedAndHasData && isSuccess;

  useEffect(() => {
    if (finishedAndHasData) {
      setDataAvailable(true);
    }
  }, [finishedAndHasData, setDataAvailable]);

  if (finishedAndNoData) {
    return (
      <>
        <Typography
          sx={(theme) => ({
            fontStyle: "italic",
            color: theme.vars.palette.neutral[500],
          })}
        >
          {t("counter.noCounterP1")}
        </Typography>
        <Typography
          sx={(theme) => ({
            fontStyle: "italic",
            color: theme.vars.palette.neutral[500],
            pb: "1em",
          })}
        >
          {t("counter.noCounterP2")}
        </Typography>

        <LoginButton>{t("login.loginOtherAccountBtn")}</LoginButton>
      </>
    );
  }

  const renderDataExcludingLastCounter = () => {
    return data?.data
      .filter((permission) => permission.organizer.id !== lastCounterUsed?.id)
      .map((permission) => (
        <li key={permission.organizer.id} style={{ marginBottom: 6 }}>
          <Link onClick={createHandleClick(permission.organizer)}>
            {permission.organizer.name}
          </Link>
        </li>
      ));
  };

  const renderSearchFilteredData = () => {
    const filteredData = data?.data!.filter((permission) =>
      permission?.organizer?.name
        ?.toLowerCase()
        .includes(searchString.toLocaleLowerCase())
    );

    return filteredData!.length > 0 ? (
      filteredData?.map((permission) => (
        <li key={permission.organizer.id} style={{ marginBottom: 6 }}>
          <Link onClick={createHandleClick(permission.organizer)}>
            {permission.organizer.name}
          </Link>
        </li>
      ))
    ) : (
      <>
        <Typography
          sx={(theme) => ({
            fontStyle: "italic",
            color: theme.vars.palette.neutral[500],
          })}
        >
          {t("counter.noCounterSearch", { searchTerm: searchString })}
        </Typography>
      </>
    );
  };

  const renderData = () => {
    if (searchString) {
      return renderSearchFilteredData();
    }

    if (lastCounterUsed) {
      return (
        <>
          <Typography
            level="h3"
            sx={{
              borderBottom: "1px solid #8a8a8d",
              pb: "0.5em",
              mb: "1em",
              textTransform: "uppercase",
              fontSize: "1em",
              fontWeight: 600,
            }}
          >
            {t("counter.lastUsed")}
          </Typography>
          <li style={{ marginBottom: 6 }}>
            <Link onClick={createHandleClick(lastCounterUsed)}>
              {lastCounterUsed.name}
            </Link>
          </li>
          <Typography
            level="h3"
            sx={{
              borderBottom: "1px solid #8a8a8d",
              pb: "0.5em",
              mt: "24px",
              mb: "1em",
              textTransform: "uppercase",
              fontSize: "1em",
              fontWeight: 600,
            }}
          >
            {t("counter.otherCounters")}
          </Typography>
        </>
      );
    }

    return renderDataExcludingLastCounter();
  };

  return (
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
          {finishedAndHasData ? (
            renderData()
          ) : (
            <CircularProgress
              color="neutral"
              determinate={false}
              size="sm"
              variant="plain"
              sx={{ alignSelf: "center" }}
            />
          )}
        </ul>
      </CardContent>
    </Card>
  );

  // TODO port loader from ng app?, Error message?
  return null;
};
