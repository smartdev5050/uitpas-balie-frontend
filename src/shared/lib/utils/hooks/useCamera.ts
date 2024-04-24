import { useCallback, useEffect, useState } from "react";

type PermissionStateExtended = PermissionState | "unknown" | "not_supported";

export const useCamera = () => {
  const [permission, setPermission] =
    useState<PermissionStateExtended>("unknown");
  const [videoDevices, setVideoDevices] = useState<MediaDeviceInfo[]>([]);
  const [currentVideoDevice, setCurrentVideoDevice] = useState<
    MediaDeviceInfo | undefined
  >(undefined);

  const setCameraPosition = (position: "front" | "back") => {
    setCurrentVideoDevice(
      videoDevices.find((device) =>
        device.label.toLowerCase().includes(position)
      ) || videoDevices[0]
    );
  };

  const toggleFrontBackCamera = () => {
    currentVideoDevice?.label.toLowerCase().includes("back")
      ? setCameraPosition("front")
      : setCameraPosition("back");
  };

  const askForPermission = useCallback(() => {
    navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio: false,
      })
      .then((stream) =>
        stream.getVideoTracks().forEach((track) => track.stop())
      )
      .catch((err) => console.error("caught error:", err));
  }, []);

  const checkPermission = useCallback(() => {
    navigator.permissions
      .query({
        name: "camera" as PermissionName,
      })
      .then((status) => {
        if (permission === "unknown") {
          setPermission(status.state);
        }
        status.addEventListener("change", () => {
          setPermission(status.state);
        });
      })
      .catch((error) => {
        console.error("Error accessing the camera:", error);
        setPermission("not_supported");
      });
  }, [permission]);

  useEffect(() => {
    if (permission === "unknown" || permission === "prompt") {
      askForPermission();
      checkPermission();
    }

    if (permission === "granted") {
      if (videoDevices.length === 0) {
        navigator.mediaDevices.enumerateDevices().then((devices) => {
          const videoDevicesLocal = devices.filter(
            (device) => device.kind === "videoinput"
          );

          if (videoDevicesLocal.length === 0) {
            setPermission("not_supported");
            return;
          }

          setVideoDevices(videoDevicesLocal);
        });
      }

      if (!currentVideoDevice && videoDevices.length > 0) {
        setCameraPosition("back");
      }
    }
  }, [permission, videoDevices]);

  return {
    permission,
    videoDevices,
    currentVideoDevice,
    toggleFrontBackCamera,
  };
};
