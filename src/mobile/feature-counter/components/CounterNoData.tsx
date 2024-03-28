"use client";

import { Stack } from "@mui/material";
import { Link, Typography } from "@/mobile/lib/ui";
import { WarningAmber } from "@mui/icons-material";
import { useTranslation } from "@/shared/lib/i18n/client";
import { LoginButton } from "@/mobile/feature-login";
import uitpasLogoGreen from "public/images/svg/logo-uitpas-green.svg";
import Image from "next/image";

export const CounterNoData = () => {
  const { t } = useTranslation();

  return (
    <Stack
      sx={{
        height: "100vh",
        justifyContent: "space-between",
        padding: "49px 16px 0 16px",
      }}
    >
      <Stack sx={{ alignItems: "center", gap: 4 }}>
        <Image
          src={uitpasLogoGreen}
          alt="uitpas logo green"
          style={{
            maxWidth: "300px",
            maxHeight: "8vh",
            width: "auto",
            height: "100%",
            margin: "0 auto",
          }}
        />
        <Typography variant="h1">{t("counter.mobile.title")}</Typography>
        <WarningAmber
          sx={(theme) => ({
            fontSize: 48,
            color: theme.palette.error.main,
          })}
        />
        <Typography sx={{ fontSize: "18px" }}>
          {t("counter.mobile.noCounterP1")}
        </Typography>
        <Typography sx={{ fontSize: "18px" }}>
          {t("counter.mobile.noCounterP2")}
        </Typography>
        <Link href="">{t("counter.mobile.noCounterLink")}</Link>
      </Stack>
      <LoginButton sx={{ mb: 1 }}>
        {t("counter.mobile.loginOtherAccountBtn")}
      </LoginButton>
    </Stack>
  );
};
