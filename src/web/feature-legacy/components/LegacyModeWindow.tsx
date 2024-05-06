import { FC, PropsWithChildren } from "react";
import { Box, Stack } from "@/web/lib/ui";
import { FallbackPage } from "./FallbackPage";
import { useLegacyMode } from "../hooks/useLegacyMode";
import { LegacyMode } from "../context/LegacyModeContext";

export const LegacyModeWindow: FC<PropsWithChildren> = ({ children }) => {
  const { legacyMode } = useLegacyMode();

  if (legacyMode === LegacyMode.PREFER_LEGACY) {
    return <FallbackPage />;
  }

  if (legacyMode === LegacyMode.SPLIT_X || legacyMode === LegacyMode.SPLIT_Y) {
    return (
      <Stack direction={legacyMode === LegacyMode.SPLIT_X ? "row" : "column"}>
        <Box
          width={legacyMode === LegacyMode.SPLIT_X ? "50vw" : "auto"}
          height={legacyMode === LegacyMode.SPLIT_X ? "auto" : "50vh"}
          overflow={"auto"}
          sx={{
            [legacyMode === LegacyMode.SPLIT_X
              ? "borderRight"
              : "borderBottom"]: "1px solid gold;",
          }}
        >
          {children}
        </Box>
        <Box
          width={legacyMode === LegacyMode.SPLIT_X ? "50vw" : "auto"}
          height={legacyMode === LegacyMode.SPLIT_X ? "auto" : "50vh"}
          overflow={"auto"}
        >
          <FallbackPage />
        </Box>
      </Stack>
    );
  }

  return <>{children}</>;
};
