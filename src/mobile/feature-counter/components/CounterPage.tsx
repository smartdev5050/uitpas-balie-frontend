"use client";

import { useGetPermissions } from "@/shared/lib/dataAccess";
import { CircularProgress } from "@mui/material";
import { CounterNoData, CounterPicker } from "@/mobile/feature-counter";

export const CounterPage = () => {
  const { data: allData, isSuccess, isLoading } = useGetPermissions();

  if (isLoading) return <CircularProgress sx={{ my: "auto" }} />;

  if (isSuccess && allData.data.length > 0) return <CounterPicker />;

  return <CounterNoData />;
};
