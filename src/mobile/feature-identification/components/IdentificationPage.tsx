import { MobileNavBar } from "@/mobile/layouts";
import {
  Button,
  MobileContentStack,
  TextField,
  UitpasLoading,
} from "@/mobile/lib/ui";
import { useTranslation } from "@/shared/lib/i18n/client";
import { Box, IconButton, Typography } from "@mui/material";
import { useActivity } from "@/mobile/feature-activities/context/useActivity";
import { Search } from "@/shared/lib/dataAccess";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { OutlinedButton } from "@/mobile/lib/ui/uitpas/OutlinedButton";

export const IdentificationPage = () => {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const { selectedActivity, setSelectedActivity } = useActivity();

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
        <Button onClick={handleScanBarcodeClick}>
          {t("identification.mobile.scanBarcodeBtn")}
        </Button>

        <Typography
          variant="h1"
          sx={(theme) => ({
            color: theme.palette.neutral[900],
            textAlign: "center",
          })}
        >
          {t("identification.mobile.or")}
        </Typography>
        <Typography
          variant="h1"
          sx={(theme) => ({
            color: theme.palette.neutral[900],
            textAlign: "center",
            fontWeight: 400,
          })}
        >
          {t("identification.mobile.manualInput")}
        </Typography>
        <TextField placeholder={t("identification.mobile.placeholderTxt")} />
        <OutlinedButton sx={{ mt: "-10px" }}>
          {t("identification.mobile.confirmBtn")}
        </OutlinedButton>
      </MobileContentStack>
    </MobileNavBar>
  );
};
