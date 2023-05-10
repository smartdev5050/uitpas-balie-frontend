import { useTranslation } from "next-i18next";
import { PageWithSidebar } from "@/lib/ui";

import { SidebarContent } from "./SidebarContent";

export const ExpenseReportPage = () => {
  const { t } = useTranslation();

  return (
    <PageWithSidebar sideBarContent={<SidebarContent/>} hasBackButton>
      main page
    </PageWithSidebar>
  );
};
