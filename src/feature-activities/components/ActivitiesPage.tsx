import { useGetEvents } from "@/lib/dataAccess";
import { SidebarContent } from "./SidebarContent";
import { PageWithSideBarNew } from "@/lib/ui";
import { useTranslation } from "react-i18next";
import { DateMenu } from "./DateMenu";
import { SearchInput } from "./SearchInput";
import { useActiveCounter } from "@/feature-counter";
import dayjs from "dayjs";
import { EventName } from "@/lib/dataAccess/search/generated/model";
import { useRouter } from "next/router";
import {
  ActionLink,
  StyledActionsStack,
  StyledActivityStack,
  StyledEventDate,
  StyledEventName,
  StyledItemStack,
  StyledPageContainerStack,
  StyledPageTitle,
  StyledUserInputStack,
} from "./ActivitiesPages.styles";
import { useEffect, useMemo, useState } from "react";
import {
  getQrCodeUrl,
  getUitInDatabankurl,
  getUitInVlaanderenUrl,
} from "@/lib/utils";
import { Pagination } from "./Pagination";

const RANGE_DATE_FORMAT = "YYYY-MM-DDTHH:mm:ssZ";
const DATE_FORMAT = "DD MMMM YYYY";
// TODO: raise this limit, currently using 1 since I don't get enough data from the API to test pagination
const FETCH_LIMIT = 1;

export const ActivitiesPage = () => {
  const { t, i18n } = useTranslation();
  const counter = useActiveCounter();
  const router = useRouter();
  const searchQuery = router.query.search;
  const rangeQuery = router.query.range ?? "next12Months";
  const pageQuery = router.query.page ? Number(router.query.page) : 1;
  const [total, setTotal] = useState<number | undefined>(undefined);
  const dateRange = useMemo(() => {
    switch (rangeQuery) {
      case "today": {
        return {
          from: dayjs().startOf("day").format(RANGE_DATE_FORMAT),
          to: dayjs().endOf("day").format(RANGE_DATE_FORMAT),
        };
      }
      case "next7Days": {
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
        return {
          from: dayjs().subtract(100, "year").format(RANGE_DATE_FORMAT),
          to: dayjs().add(100, "year").format(RANGE_DATE_FORMAT),
        };
      }
      case "pastActivities": {
        return {
          from: dayjs().subtract(100, "year").format(RANGE_DATE_FORMAT),
          to: dayjs(dayjs().startOf("day").format(RANGE_DATE_FORMAT))
            .subtract(1, "second")
            .format(RANGE_DATE_FORMAT),
        };
      }
      default: {
        return {
          from: dayjs().subtract(100, "year").format(RANGE_DATE_FORMAT),
          to: dayjs().add(100, "year").format(RANGE_DATE_FORMAT),
        };
      }
    }
  }, [rangeQuery]);
  const { data, isSuccess, isLoading } = useGetEvents({
    organizerId: counter?.id,
    embed: true,
    audienceType: "everyone",
    uitpas: true,
    ...(rangeQuery && { dateFrom: dateRange.from, dateTo: dateRange.to }),
    ...(searchQuery && { q: searchQuery as string }),
    // @ts-expect-error Orval didn't include pagination in generated types
    limit: FETCH_LIMIT,
    start:
      (pageQuery as number) === 1
        ? 0
        : ((pageQuery as number) - 1) * FETCH_LIMIT,
  });
  useEffect(() => {
    if (isSuccess) {
      setTotal(data.data.totalItems);
    }
  }, [data?.data.totalItems, isSuccess]);

  const LANG_KEY = i18n.language as keyof EventName;

  const handleQuery = (queryKey: string, queryValue: string) => {
    const query = { ...router.query };

    if (queryValue === "") {
      delete query[queryKey];
    } else {
      query[queryKey] = queryValue;
    }

    router.push(
      {
        pathname: "/activities",
        query,
      },
      undefined,
      { shallow: true }
    );
  };

  return (
    <PageWithSideBarNew sideBarContent={<SidebarContent />} hasBackButton>
      <StyledPageContainerStack>
        <StyledPageTitle level="h2">{t("activities.title")}</StyledPageTitle>
        <StyledUserInputStack>
          <DateMenu
            handleQuery={handleQuery}
            defaultRange={rangeQuery && rangeQuery.toString()}
            disabled={isLoading}
          />
          <SearchInput
            handleQuery={handleQuery}
            defaultSearch={searchQuery && searchQuery.toString()}
            disabled={isLoading}
          />
        </StyledUserInputStack>

        {!isLoading && isSuccess ? (
          <>
            {data.data.member.map((member, i) => (
              <StyledActivityStack
                key={`activity-${member.name[LANG_KEY]?.substring(0, 10)}}`}
                sx={{
                  borderTop: i === 0 ? "1px solid #e5e5e5" : "1px solid #fff",
                }}
              >
                <StyledItemStack>
                  <StyledEventDate level="body2">
                    {`Van ${dayjs(member.startDate).format(
                      DATE_FORMAT
                    )} tot ${dayjs(member.endDate).format(DATE_FORMAT)}`}
                  </StyledEventDate>

                  <StyledEventName level="h3">
                    {member.name[LANG_KEY] ?? member.name.nl}
                  </StyledEventName>
                </StyledItemStack>

                <StyledActionsStack>
                  <ActionLink
                    href={getUitInVlaanderenUrl(
                      member.name.nl!,
                      member["@id"]!
                    )}
                    target="_blank"
                  >
                    {t("activities.viewUiTInVlaanderenBtn")}
                  </ActionLink>
                  <ActionLink
                    href={getUitInDatabankurl(member["@id"]!)}
                    target="_blank"
                  >
                    {t("activities.viewUiTDatabaseBtn")}
                  </ActionLink>
                  <ActionLink href={getQrCodeUrl(member["@id"]!)}>
                    {t("activities.downloadQrCodeBtn")}
                  </ActionLink>
                </StyledActionsStack>
              </StyledActivityStack>
            ))}
          </>
        ) : (
          // TODO: replace with loading spinner
          <div>Loading...</div>
        )}
        {total && (
          <Pagination
            currentPage={pageQuery}
            total={total}
            limit={FETCH_LIMIT}
            handleQuery={handleQuery}
          />
        )}
      </StyledPageContainerStack>
    </PageWithSideBarNew>
  );
};
