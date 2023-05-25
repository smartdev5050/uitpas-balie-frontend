import {
    ReportStatus,
    useGetOrganizersFinancialReportsReportId,
    useGetOrganizersFinancialReportsReportIdZip,
    usePostOrganizersFinancialReports,
} from "@/lib/dataAccess";
import { saveAs } from 'file-saver';
import { useEffect, useState } from "react";
type PeriodType = {
    startDate: string, endDate: string
}
type ReturnType = { startReportRequest: (organizerId: string, period: PeriodType) => void, status: ReportStatus, isLoading: boolean }

export const useDownloadReport = (organizerId: string): ReturnType => {
    const [reportId, setReportId] = useState(0)
    const [reportStatus, setReportStatus] = useState<ReportStatus>("STARTED")

    const { mutate: postReports, data: createReportData, isLoading: isCreateLoading } = usePostOrganizersFinancialReports();
    const { data: reportStatusData, refetch: getReportStatus, isLoading: isStatusLoading } = useGetOrganizersFinancialReportsReportId(organizerId, reportId, { query: { enabled: false } })
    const { data: reportZipData, refetch: getReportZip, isLoading: isZipLoading } = useGetOrganizersFinancialReportsReportIdZip(organizerId, reportId, { query: { enabled: false } })

    const startReportRequest = (organizerId: string, period: PeriodType) => {
        setReportId(0)
        setReportStatus("STARTED")
        postReports({
            organizerId,
            data: period
        });
    }

    //initiate and loop over status check
    useEffect(() => {
        if (!createReportData) return
        const id = createReportData?.data.id;

        setReportId(id)
        const interval = setInterval(() => {
            if (reportStatus === ReportStatus.STARTED)
                getReportStatus()
            else
                clearInterval(interval)

        }, 1000)
        return () => clearInterval(interval)
    }, [createReportData, reportStatus])

    //check on statusCheck response and set reportStatus
    useEffect(() => {
        if (!reportStatusData) return
        const status = reportStatusData?.data.status
        setReportStatus(status)
    }, [reportStatusData])

    //check on status and get ready to downloadZip
    useEffect(() => {
        if (reportStatus !== ReportStatus.AVAILABLE || reportZipData) return
        getReportZip()

    }, [reportStatus])

    useEffect(() => {
        if (!reportZipData) return

        // save file = reportZipData.data
        // no need to request zip data, just need url(?)
        console.log(reportZipData.data)
        //saveAs(reportZipData.data, "finance-reports.zip");

    }, [reportZipData])

    const isLoading = reportStatus === ReportStatus.STARTED || isCreateLoading || isStatusLoading || isZipLoading

    return { startReportRequest, status: reportStatus, isLoading }
}