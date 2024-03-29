import { Stack, Typography } from "@/web/lib/ui";
import { Divider } from "@mui/joy";
import { useTranslation } from "@/shared/lib/i18n/client";

export const SidebarContent = () => {
  const { t } = useTranslation();
  return (
    <Stack spacing={2}>
      <Typography level="h1" sx={{ my: 0, fontSize: "1.6em" }}>
        {t("activities.title")}
      </Typography>
      <Typography level="body1">{t("activities.description")}</Typography>
      <Divider />
    </Stack>
  );
};
