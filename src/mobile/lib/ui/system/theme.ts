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
    brand: {
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
    brand: {
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
  // I'd like to import all of the colors from the figma design
  // however, I don't see a way to copy all of the colors (it does not let me)
  neutral: {
    0: "#FFFFFF",
    200: "#CFD3D3",
    900: "#2E3333",
  },
  brand: {
    200: "#ABE3D4",
    300: "#81D5BE",
    900: "#0B5641",
  },
  error: {
    errorMain: "#F82E58",
    500: "#FA5273",
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
      main: palette.error.errorMain,
      500: palette.error[500],
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
    brand: {
      200: palette.brand[200],
      300: palette.brand[300],
      900: palette.brand[900],
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
