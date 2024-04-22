import {
  ElementRef,
  MutableRefObject,
  useEffect,
  useRef,
  useState,
} from "react";
import { Box, IconButton } from "@mui/material";
import { Typography } from "@/mobile/lib/ui";
import { useTranslation } from "@/shared/lib/i18n/client";
import {
  BarcodeFormat,
  BrowserMultiFormatReader,
  IScannerControls,
} from "@zxing/browser";
import { FlashlightOn, FlashlightOff, Close } from "@mui/icons-material";
import { DecodeHintType } from "@zxing/library";
import { useRouter } from "next/navigation";
import { PermissionBox } from "@/mobile/feature-identification/scan/components/PermissionBox";

type PermissionStateExtended = PermissionState | "unknown" | "not_supported";

export const BarcodeScanner = () => {
  const { t } = useTranslation();
  const [permission, setPermission] =
    useState<PermissionStateExtended>("unknown");
  const videoRef = useRef<ElementRef<"video">>(null);
  const [isFlashOn, setIsFlashOn] = useState<boolean>(false);
  const streamRef = useRef<MediaStream | null>(null);
  const controlRef: MutableRefObject<IScannerControls | null> =
    useRef<IScannerControls>(null);
  const router = useRouter();

  useEffect(() => {
    return () => {
      if (controlRef.current) {
        controlRef.current.stop();
      }
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => {
          track.stop();
        });
      }
    };
  }, []);

  useEffect(() => {
    if (navigator && navigator.mediaDevices) {
      if (permission !== "denied") {
        navigator.mediaDevices
          .getUserMedia({
            video: {
              facingMode: "environment",
              width: screen.availWidth,
              height: screen.availHeight,
            },
            audio: false,
          })
          .then((stream) => {
            streamRef.current = stream;
            navigator.permissions
              // @ts-expect-error 'camera' is not recognized by typescript, but is in the browser.
              .query({ name: "camera" })
              .then((permissionResponse) =>
                setPermission(permissionResponse.state)
              );

            if (videoRef.current) {
              videoRef.current.srcObject = stream;
            }
          })
          .catch(() => setPermission("not_supported"));
      }
    } else {
      setPermission("not_supported");
    }
  }, [permission]);

  useEffect(() => {
    if (permission === "granted") {
      if (videoRef.current) {
        const hints = new Map();
        hints.set(DecodeHintType.POSSIBLE_FORMATS, [BarcodeFormat.CODE_128]);
        const codeReader = new BrowserMultiFormatReader(hints);
        codeReader
          .decodeFromVideoElement(videoRef.current, (result) => {
            if (result) {
              router.push(
                `/mobile/identification/scan/result?code=${result.getText()}`
              );
            }
          })
          .then((control) => (controlRef.current = control))
          .catch((err) => console.error("BarcodeScanner decoder error: ", err));
      }

      return () => {
        BrowserMultiFormatReader.releaseAllStreams();
        controlRef.current?.stop();
      };
    }
  }, [permission, isFlashOn]);

  useEffect(() => {
    if (streamRef.current) {
      streamRef.current.getVideoTracks().forEach((track) => {
        track.applyConstraints({
          // @ts-expect-error 'torch' is not recognized by typescript, but is in the browser.
          advanced: [{ torch: isFlashOn }],
        });
      });
    }
  }, [isFlashOn]);

  const handleFlashToggle = () => {
    setIsFlashOn((prev) => !prev);
  };

  const handleClose = () => {
    router.push("/mobile/identification");
  };

  if (permission !== "granted") {
    return <PermissionBox permission={permission} />;
  }

  return (
    <Box
      sx={{
        position: "relative",
        height: "100vh",
        overflow: "hidden",
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
      <video
        ref={videoRef}
        muted
        style={{ width: "100%", height: "100%", objectFit: "fill" }}
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
  );
};
