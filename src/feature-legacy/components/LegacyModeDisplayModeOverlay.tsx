import { useLegacyMode } from "../hooks/useLegacyMode";
import { Box } from "@/lib/ui";
import { useTranslation } from "next-i18next";
import { useEffect, useState } from "react";
import { LegacyMode } from "@/feature-legacy";

export const LegacyModeDisplayModeOverlay = () => {
  const [show, setShow] = useState(false);
  const { legacyMode } = useLegacyMode();
  const { t } = useTranslation();

  useEffect(() => {
    if (legacyMode === LegacyMode.PREFER_NEXT) return;

    setShow(true);
    const t = setTimeout(() => {
      setShow(false);
    }, 1500);

    return () => {
      clearTimeout(t);
    };
  }, [legacyMode]);

  return (
    <Box
      position="fixed"
      bottom={200}
      ml={"50%"}
      width={320}
      left={-320 / 2}
      textAlign={"center"}
      sx={{
        opacity: show ? 0.8 : 0,
        pointerEvents: "none",
        transition: "opacity 0.2s ease",
      }}
    >
      <Box py={3} bgcolor={"grey.400"} borderRadius={48}>
        {t(`legacyMode.${legacyMode}`)}
      </Box>
    </Box>
  );
};
