"use client";

import { createTheme } from "@mui/material/styles";
import { poppinsFont } from "./fonts";

export const palette = {
  primary: "#168B8D",
  primaryDark: "#168B8D",
  secondary: "#149773",
  secondaryDark: "#149773",
};

export const theme = createTheme({
  palette: {
    primary: {
      main: palette.primary,
      dark: palette.primaryDark,
    },
    secondary: {
      main: palette.secondary,
      dark: palette.secondaryDark,
    },
  },
  typography: {
    fontFamily: poppinsFont.style.fontFamily,
    h1: {
      fontSize: "18px",
      fontWeight: 700,
      color: "#127173",
    },
  },
});
