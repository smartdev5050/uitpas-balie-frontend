import {
  DATE_FORMAT,
  getRangeDateFromSelection,
  TDateSelection,
} from "@/lib/utils";
import { useRouter } from "next/router";
import { useMemo } from "react";
import dayjs from "dayjs";

export function useRangeQuery() {
  const router = useRouter();

  const rangeQuery = (router.query.range ??
    "next12Months") as keyof typeof TDateSelection;

  const dateRange = useMemo(() => {
    return (router.query.from || router.query.to) && rangeQuery === "chooseDate"
      ? getRangeDateFromSelection(rangeQuery, {
          from: router.query.from
            ? String(router.query.from)
            : dayjs().format(DATE_FORMAT),
          to: router.query.to
            ? String(router.query.to)
            : dayjs().format(DATE_FORMAT),
        })
      : getRangeDateFromSelection(rangeQuery);
  }, [rangeQuery, router.query.from, router.query.to]);

  return {
    rangeQuery,
    dateRange,
  };
}
