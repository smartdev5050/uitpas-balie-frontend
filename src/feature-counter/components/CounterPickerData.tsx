import { Organizer, OrganizerPermissions } from "@/lib/dataAccess";
import { Link, Typography } from "@/lib/ui";
import { CounterNoData } from "./CounterNoData";
import { useTranslation } from "react-i18next";

type CounterPickerDataProps = {
  data: OrganizerPermissions[];
  handleCounterClick: (organizer: Organizer) => () => void;
  filterString: string;
};

export const CounterPickerData = ({
  data,
  handleCounterClick,
  filterString,
}: CounterPickerDataProps) => {
  const { t } = useTranslation();

  return (
    <>
      {data.length > 0 ? (
        <>
          <Typography
            level="h3"
            sx={(theme) => ({
              borderBottom: `1px solid ${theme.vars.palette.neutral["500"]}`,
              pb: "0.5em",
              mt: "24px",
              mb: "1em",
              textTransform: "uppercase",
              fontSize: "1em",
              fontWeight: 600,
            })}
          >
            {t("counter.otherCounters")}
          </Typography>
          <ul>
            {data.map((permission) => (
              <li
                key={`${permission.organizer.name}${permission.organizer.id}`}
                style={{ marginBottom: 6 }}
              >
                <Link onClick={handleCounterClick(permission.organizer)}>
                  {permission.organizer.name}
                </Link>
              </li>
            ))}
          </ul>
        </>
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
