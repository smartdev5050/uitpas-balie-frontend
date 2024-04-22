"use client";

import { Organizer, useGetPermissions } from "@/shared/lib/dataAccess";
import { CounterNoData, CounterPicker } from "@/mobile/feature-counter";
import { ChangeEvent, useEffect, useState } from "react";
import { useCounter } from "@/shared/feature-counter/context/useCounter";
import { UitpasLoading } from "@/mobile/lib/ui";

export const CounterPage = () => {
  const { data: allData, isSuccess, isLoading } = useGetPermissions();
  const [searchString, setSearchString] = useState<string>("");
  const { setActiveCounter, lastCounterUsed } = useCounter();

  const dataWithoutLastCounter =
    allData?.data?.filter(
      (permission) => permission.organizer.id !== lastCounterUsed?.id
    ) ?? [];

  const filteredData = searchString
    ? dataWithoutLastCounter?.filter((organizer) =>
        organizer.organizer.name
          ?.toLowerCase()
          .includes(searchString.toLowerCase())
      )
    : dataWithoutLastCounter;

  const sortedData = filteredData
    ? filteredData.toSorted((a, b) =>
        a.organizer.name!.localeCompare(b.organizer.name!)
      )
    : [];

  const handleSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchString(e.target.value);
  };

  const handleCounterClick = (organizer: Organizer) => () => {
    setActiveCounter(organizer);
  };

  useEffect(() => {
    const data = allData?.data || [];
    if (data.length === 1) {
      setActiveCounter(data[0].organizer);
    }
  }, [allData?.data, setActiveCounter]);

  if (isLoading) return <UitpasLoading />;

  if (isSuccess && allData.data.length > 0)
    return (
      <CounterPicker
        totalCounters={allData.data.length}
        counters={sortedData}
        prevCounter={lastCounterUsed}
        onSearch={handleSearchInputChange}
        onCounterClick={handleCounterClick}
        searchString={searchString}
      />
    );

  return <CounterNoData />;
};
