import { CircularProgress } from "@mui/material";
import { Search } from "@/shared/lib/dataAccess";
import { OutlinedButton } from "@/mobile/lib/ui/uitpas/OutlinedButton";
import { ScrollableActivitesContainer } from "@/mobile/feature-activities/components/ActivitiesPage.styles";
import { Dispatch, SetStateAction, UIEvent, useEffect, useRef } from "react";
import { useTranslation } from "@/shared/lib/i18n/client";
import { Typography } from "@/mobile/lib/ui";
import { useSearchQuery } from "@/shared/lib/utils/hooks/useSearchQuery";
import { useActivity } from "@/mobile/feature-activities/context/useActivity";
import { useRouter } from "next/navigation";

type ActivitiesPickerProps = {
  isInitialLoading: boolean;
  data: Omit<Search.GetEvents200, "member"> & {
    member: (Search.Event & { isNew: boolean })[];
  };
  fetchLimit: number;
  totalFetchedItems: number;
  setOffset: Dispatch<SetStateAction<number>>;
  scrollPosition: number;
  setScrollPosition: Dispatch<SetStateAction<number>>;
  isFetching: boolean;
};

export const ActivitiesPicker = ({
  isInitialLoading,
  data,
  fetchLimit,
  totalFetchedItems,
  setOffset,
  scrollPosition,
  setScrollPosition,
  isFetching,
}: ActivitiesPickerProps) => {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const scrollRef = useRef<HTMLDivElement>(null);
  const { searchQuery } = useSearchQuery();
  const { setSelectedActivity } = useActivity();

  useEffect(() => {
    if (scrollRef.current && data.member.length > fetchLimit) {
      scrollRef.current.scrollTop =
        scrollPosition + (data.member.length > 7 ? 56 : 0);
    }
  }, [data.member]);

  const LANG_KEY = i18n.language as keyof Search.EventName;

  const handleScroll = (e: UIEvent<HTMLDivElement>) => {
    const bottom =
      e.currentTarget.scrollHeight - e.currentTarget.scrollTop ===
      e.currentTarget.clientHeight;
    if (!bottom) return;

    const hasMoreItems = totalFetchedItems > data.member.length;
    if (!hasMoreItems) return;

    setOffset((prev) => prev + fetchLimit);
    setScrollPosition(e.currentTarget.scrollTop);
  };

  const handleActivityClick = (activity: Search.Event) => {
    setSelectedActivity(activity);
    router.push("/mobile/identification");
  };

  if (isInitialLoading) {
    return <CircularProgress sx={{ m: "auto auto" }} />;
  }

  if (data.totalItems > 0) {
    return (
      <ScrollableActivitesContainer ref={scrollRef} onScroll={handleScroll}>
        {data.member.map((activity) => (
          <OutlinedButton
            onClick={() => handleActivityClick(activity)}
            key={activity["@id"]}
            sx={{
              ...(activity.isNew
                ? {
                    opacity: 0,
                    transform: "translateY(20px)",
                    animation: "fade-in 0.3s ease-out forwards",
                    "@keyframes fade-in": {
                      "0%": {
                        opacity: 0,
                        transform: "translateY(20px)",
                      },
                      "100%": {
                        opacity: 1,
                        transform: "translateY(0)",
                      },
                    },
                  }
                : {}),
            }}
          >
            {activity.name[LANG_KEY]}
          </OutlinedButton>
        ))}

        {isFetching && <CircularProgress sx={{ m: "auto auto" }} size={20} />}
      </ScrollableActivitesContainer>
    );
  }

  return (
    <Typography variant="body1">
      {searchQuery
        ? t("activities.mobile.noActivitiesSearch", {
            searchTerm: searchQuery,
          })
        : t("activities.mobile.noActivities")}
    </Typography>
  );
};
