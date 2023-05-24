import {
    ReportStatus,
    useGetOrganizersFinancialReportsReportId,
    useGetOrganizersFinancialReportsReportIdZip,
    usePostOrganizersFinancialReports,
} from "@/lib/dataAccess";
import { useEffect, useState } from "react";


export const useDownloadReport = (organizerId: string) => {
    const [reportId, setReportId] = useState(0)
    const [reportStatus, setReportStatus] = useState<ReportStatus>("STARTED")

    const { mutate: postReports, data: createReportData, isLoading: isCreateLoading } = usePostOrganizersFinancialReports();
    const { data: reportStatusData, refetch: getReportStatus, isLoading: isStatusLoading } = useGetOrganizersFinancialReportsReportId(organizerId, reportId, { query: { enabled: false } })
    const { data: reportZipData, refetch: getReportZip, isLoading:isZipLoading } = useGetOrganizersFinancialReportsReportIdZip(organizerId, reportId, { query: { enabled: false } })

    const startReportRequest = (organizerId:string,period:{startDate:string,endDate:string}) => {
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
    }, [createReportData,reportStatus])

    //check on statusCheck response and set reportStatus
    useEffect(()=>{
        if (!reportStatusData) return
        const status = reportStatusData?.data.status
        setReportStatus(status)
    }, [reportStatusData])

    //check on status and get ready to downloadZip
    useEffect(()=>{
        if (reportStatus !== ReportStatus.AVAILABLE || reportZipData ) return        
        getReportZip()

    }, [reportStatus])

    useEffect(()=>{
        if(!reportZipData) return
        
       // save file = reportZipData.data

    },[reportZipData])

    const isLoading = reportStatus === ReportStatus.STARTED || isCreateLoading || isStatusLoading || isZipLoading

    return { startReportRequest, status: reportStatus, isLoading }
}