import { MobileNavBar } from "@/mobile/layouts";
import {
  LoadingButton,
  MobileContentStack,
  UitpasLoading,
} from "@/mobile/lib/ui";
import { useTranslation } from "@/shared/lib/i18n/client";
import { Box, IconButton, Typography } from "@mui/material";
import { useActivity } from "@/mobile/feature-activities/context/useActivity";
import { Search } from "@/shared/lib/dataAccess";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ManualCardInput } from "@/mobile/feature-identification/components/ManualCardInput";

export const IdentificationPage = () => {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const { selectedActivity, setSelectedActivity } = useActivity();
  const [isNavigating, setIsNavigating] = useState<boolean>(false);

  const LANG_KEY = i18n.language as keyof Search.EventName;

  useEffect(() => {
    if (selectedActivity === null) {
      router.push("/mobile/activities");
    }
  }, [selectedActivity]);

  const handleChangeActivityClick = () => {
    setSelectedActivity(null);
  };

  const handleScanBarcodeClick = () => {
    router.push("/mobile/identification/scan");
    setIsNavigating(true);
  };

  if (selectedActivity === null) {
    return (
      <MobileNavBar>
        <UitpasLoading />
      </MobileNavBar>
    );
  }

  return (
    <MobileNavBar>
      <MobileContentStack>
        <Typography variant="h1">
          {t("identification.mobile.chosenActivity")}
        </Typography>
        <Box
          sx={{
            display: "flex",
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
              : t("identification.mobile.noActivity")}
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
        </Box>

        <Typography variant="h1" sx={{ mt: 2 }}>
          {t("identification.mobile.identifyPassHolder")}
        </Typography>
        <LoadingButton onClick={handleScanBarcodeClick} loading={isNavigating}>
          {t("identification.mobile.scanBarcodeBtn")}
        </LoadingButton>

        <Typography
          variant="h1"
          sx={(theme) => ({
            color: theme.palette.neutral[900],
            textAlign: "center",
          })}
        >
          {t("identification.mobile.or")}
        </Typography>

        <ManualCardInput />
      </MobileContentStack>
    </MobileNavBar>
  );
};
