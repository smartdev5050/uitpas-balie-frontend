import { Organizer, useGetPermissions } from "@/lib/dataAccess";
import { Card, CardContent, Link, Typography } from "@/lib/ui";
import { useSetActiveCounter } from "@/feature-counter/context/useSetActiveCounter";
import { useTranslation } from "next-i18next";

export const CounterPicker = () => {
  const { t } = useTranslation();
  const { data, isSuccess } = useGetPermissions();
  const setActiveCounter = useSetActiveCounter();

  const createHandleClick = (organizer: Organizer) => () => {
    setActiveCounter(organizer);
  };

  const finishedAndHasData = isSuccess && data?.data?.length > 0;
  const finishedAndNoData = !finishedAndHasData && isSuccess;

  if (finishedAndNoData)
    return (
      <>
        <Typography sx={{ fontStyle: "italic", color: "grey.600" }}>
          {t("counter.noCounterP1")}
        </Typography>
        <Typography sx={{ fontStyle: "italic", color: "grey.600" }}>
          {t("counter.noCounterP2")}
        </Typography>
      </>
    );

  if (finishedAndHasData) {
    return (
      <Card>
        <CardContent>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {data?.data.map((permission) => (
              <li key={permission.organizer.id} style={{ marginBottom: 6 }}>
                <Link onClick={createHandleClick(permission.organizer)}>
                  {permission.organizer.name}
                </Link>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    );
  }

  // TODO Loader, Error message?
  return null;
};
