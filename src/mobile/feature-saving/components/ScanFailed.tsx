"use client";

import { MobileNavBar } from "@/mobile/layouts";
import { WarningAmber } from "@mui/icons-material";
import {
  Button,
  OutlinedButton,
  MobileContentStack,
  Typography,
} from "@/mobile/lib/ui";
import { Stack } from "@mui/material";
import { useTranslation } from "@/shared/lib/i18n/client";
import { useRouter } from "next/navigation";

type ScanFailedProps = {
  errorMessage?: string;
};

export const ScanFailed = ({ errorMessage }: ScanFailedProps) => {
  const { t } = useTranslation();
  const router = useRouter();

  const handleTryAgainClick = () => {
    router.push("/mobile/identification/scan");
  };

  const handleInputCardNoClick = () => {
    router.push("/mobile/identification");
  };

  return (
    <MobileNavBar>
      <MobileContentStack
        sx={{
          justifyContent: "space-between",
          pb: "26px",
        }}
      >
        <Stack
          sx={{ alignItems: "center", rowGap: "20px", margin: "auto auto" }}
        >
          <WarningAmber
            sx={(theme) => ({
              fontSize: "48px",
              color: theme.palette.error.main,
            })}
          />
          <Typography
            variant="h1"
            sx={(theme) => ({
              color: theme.palette.error.main,
            })}
          >
            {errorMessage}
          </Typography>
        </Stack>

        <Stack rowGap="18px">
          <Button sx={{ height: "44px" }} onClick={handleTryAgainClick}>
            {t("saving.mobile.failure.tryAgainBtn")}
          </Button>
          <OutlinedButton onClick={handleInputCardNoClick}>
            {t("saving.mobile.failure.inputCardNoBtn")}
          </OutlinedButton>
        </Stack>
      </MobileContentStack>
    </MobileNavBar>
  );
};
