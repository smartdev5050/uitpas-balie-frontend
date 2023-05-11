import { useTranslation } from "next-i18next";
import { PageWithSidebar, Stack, Typography,DateInput } from "@/lib/ui";

import { SidebarContent } from "./SidebarContent";
import { FormControl, FormLabel,  } from "@mui/joy";

export const ExpenseReportPage = () => {
  const { t } = useTranslation();

  return (
    <PageWithSidebar sideBarContent={<SidebarContent />} hasBackButton>
      <Stack m={2} gap={3}>
        <Typography level="body1">
          Vul hier de start- en einddatum in van de periode waarbinnen je de
          gewenste kortingstarieven registreerde.
        </Typography>
        <Stack direction={"row"}>
          <FormControl>
            <FormLabel>StartDatum</FormLabel>
            <DateInput placeholder="Placeholder" />
          </FormControl>
          <FormControl>
            <FormLabel>EindDatum</FormLabel>
            <DateInput placeholder="Placeholder" />
          </FormControl>
        </Stack>
      </Stack>
    </PageWithSidebar>
  );
};
