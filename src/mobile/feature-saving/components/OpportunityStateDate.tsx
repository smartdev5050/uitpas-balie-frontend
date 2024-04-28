import { CardSystemMembership } from "@/shared/lib/dataAccess";
import dayjs from "dayjs";
import { Typography } from "@mui/material";
import React from "react";
import { useTranslation } from "@/shared/lib/i18n/client";

type OpportunityStateDateProps = {
  csms?: CardSystemMembership[];
};

export const OpportunityStateDate = ({ csms }: OpportunityStateDateProps) => {
  const { t } = useTranslation();

  const findByStatus = (
    status: "ACTIVE" | "SUSPENDED" | "EXPIRED" | undefined
  ) => {
    if (!csms) return undefined;

    const csm = csms.find((csm) => csm.socialTariff?.status === status);

    if (csm?.socialTariff?.endDate) {
      return dayjs(csm.socialTariff.endDate).format("DD/MM/YYYY");
    }

    return undefined;
  };

  if (findByStatus("ACTIVE")) {
    return (
      <Typography
        variant="h1"
        sx={(theme) => ({ color: theme.palette.neutral[900] })}
      >
        {t("saving.mobile.opportunityState", {
          endDate: findByStatus("ACTIVE"),
          interpolation: { escapeValue: false },
        })}
      </Typography>
    );
  }

  if (findByStatus("EXPIRED")) {
    return (
      <Typography
        variant="h1"
        sx={(theme) => ({ color: theme.palette.neutral[900] })}
      >
        {t("saving.mobile.opportunityState", {
          endDate: findByStatus("EXPIRED"),
          interpolation: { escapeValue: false },
        })}
      </Typography>
    );
  }

  return null;
};
