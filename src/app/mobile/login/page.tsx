"use client";

import Image from "next/image";
import { Stack, Typography } from "@mui/material";
import { useTranslation } from "@/shared/lib/i18n/client";
import { Button } from "@/mobile/lib/ui/uitpas/Button";
import uitpasLogoGreen from "public/images/svg/logo-uitpas-green.svg";
import uitpasHeart from "public/images/png/uitpas_heart.png";
import { getConfig } from "@/shared/lib/utils/getConfig";
import { useSearchParams } from "next/navigation";

const MobileLogin = () => {
  const { t } = useTranslation();
  const { publicRuntimeConfig } = getConfig();
  const search = useSearchParams();

  const destination = search.get("redirectTo") ?? "/";
  const href = `${
    publicRuntimeConfig.oauthPath ?? "/"
  }?destination=${destination}`;

  return (
    <Stack
      sx={{
        height: "100vh",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        px: 2,
        m: "auto",
      }}
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
        <Typography sx={{ px: 2, textAlign: "center" }}>
          {t("login.mobile.intro")}
        </Typography>
      </Stack>
      <Button href={href} sx={{ mb: 1 }}>
        {t("login.loginBtn")}
      </Button>
    </Stack>
  );
};

export default MobileLogin;
