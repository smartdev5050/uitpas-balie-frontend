import {
    ReportStatus,
    useGetOrganizersFinancialReportsReportId,
    useGetOrganizersFinancialReportsReportIdZip,
    usePostOrganizersFinancialReports,
} from "@/lib/dataAccess";
import { useEffect, useState } from "react";
import { saveAs } from 'file-saver'
import JsZip from 'jszip';
//import { useGetOrganizersFinancialReportsReportIdZip } from "./useGetDownloadBlob";

const zipUrl = (organizerId: string | number, reportId: string | number) => `${process.env.NEXT_PUBLIC_API_PATH}/organizers/${organizerId}/financial-reports/${reportId}.zip`
//const zipUrl = (organizerId: string | number, reportId: string | number) => `https://balie-test.uitpas.be/counters/active/expense-reports/${reportId}.zip`

type PeriodType = {
    startDate: string, endDate: string
}

type ReturnType = { startReportRequest: (organizerId: string, period: PeriodType) => void, status: ReportStatus, isDownloading: boolean, hasFailed: boolean }

export const useDownloadReport = (organizerId: string): ReturnType => {
    const [hasStarted, setHasStarted] = useState(false)
    const [reportId, setReportId] = useState(0)
    const [reportStatus, setReportStatus] = useState<ReportStatus>("STARTED")
    const [periodToDownload, setPeriodToDownload] = useState<PeriodType | null>(null)

    const { mutate: postReports, data: createReportData, isLoading: isCreateLoading } = usePostOrganizersFinancialReports();
    const { data: reportStatusData, refetch: getReportStatus, isLoading: isStatusLoading } = useGetOrganizersFinancialReportsReportId(organizerId, reportId, { query: { enabled: false } })
    const { data: reportZipData, refetch: getReportZip, isLoading: isZipLoading } = useGetOrganizersFinancialReportsReportIdZip(organizerId, reportId, { query: { enabled: false } })

    const startReportRequest = (organizerId: string, period: PeriodType) => {
        setReportId(0)
        setReportStatus("STARTED")
        setHasStarted(true)
        setPeriodToDownload(period)
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
    //check on status and download zip
    useEffect(() => {
        if (reportStatus !== ReportStatus.AVAILABLE || !reportZipData || !hasStarted) return

        JsZip().loadAsync(reportZipData.data as ArrayBuffer)
            .then(zip => zip.generateAsync({ type: 'arraybuffer' }))
            .then(zip => saveAs(zip, `financialReport_${periodToDownload?.startDate}-${periodToDownload?.endDate}.zip`))




        const element = document.createElement('a');
        element.setAttribute('href', zipUrl(organizerId, reportId));
        element.setAttribute('download', `financialReport_${periodToDownload?.startDate}-${periodToDownload?.endDate}.zip`);
        console.log(element)
        element.click();

        //         //should work in production?
        //window.location.href = zipUrl(organizerId, reportId)
        // window.open(zipUrl(organizerId, reportId), '_blank')


        setHasStarted(false)
    }, [reportZipData])

    const isDownloading = hasStarted && (reportStatus === ReportStatus.STARTED || isCreateLoading || isStatusLoading || isZipLoading)
    const hasFailed = reportStatus === ReportStatus.FAILED

    return { startReportRequest, status: reportStatus, isDownloading, hasFailed }
}