import {
  Organizer,
  OrganizerPermissions,
  useGetPermissions,
} from "@/lib/dataAccess";
import {
  Card,
  CardContent,
  CircularProgress,
  Link,
  Typography,
} from "@/lib/ui";
import { useCounter } from "@/feature-counter";
import { useTranslation } from "next-i18next";

export const CounterPicker = () => {
  const { t } = useTranslation();
  const { data, isSuccess } = useGetPermissions();
  const { setActiveCounter, lastCounterUsed } = useCounter();

  const createHandleClick = (organizer: Organizer) => () => {
    setActiveCounter(organizer);
  };

  const finishedAndHasData = isSuccess && data?.data?.length > 0;
  const finishedAndNoData = !finishedAndHasData && isSuccess;

  if (finishedAndNoData)
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
          })}
        >
          {t("counter.noCounterP2")}
        </Typography>
      </>
    );

  const filteredData = (dataToFilter: OrganizerPermissions[]) => {
    if (!lastCounterUsed) return dataToFilter;
    return dataToFilter.filter(
      (permission) => permission.organizer.id !== lastCounterUsed?.id
    );
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
            <>
              {lastCounterUsed && (
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
                    LAATST GEBRUIKT
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
                    ANDERE BALIES
                  </Typography>
                </>
              )}
              {filteredData(data?.data!).map((permission) => (
                <li key={permission.organizer.id} style={{ marginBottom: 6 }}>
                  <Link onClick={createHandleClick(permission.organizer)}>
                    {permission.organizer.name}
                  </Link>
                </li>
              ))}
            </>
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
