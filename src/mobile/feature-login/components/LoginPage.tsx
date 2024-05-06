"use client";

import { useTranslation } from "@/shared/lib/i18n/client";
import { Stack } from "@mui/material";
import Image from "next/image";
import uitpasLogoGreen from "public/images/svg/logo-uitpas-green.svg";
import { Typography } from "@/mobile/lib/ui";
import uitpasHeart from "public/images/png/uitpas_heart.png";
import { LoginButton } from "@/mobile/feature-login";

export const MobileLoginPage = () => {
  const { t } = useTranslation();

  return (
    <Stack
      sx={(theme) => ({
        height: "100vh",
        backgroundColor: theme.palette.background.primary,
        alignItems: "center",
        justifyContent: "space-between",
        px: 2,
        m: "auto",
      })}
    >
      <Stack
        sx={{
          margin: "49px 0 22px 0",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          gap: 4,
        }}
      >
        <Image
          src={uitpasLogoGreen}
          alt="uitpas logo green"
          style={{
            maxWidth: "300px",
            maxHeight: "8vh",
            width: "auto",
            height: "100%",
          }}
        />
        <Typography variant="h1">{t("login.mobile.title")}</Typography>
        <Image
          src={uitpasHeart}
          alt="uitpas heart"
          style={{
            maxWidth: "310px",
            maxHeight: "35vh",
            width: "auto",
            height: "100%",
          }}
        />
        <Typography>{t("login.mobile.intro")}</Typography>
      </Stack>
      <LoginButton sx={{ mb: 1 }}>{t("login.loginBtn")}</LoginButton>
    </Stack>
  );
};
