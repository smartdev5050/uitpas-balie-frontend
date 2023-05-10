import { extendTheme } from "@mui/joy/styles";
import "@fontsource/public-sans";

declare module "@mui/joy/styles" {
  // No custom tokens found, you can skip the theme augmentation.
}

export const theme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
          solidColor: "#FFF",
          solidBg: "#2a4b9c",
          solidHoverBg: "#1a2e60",
          solidBorder: "#1a2e60",
          mainChannel: "#2a4b9c",
          darkChannel: "#1a2e60",
        },
        neutral: {
          outlinedBorder: "#FFF",
          outlinedColor: "#FFF",
          50: "#FFF",
          200: "#f3f3f3",
          300: "#f5f5f5",
          400: "#ddd",
          500: "#8a8a8d",
          600: "#2f3b4d",

          800: "#262626",
          900: "#090909",
        },
        text: {
          primary: "#333333",
        },
      },
    },
  },
  components: {
    JoyButton: {
      styleOverrides: {
        root: {
          fontWeight: "normal",
          borderRadius: 0,
        },
      },
    },
  },
  typography: {
    h1: {
      fontSize: "2em",
      margin: "0.67em 0",
      fontWeight: 700,
      lineHeight: 1.1,
    },
    h2: {
      fontSize: "18px",
      fontWeight: 700,
      lineHeight: 1.1,
      margin: "0 0 1em",
    },
    body1: {
      fontSize: 15,
    },
    body2: {
      fontSize: 13,
    },
    
  },
   breakpoints: {
    values: {
      xs: 0,
      sm: 660,
      md: 820,
      lg: 1200,
      xl: 1536,
    },
  },
});
