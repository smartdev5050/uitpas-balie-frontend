"use client";

import { createTheme } from "@mui/material/styles";
import { poppinsFont } from "./fonts";

declare module "@mui/material/styles" {
  interface Palette {
    navigation: {
      primary: string;
    };
    neutral: {
      0: string;
      100: string;
      200: string;
      300: string;
      400: string;
      500: string;
      600: string;
      700: string;
      800: string;
      900: string;
      1000: string;
      1100: string;
      1200: string;
    };
  }
  interface PaletteOptions {
    navigation?: {
      primary?: string;
    };
    neutral: {
      0?: string;
      100?: string;
      200?: string;
      300?: string;
      400?: string;
      500?: string;
      600?: string;
      700?: string;
      800?: string;
      900?: string;
      1000?: string;
      1100?: string;
      1200?: string;
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
  // I'd like to import all of the colors from the figma design
  // however, I don't see a way to copy all of the colors (it does not let me)
  neutral: {
    0: "#FFFFFF",
    200: "#CFD3D3",
    900: "#2E3333",
  },
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
      default: palette.backgroundPrimary,
      primary: palette.neutral[0],
    },
    neutral: {
      0: palette.neutral[0],
      200: palette.neutral[200],
      900: palette.neutral[900],
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
