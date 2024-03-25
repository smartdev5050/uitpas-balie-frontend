import dayjs from "dayjs";

export const RANGE_DATE_FORMAT = "YYYY-MM-DDTHH:mm:ssZ";
export const DATE_FORMAT = "DD MMMM YYYY";
// Separate display format, because react datepicker uses date-fns
export const DATE_FORMAT_SEPARATED_FNS = "dd/MM/yyyy";

export const TDateSelection = {
  today: "today",
  next7days: "next7Days",
  next30Days: "next30Days",
  next12Months: "next12Months",
  unlimited: "unlimited",
  pastActivities: "pastActivities",
  chooseDate: "chooseDate",
} as const;

export const getRangeDateFromSelection = (
  dateSelection: keyof typeof TDateSelection,
  chooseDateRange?: { from: string; to: string }
) => {
  const unlimited = {
    from: dayjs().subtract(100, "year").format(RANGE_DATE_FORMAT),
    to: dayjs().add(100, "year").format(RANGE_DATE_FORMAT),
  };

  switch (dateSelection) {
    case "today": {
      return {
        from: dayjs().startOf("day").format(RANGE_DATE_FORMAT),
        to: dayjs().endOf("day").format(RANGE_DATE_FORMAT),
      };
    }
    case "next7days": {
      return {
        from: dayjs().startOf("day").format(RANGE_DATE_FORMAT),
        to: dayjs(dayjs().add(7, "days"))
          .endOf("day")
          .format(RANGE_DATE_FORMAT),
      };
    }
    case "next30Days": {
      return {
        from: dayjs().startOf("day").format(RANGE_DATE_FORMAT),
        to: dayjs(dayjs().add(30, "days"))
          .endOf("day")
          .format(RANGE_DATE_FORMAT),
      };
    }
    case "next12Months": {
      return {
        from: dayjs().startOf("day").format(RANGE_DATE_FORMAT),
        to: dayjs(dayjs().add(12, "months"))
          .endOf("day")
          .format(RANGE_DATE_FORMAT),
      };
    }
    case "unlimited": {
      return unlimited;
    }
    case "pastActivities": {
      return {
        from: dayjs().subtract(100, "year").format(RANGE_DATE_FORMAT),
        to: dayjs(dayjs().startOf("day").format(RANGE_DATE_FORMAT))
          .subtract(1, "second")
          .format(RANGE_DATE_FORMAT),
      };
    }
    case "chooseDate": {
      return {
        from: dayjs(chooseDateRange?.from).format(RANGE_DATE_FORMAT),
        to: dayjs(chooseDateRange?.to).endOf("day").format(RANGE_DATE_FORMAT),
      };
    }
    default: {
      return unlimited;
    }
  }
};

export function dateToISODateString(date?: Date | null): string {
  return ISOStringToISODateString((date ?? new Date()).toISOString());
}
export function ISOStringToISODateString(ISOString: string): string {
  return (ISOString ?? new Date().toISOString()).split("T")[0];
}
