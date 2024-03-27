"use client";

import Image from "next/image";
import { Stack, CircularProgress } from "@mui/material";
import { useTranslation } from "@/shared/lib/i18n/client";
import { useGetPermissions } from "@/shared/lib/dataAccess";
import { WarningAmber } from "@mui/icons-material";
import { Button, Link, Typography } from "@/mobile/lib/ui";
import uitpasLogoGreen from "public/images/svg/logo-uitpas-green.svg";
import { useSearchParams } from "next/navigation";
import { getConfig } from "@/shared/lib/utils/getConfig";

const MobileCounters = () => {
  const { t } = useTranslation();
  const search = useSearchParams();
  const { publicRuntimeConfig } = getConfig();
  const { data: allData, isSuccess, isLoading } = useGetPermissions();

  console.log(allData);
  const destination = search.get("redirectTo") ?? "/";
  const href = `${
    publicRuntimeConfig.oauthPath ?? "/"
  }?destination=${destination}`;

  return (
    <Stack
      sx={{
        height: "100vh",
        px: 2,
      }}
    >
      <Stack
        sx={{
          margin: "49px 0 0 0",
          alignItems: "center",
          width: "100%",
          height: "100%",
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
        {isLoading ? (
          <CircularProgress sx={{ my: "auto" }} />
        ) : isSuccess && allData.data.length > 0 ? (
          "TODO COUNTERS"
        ) : (
          <Stack
            sx={{
              height: "100%",
              justifyContent: "space-between",
            }}
          >
            <Stack sx={{ alignItems: "center", gap: 4 }}>
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
            <Button component="a" href={href} sx={{ mb: 1 }}>
              {t("counter.mobile.loginOtherAccountBtn")}
            </Button>
          </Stack>
        )}
      </Stack>
    </Stack>
  );
};

export default MobileCounters;
