import { useGetEvents } from "@/lib/dataAccess";
import { SidebarContent } from "./SidebarContent";
import { PageWithSideBarNew, Stack, Typography } from "@/lib/ui";
import { useTranslation } from "react-i18next";
import { DateMenu } from "./DateMenu";

export const ActivitiesPage = () => {
  const { t } = useTranslation();
  const { data } = useGetEvents();
  return (
    <PageWithSideBarNew sideBarContent={<SidebarContent />} hasBackButton>
      <Stack mx={2} my={3} gap={3} alignContent="flex-start">
        <Typography
          level="h2"
          sx={{
            fontSize: "18px",
            textTransform: "uppercase",
            borderBottom: "1px solid",
            mb: "12px",
            pb: "12px",
          }}
        >
          {t("activities.title")}
        </Typography>
        <DateMenu />
      </Stack>
    </PageWithSideBarNew>
  );
};
