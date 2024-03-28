"use client";

import { MobileNavBar } from "@/mobile/layouts";
import { Box } from "@mui/material";

export const CounterPicker = () => {
  return (
    <MobileNavBar>
      <Box
        sx={(theme) => ({
          backgroundColor: theme.palette.background.primary,
          height: "100vh",
          width: "100%",
        })}
      >
        TODO: CounterPicker
      </Box>
    </MobileNavBar>
  );
};
