import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { getConfig } from "@/lib/utils/getConfig";

export const useGetOrganizersFinancialReportsReportIdZip = (
  organizerId: string | number,
  reportId: string | number,
  queryOptions: any
) => {
  const { publicRuntimeConfig } = getConfig();

  return useQuery<Blob, Error>(
    [],
    async () => {
      const { data } = await axios.get(
        `${publicRuntimeConfig.legacyApiPath}/organizers/${organizerId}/financial-reports/${reportId}.zip`
      );
      return new Blob([data]); //,{type:"application/zip"});
    },
    queryOptions.query
  );
};
