import {
  ReportStatus,
  useGetOrganizersFinancialReportsReportId,
  useGetOrganizersFinancialReportsReportIdZip,
  usePostOrganizersFinancialReports,
} from "@/lib/dataAccess";
import { useEffect, useState } from "react";
import { saveAs } from "file-saver";
import JsZip from "jszip";
import { PeriodType, isSamePeriod } from "@/lib/utils";
import getConfig from "next/config";
//import { useGetOrganizersFinancialReportsReportIdZip } from "./useGetDownloadBlob";

const zipUrl = (organizerId: string | number, reportId: string | number) => {
  const { publicRuntimeConfig } = getConfig();
  return `${publicRuntimeConfig.apiPath}/organizers/${organizerId}/financial-reports/${reportId}.zip`;
};
//const zipUrl = (organizerId: string | number, reportId: string | number) => `https://balie-test.uitpas.be/counters/active/expense-reports/${reportId}.zip`

type ReturnType = {
  startReportRequest: (organizerId: string, period: PeriodType) => void;
  status: ReportStatus;
  isDownloading: boolean;
  hasFailed: boolean;
  period: PeriodType | null;
};

export const useDownloadReport = (organizerId: string): ReturnType => {
  const [hasStarted, setHasStarted] = useState(false);
  const [reportId, setReportId] = useState(0);
  const [reportStatus, setReportStatus] = useState<ReportStatus>("STARTED");
  const [periodToDownload, setPeriodToDownload] = useState<PeriodType | null>(
    null
  );

  const {
    mutate: postReports,
    data: createReportData,
    isLoading: isCreateLoading,
  } = usePostOrganizersFinancialReports();
  const {
    data: reportStatusData,
    refetch: getReportStatus,
    isLoading: isStatusLoading,
  } = useGetOrganizersFinancialReportsReportId(organizerId, reportId, {
    query: { enabled: false },
  });
  const {
    data: reportZipData,
    refetch: getReportZip,
    isLoading: isZipLoading,
  } = useGetOrganizersFinancialReportsReportIdZip(organizerId, reportId, {
    query: { enabled: false },
  });

  const startReportRequest = (organizerId: string, period: PeriodType) => {
    //if downloading same period as last time, skip creation
    if (isSamePeriod(period, periodToDownload)) {
      setHasStarted(true);
      return;
    }
    setReportId(0);
    setReportStatus("STARTED");
    setHasStarted(true);

    setPeriodToDownload(period);
    postReports({
      organizerId,
      data: period,
    });
  };

  //initiate and loop over status check
  useEffect(() => {
    if (!createReportData) return;
    const id = createReportData?.data.id;

    setReportId(id);
    const interval = setInterval(() => {
      if (reportStatus === ReportStatus.STARTED) getReportStatus();
      else clearInterval(interval);
    }, 1000);
    return () => clearInterval(interval);
  }, [createReportData, reportStatus]);

  //check on statusCheck response and set reportStatus
  useEffect(() => {
    if (!reportStatusData) return;
    const status = reportStatusData?.data.status;
    setReportStatus(status);
  }, [reportStatusData]);

  //check on status and get ready to downloadZip
  useEffect(() => {
    if (reportStatus !== ReportStatus.AVAILABLE || reportZipData) return;
    getReportZip();
  }, [reportStatus]);
  //check on status and download zip
  useEffect(() => {
    if (
      reportStatus !== ReportStatus.AVAILABLE ||
      !reportZipData ||
      !hasStarted
    )
      return;

    JsZip.loadAsync(reportZipData.data)
      .then((zip) => zip.generateAsync({ type: "blob" }))
      .then((blob) =>
        saveAs(
          blob,
          `financialReport_${periodToDownload?.startDate}-${periodToDownload?.endDate}.zip`
        )
      );

    setHasStarted(false);
  }, [reportZipData, reportStatus, hasStarted]);

  const isDownloading =
    hasStarted &&
    (reportStatus === ReportStatus.STARTED ||
      isCreateLoading ||
      isStatusLoading ||
      isZipLoading);
  const hasFailed = reportStatus === ReportStatus.FAILED;

  return {
    startReportRequest,
    status: reportStatus,
    isDownloading,
    hasFailed,
    period: periodToDownload,
  };
};
