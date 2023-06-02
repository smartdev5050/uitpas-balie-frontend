import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetOrganizersFinancialReportsReportIdZip = (organizerId: string|number, reportId: string|number, queryOptions: any) => {
    return useQuery<Blob, Error>([], async () => {

        const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_PATH}/organizers/${organizerId}/financial-reports/${reportId}.zip`);
        return new Blob([data])//,{type:"application/zip"});
    }, queryOptions.query);
}