import { useEffect, useState } from "react";

type PermissionStateExtended = PermissionState | "unknown" | "not_supported";

export const useCameraPermissions = () => {
  const [permission, setPermission] =
    useState<PermissionStateExtended>("unknown");

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio: false,
      })
      .then((stream) =>
        stream.getVideoTracks().forEach((track) => track.stop())
      );

    navigator.permissions
      .query({
        name: "camera" as PermissionName,
      })
      .then((status) => {
        setPermission(status.state);
        status.onchange = () => setPermission(status.state);
      })
      .catch((error) => {
        console.error("Error accessing the camera:", error);
        setPermission("not_supported");
      });
  }, []);

  return permission;
};
