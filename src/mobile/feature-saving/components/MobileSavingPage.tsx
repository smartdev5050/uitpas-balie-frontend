"use client";

import { useTranslation } from "@/shared/lib/i18n/client";
import { useRouter, useSearchParams } from "next/navigation";
import { useGetPassholders } from "@/shared/lib/dataAccess";
import { EventName } from "@/shared/lib/dataAccess/search/generated/model";
import { MobileNavBar } from "@/mobile/layouts";
import {
  Alert,
  Button,
  MobileContentStack,
  OutlinedButton,
  UitpasLoading,
} from "@/mobile/lib/ui";
import { ScanFailed } from "@/mobile/feature-saving";
import { IconButton, Stack, Typography, Divider } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useActivity } from "@/mobile/feature-activities/context/useActivity";
import React from "react";
import { OpportunityStateDate } from "@/mobile/feature-saving/components/OpportunityStateDate";
import { ManualCardInput } from "@/mobile/feature-identification/components/ManualCardInput";

export const MobileSavingPage = () => {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const params = useSearchParams();
  const uitpasNumber = params.get("uitpas");
  const inszNumber = params.get("insz");
  const { selectedActivity, setSelectedActivity } = useActivity();

  const { data, isError, error, isLoading } = useGetPassholders({
    ...(uitpasNumber && { uitpasNumber }),
    ...(inszNumber && { inszNumber }),
  });

  const LANG_KEY = i18n.language as keyof EventName;

  const handleChangeActivityClick = () => {
    setSelectedActivity(null);
  };

  const handleNextScanClick = () => {
    router.push("/mobile/identification/scan");
  };

  if (isLoading)
    return (
      <MobileNavBar>
        <UitpasLoading />
      </MobileNavBar>
    );

  if (isError) {
    const { data } = error?.response || {};
    const endUserMessage = data?.endUserMessage;

    if (endUserMessage) {
      return <ScanFailed errorMessage={endUserMessage[LANG_KEY]} />;
    }
  }

  return (
    <MobileNavBar>
      <MobileContentStack sx={{ mb: "18px" }}>
        <Typography variant="h1">
          {t("saving.mobile.chosenActivity")}
        </Typography>
        <Stack
          sx={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography
            variant="h1"
            sx={(theme) => ({ color: theme.palette.neutral[900] })}
          >
            {selectedActivity
              ? selectedActivity.name[LANG_KEY]
              : t("saving.mobile.noActivity")}
          </Typography>
          <IconButton
            disableRipple={true}
            onClick={handleChangeActivityClick}
            sx={(theme) => ({
              color: theme.palette.neutral[900],
              fontSize: 32,
            })}
          >
            <FontAwesomeIcon icon={faPenToSquare} />
          </IconButton>
        </Stack>

        {data?.data.member?.[0] && (
          <>
            <Typography variant="h1" sx={{ mt: 2 }}>
              {t("saving.mobile.passholder")}
            </Typography>
            <Stack sx={{ rowGap: "4px" }}>
              <Typography
                variant="h1"
                sx={(theme) => ({ color: theme.palette.neutral[900] })}
              >
                {t("saving.mobile.namePointsTxt", {
                  firstName: data.data.member[0].firstName,
                  lastName: data.data.member[0].name,
                  points: data.data.member[0].points,
                })}
              </Typography>
              <OpportunityStateDate
                csms={data?.data.member[0].cardSystemMemberships}
              />
            </Stack>
          </>
        )}
        {/*TODO: send request to save up points */}
        <Alert type="success">Punt gespaard.</Alert>

        <Stack rowGap="10px">
          <OutlinedButton onClick={() => console.log("TODO")}>
            {t("saving.mobile.chooseTariffBtn")}
          </OutlinedButton>
          <OutlinedButton onClick={() => console.log("TODO")}>
            {t("saving.mobile.tradeBenefitBtn")}
          </OutlinedButton>
        </Stack>

        {/*-16 comes from the padding that's already in the stack*/}
        <Divider sx={{ margin: "0 -16px" }} />
        <Button onClick={handleNextScanClick}>
          {t("saving.mobile.scanNextBtn")}
        </Button>
        <Typography
          variant="h1"
          sx={(theme) => ({
            color: theme.palette.neutral[900],
            textAlign: "center",
          })}
        >
          {t("saving.mobile.or")}
        </Typography>

        <ManualCardInput />
      </MobileContentStack>
    </MobileNavBar>
  );
};
