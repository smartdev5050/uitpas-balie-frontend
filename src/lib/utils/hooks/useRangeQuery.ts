import {
  DATE_FORMAT,
  getRangeDateFromSelection,
  TDateSelection,
} from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import dayjs from "dayjs";

export function useRangeQuery() {
  const searchParams = useSearchParams();

  const rangeQuery = (searchParams.get("range") ??
    "next12Months") as keyof typeof TDateSelection;

  const dateRange = useMemo(() => {
    return (searchParams.get("from") || searchParams.get("to")) &&
      rangeQuery === "chooseDate"
      ? getRangeDateFromSelection(rangeQuery, {
          from: searchParams.get("from")
            ? String(searchParams.get("from"))
            : dayjs().format(DATE_FORMAT),
          to: searchParams.get("to")
            ? String(searchParams.get("to"))
            : dayjs().format(DATE_FORMAT),
        })
      : getRangeDateFromSelection(rangeQuery);
  }, [rangeQuery, searchParams.get("from"), searchParams.get("to")]);

  return {
    rangeQuery,
    dateRange,
  };
}
