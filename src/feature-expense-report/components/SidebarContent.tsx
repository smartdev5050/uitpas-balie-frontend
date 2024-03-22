"use client";

import { Stack, Typography } from "@/lib/ui";
import { Divider } from "@mui/joy";
import { useTranslation } from "@/lib/i18n/client";

export const SidebarContent = () => {
  const { t } = useTranslation();
  return (
    <Stack spacing={2}>
      <Typography level="h1"> {t("expenseReport.title")}</Typography>
      <Typography level="body1">{t("expenseReport.description")}</Typography>
      <Typography
        level="body2"
        variant="soft"
        color="info"
        sx={{ padding: "8px" }}
      >
        {t("expenseReport.info")}
      </Typography>
      <Divider />
    </Stack>
  );
};
