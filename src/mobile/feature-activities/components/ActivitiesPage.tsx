"use client";

import { MobileNavBar } from "@/mobile/layouts";
import {
  Link,
  MobileContentStack,
  SearchInput,
  Typography,
} from "@/mobile/lib/ui";
import { useTranslation } from "@/shared/lib/i18n/client";
import { debounce } from "@mui/material";
import { useGetEvents, Search } from "@/shared/lib/dataAccess";
import { useCounter } from "@/shared/feature-counter/context/useCounter";
import { ChangeEvent, useState, useEffect } from "react";
import { useSearchQuery } from "@/shared/lib/utils/hooks/useSearchQuery";
import { ActivitiesPicker } from "@/mobile/feature-activities";
import { useActivity } from "@/mobile/feature-activities/context/useActivity";
import { useRouter } from "next/navigation";

export const ActivitiesPage = () => {
  const { t } = useTranslation();
  const { activeCounter } = useCounter();
  const router = useRouter();
  const { searchQuery, setSearchQuery } = useSearchQuery();
  const [scrollPosition, setScrollPosition] = useState<number>(0);
  const { selectedActivity, setSelectedActivity } = useActivity();

  const FETCH_LIMIT = 10;
  const INITIAL_DATA = {
    facet: undefined,
    itemsPerPage: 0,
    member: [],
    totalItems: 0,
  };
  const [offset, setOffset] = useState<number>(0);
  const [data, setData] = useState<
    Omit<Search.GetEvents200, "member"> & {
      member: (Search.Event & { isNew: boolean })[];
    }
  >(INITIAL_DATA);
  const {
    data: fetchedData,
    isSuccess,
    isFetching,
  } = useGetEvents({
    organizerId: activeCounter?.id,
    embed: true,
    audienceType: "*",
    uitpas: true,
    ...(searchQuery && { q: searchQuery }),
    // @ts-expect-error Orval didn't include pagination in generated types
    limit: FETCH_LIMIT,
    start: offset,
    availableFrom: "*",
    availableTo: "*",
  });
  const [isInitialLoading, setIsInitialLoading] = useState<boolean>(true);
  const [showSearchInput, setShowSearchInput] = useState<boolean | null>(null);

  const handleSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setScrollPosition(0);
    setOffset(0);
    setIsInitialLoading(true);
    setData(INITIAL_DATA);
  };

  useEffect(() => {
    if (isSuccess) {
      setData((prev) => ({
        ...fetchedData.data,
        member: [
          ...prev.member.map((member) => ({ ...member, isNew: false })),
          ...fetchedData.data.member.map((member) => ({
            ...member,
            isNew: prev.member.length !== 0,
          })),
        ],
      }));

      setIsInitialLoading(false);

      if (showSearchInput === null) {
        setShowSearchInput(fetchedData.data.totalItems > 10 || !!searchQuery);
      }
    }
  }, [fetchedData?.data]);

  // This effect ensures that the user is redirected to the next "step"
  // if they previously had not completed the whole process and had already
  // selected an activity.
  useEffect(() => {
    if (selectedActivity !== null && selectedActivity !== undefined) {
      router.push("/mobile/identification");
    }
  }, [selectedActivity]);

  return (
    <MobileNavBar>
      <MobileContentStack>
        <Typography variant="h1">
          {t("activities.mobile.chooseActivity")}
        </Typography>

        {showSearchInput && (
          <SearchInput
            defaultValue={searchQuery}
            placeholder={t("activities.mobile.searchPlaceholder")}
            onChange={debounce(handleSearchInputChange, 500)}
          />
        )}

        <ActivitiesPicker
          isInitialLoading={isInitialLoading}
          data={data}
          fetchLimit={FETCH_LIMIT}
          totalFetchedItems={fetchedData ? fetchedData.data.totalItems : 0}
          setOffset={setOffset}
          scrollPosition={scrollPosition}
          setScrollPosition={setScrollPosition}
          isFetching={isFetching}
        />

        {!isInitialLoading && (
          <Link
            color="primary"
            href="/mobile/identification"
            onClick={() => setSelectedActivity(undefined)}
          >
            {t("activities.mobile.continueNoActivity")}
          </Link>
        )}
      </MobileContentStack>
    </MobileNavBar>
  );
};
