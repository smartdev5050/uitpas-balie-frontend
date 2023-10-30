import { Organizer, OrganizerPermissions } from "@/lib/dataAccess";
import { Link, Typography } from "@/lib/ui";
import { CounterNoData } from "./CounterNoData";
import { useTranslation } from "react-i18next";

type CounterPickerDataProps = {
  data: OrganizerPermissions[];
  excludeCounter: Organizer | null;
  handleCounterClick: (organizer: Organizer) => () => void;
  filterString: string;
};

export const CounterPickerData = ({
  data,
  excludeCounter,
  handleCounterClick,
  filterString,
}: CounterPickerDataProps) => {
  const { t } = useTranslation();
  const dataWithoutPrevCounter = !excludeCounter
    ? data
    : data.filter(
        (permission) => permission.organizer.id !== excludeCounter.id
      );

  return (
    <>
      {dataWithoutPrevCounter.length > 0 ? (
        dataWithoutPrevCounter.map((permission) => (
          <li key={permission.organizer.id} style={{ marginBottom: 6 }}>
            <Link onClick={handleCounterClick(permission.organizer)}>
              {permission.organizer.name}
            </Link>
          </li>
        ))
      ) : filterString ? (
        <>
          <Typography
            sx={(theme) => ({
              fontStyle: "italic",
              color: theme.vars.palette.neutral[500],
            })}
          >
            {t("counter.noCounterSearch", { searchTerm: filterString })}
          </Typography>
        </>
      ) : (
        <CounterNoData />
      )}
    </>
  );
};
