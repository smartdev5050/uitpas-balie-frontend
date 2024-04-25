import { ElementRef, useCallback, useEffect, useRef, useState } from "react";
import { Box, IconButton } from "@mui/material";
import { Typography, UitpasLoading } from "@/mobile/lib/ui";
import { useTranslation } from "@/shared/lib/i18n/client";
import {
  FlashlightOn,
  FlashlightOff,
  Cameraswitch,
  Close,
} from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { PermissionBox } from "@/mobile/feature-identification/scan/components/PermissionBox";
import Quagga, { QuaggaJSResultObject } from "@ericblade/quagga2";
import { useCamera } from "@/shared/lib/utils/hooks/useCamera";

export const BarcodeScanner = () => {
  const { t } = useTranslation();
  const {
    permission,
    currentVideoDevice,
    frontBackCameraAvailable,
    toggleFrontBackCamera,
  } = useCamera();
  const [isFlashOn, setIsFlashOn] = useState<boolean>(false);
  const router = useRouter();
  const scannerRef = useRef<HTMLDivElement>();
  const [scannerReady, setScannerReady] = useState<boolean>(false);

  const handleFlashToggle = () => {
    setIsFlashOn((prev) => !prev);
    if (isFlashOn) {
      Quagga.CameraAccess.disableTorch();
    } else {
      Quagga.CameraAccess.enableTorch();
    }
  };

  const handleClose = () => {
    router.push("/mobile/identification");
  };

  const handleValidScan = (code: string) => {
    router.push(`/mobile/identification/scan/result?code=${code}`);
  };

  const handleFlipCamera = () => {
    toggleFrontBackCamera();
  };

  const handleResultErrorCheck = useCallback(
    (result: QuaggaJSResultObject) => {
      const errors = result.codeResult.decodedCodes
        .flatMap((x) => x.error)
        .filter((x): x is number => x !== undefined)
        .sort((a, b) => a - b);

      const mid = Math.floor(errors.length / 2);
      const err =
        errors.length % 2 === 0
          ? (errors[mid - 1] + errors[mid]) / 2
          : errors[mid];

      // 80% confidence that the scan is correct
      if (err < 0.2 && result.codeResult.code) {
        handleValidScan(result.codeResult.code);
      }
    },
    [handleValidScan]
  );

  useEffect(() => {
    if (permission === "granted" && currentVideoDevice && scannerRef.current) {
      Quagga.init(
        {
          inputStream: {
            type: "LiveStream",
            constraints: {
              width: { ideal: window.innerHeight },
              height: { ideal: window.innerWidth },
              aspectRatio: { ideal: window.innerHeight / window.innerWidth },
              deviceId: currentVideoDevice.deviceId,
            },
            target: scannerRef.current,
          },
          locator: {
            patchSize: "medium",
            halfSample: true,
          },
          frequency: 10,
          decoder: {
            readers: ["code_128_reader"],
          },
          locate: true,
        },
        (err) => {
          if (err) {
            console.error(err);
            return;
          }
          Quagga.start();
          setScannerReady(true);
        }
      );

      Quagga.onDetected(handleResultErrorCheck);

      return () => {
        Quagga.stop();
      };
    }
  }, [permission, currentVideoDevice, scannerRef]);

  if (permission !== "granted") {
    return <PermissionBox permission={permission} />;
  }

  return (
    <>
      <UitpasLoading
        sx={{ ...(scannerReady && { display: "none !important" }) }}
      />
      <Box
        sx={{
          position: "relative",
          height: "100vh",
          overflow: "hidden",
          ...(!scannerReady && { display: "none" }),
        }}
      >
        <IconButton
          disableRipple
          size="large"
          sx={(theme) => ({
            position: "absolute",
            color: theme.palette.neutral[0],
            left: "0%",
            zIndex: 20,
          })}
          onClick={handleClose}
        >
          <Close sx={{ fontSize: 30 }} />
        </IconButton>
        <IconButton
          disableRipple
          size="large"
          sx={(theme) => ({
            position: "absolute",
            color: theme.palette.neutral[0],
            right: "0%",
            zIndex: 20,
          })}
          onClick={handleFlashToggle}
        >
          {isFlashOn ? (
            <FlashlightOn sx={{ fontSize: 30 }} />
          ) : (
            <FlashlightOff sx={{ fontSize: 30 }} />
          )}
        </IconButton>
        {frontBackCameraAvailable() && (
          <IconButton
            disableRipple
            size="large"
            sx={(theme) => ({
              position: "absolute",
              color: theme.palette.neutral[0],
              right: "15%",
              zIndex: 20,
            })}
            onClick={handleFlipCamera}
          >
            <Cameraswitch sx={{ fontSize: 30 }} />
          </IconButton>
        )}
        <Box
          ref={scannerRef}
          sx={{
            width: "100%",
            height: "100%",
            video: {
              width: "100%",
              height: "100%",
              objectFit: "cover",
            },
            canvas: {
              display: "none",
            },
          }}
        />
        {/* bottom-right and top-left corner borders */}
        <Box
          sx={{
            position: "absolute",
            top: "38%",
            left: "5%",
            right: "5%",
            bottom: "38%",
            boxShadow: "0 0 0 2000px rgba(0, 0, 0, 0.7)",
            pointerEvents: "none",
            zIndex: 10,
            "&::before, &::after": {
              content: '""',
              position: "absolute",
              backgroundColor: "transparent",
              border: "3px solid white",
            },
            "&::before": {
              top: -2,
              left: -3,
              width: "20px",
              height: "20px",
              borderBottom: "none",
              borderRight: "none",
            },
            "&::after": {
              bottom: -2,
              right: -3,
              width: "20px",
              height: "20px",
              borderTop: "none",
              borderLeft: "none",
            },
          }}
        >
          {/* bottom-left and top-right corner borders */}
          <Box
            sx={{
              position: "absolute",
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
              "&::before, &::after": {
                content: '""',
                position: "absolute",
                backgroundColor: "transparent",
                border: "3px solid white",
              },
              "&::before": {
                top: -2,
                right: -3,
                width: "20px",
                height: "20px",
                borderBottom: "none",
                borderLeft: "none",
              },
              "&::after": {
                bottom: -2,
                left: -3,
                width: "20px",
                height: "20px",
                borderTop: "none",
                borderRight: "none",
              },
            }}
          />
        </Box>
        <Typography
          variant="h1"
          sx={(theme) => ({
            position: "absolute",
            top: "30%",
            width: "100%",
            textAlign: "center",
            color: theme.palette.neutral[0],
            zIndex: 20,
          })}
        >
          {t("identification.mobile.scan.scanOverlay")}
        </Typography>
      </Box>
    </>
  );
};
