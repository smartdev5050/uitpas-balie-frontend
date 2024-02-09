import { useGetEvents } from "@/lib/dataAccess";
import { SidebarContent } from "./SidebarContent";
import {
  Grid,
  Modal,
  ModalActions,
  ModalContent,
  ModalHeader,
  PageWithSideBarNew,
  Typography,
} from "@/lib/ui";
import { useTranslation } from "react-i18next";
import { RangeMenu } from "./RangeMenu";
import { SearchInput } from "./SearchInput";

import dayjs from "dayjs";
import { EventAllOf, EventName } from "@/lib/dataAccess/search/generated/model";
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
import React, { useMemo, useState } from "react";
import {
  getQrCodeUrl,
  getUitInDatabankurl,
  getUitInVlaanderenUrl,
} from "@/lib/utils";
import { Pagination } from "@/lib/ui/uitpas/Pagination";
import { useCounter } from "@/feature-counter";
import { CircularProgress } from "@mui/joy";
import {
  DATE_FORMAT,
  TDateSelection,
  getRangeDateFromSelection,
} from "@/lib/utils/dateUtils";
import { usePageQuery } from "@/lib/utils/hooks/usePageQuery";
import { ActionButton } from "@/lib/ui/uitpas/ActionButton";

export const ActivitiesPage = () => {
  const router = useRouter();
  const searchQuery = router.query.search;
  const rangeQuery = (router.query.range ??
    "next12Months") as keyof typeof TDateSelection;
  const { t, i18n } = useTranslation();
  const { activeCounter: counter } = useCounter();
  const { fetchLimit, offset } = usePageQuery();
  const [selectedActivity, setSelectedActivity] = useState<
    EventAllOf | undefined
  >(undefined);

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

  const { data, isSuccess, isLoading } = useGetEvents({
    organizerId: counter?.id,
    embed: true,
    audienceType: "everyone",
    uitpas: true,
    ...(rangeQuery && { dateFrom: dateRange.from, dateTo: dateRange.to }),
    ...(searchQuery && { q: searchQuery as string }),
    // @ts-expect-error Orval didn't include pagination in generated types
    limit: fetchLimit,
    start: offset,
  });

  const LANG_KEY = i18n.language as keyof EventName;

  return (
    <PageWithSideBarNew sideBarContent={<SidebarContent />} hasBackButton>
      <StyledPageContainerStack>
        <Modal
          open={selectedActivity !== undefined}
          onClose={() => setSelectedActivity(undefined)}
        >
          <ModalHeader>
            <Typography level="h4" sx={{ fontSize: "15px", fontWeight: 600 }}>
              {selectedActivity?.name[LANG_KEY] ?? selectedActivity?.name.nl}
            </Typography>
          </ModalHeader>

          <ModalContent>
            {selectedActivity?.startDate && selectedActivity?.endDate && (
              <Grid container sx={{ flexGrow: 1 }}>
                <Grid xs={3}>
                  <Typography level="body2" fontStyle="italic">
                    {t("activities.activityModal.when")}
                  </Typography>
                </Grid>
                <Grid xs={9}>
                  <Typography level="body2">
                    {t("activities.fromStartToEndDate", {
                      startDate: dayjs(selectedActivity.startDate).format(
                        DATE_FORMAT
                      ),
                      endDate: dayjs(selectedActivity.endDate).format(
                        DATE_FORMAT
                      ),
                    })}
                  </Typography>
                </Grid>
              </Grid>
            )}
          </ModalContent>

          <ModalActions>
            <ActionButton onClick={() => setSelectedActivity(undefined)}>
              {t("activities.activityModal.closeBtn")}
            </ActionButton>
          </ModalActions>
        </Modal>

        <StyledPageTitle level="h2">{t("activities.title")}</StyledPageTitle>
        <StyledUserInputStack customInput={rangeQuery === "chooseDate"}>
          <RangeMenu
            defaultRange={rangeQuery?.toString()}
            disabled={isLoading}
          />
          <SearchInput
            defaultSearch={searchQuery?.toString()}
            disabled={isLoading}
          />
        </StyledUserInputStack>

        {!isLoading && isSuccess ? (
          <>
            {data.data.member.map((member, i) => (
              <StyledActivityStack
                key={`activity-${member.name[LANG_KEY]?.substring(0, 10)}}`}
                sx={(theme) => ({
                  borderTop:
                    i === 0
                      ? `1px solid ${theme.palette.neutral[400]}`
                      : `1px solid ${theme.palette.neutral.outlinedBorder}`,
                })}
                onClick={() => setSelectedActivity(member)}
              >
                <StyledItemStack>
                  {member.startDate && member.endDate && (
                    <StyledEventDate level="body2">
                      {t("activities.fromStartToEndDate", {
                        startDate: dayjs(member.startDate).format(DATE_FORMAT),
                        endDate: dayjs(member.endDate).format(DATE_FORMAT),
                      })}
                    </StyledEventDate>
                  )}

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
          <CircularProgress
            color="neutral"
            determinate={false}
            size="sm"
            variant="plain"
            sx={{ alignSelf: "center", my: 10 }}
          />
        )}
        <Pagination totalItems={data?.data.totalItems ?? 0} />
      </StyledPageContainerStack>
    </PageWithSideBarNew>
  );
};
