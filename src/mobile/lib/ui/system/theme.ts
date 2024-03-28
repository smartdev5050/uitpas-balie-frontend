"use client";

import { createTheme } from "@mui/material/styles";
import { poppinsFont } from "./fonts";

declare module "@mui/material/styles" {
  interface Palette {
    navigation: {
      primary: string;
    };
  }
  interface PaletteOptions {
    navigation?: {
      primary?: string;
    };
  }
  interface TypeBackground {
    primary: string;
  }
}

export const palette = {
  primary: "#168B8D",
  primaryDark: "#168B8D",
  secondary: "#149773",
  secondaryDark: "#149773",
  navigationPrimary: "#39AC8D",
  backgroundPrimary: "#EFF0F0",
  errorMain: "#F82E58",
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
    error: {
      main: palette.errorMain,
    },
    navigation: {
      primary: palette.navigationPrimary,
    },
    background: {
      primary: palette.backgroundPrimary,
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
