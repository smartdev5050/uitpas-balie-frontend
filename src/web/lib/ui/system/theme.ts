import { extendTheme } from "@mui/joy/styles";

declare module "@mui/joy/styles" {
  interface PaletteNeutral {
    solidBorder: string;
    plainBorder: string;
  }
  interface PaletteInfo {
    softBorder: string;
  }
}

declare module "@mui/joy" {}

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
          solidBorder: "#969ca5",
          plainBorder: "#ccc",
          50: "#FFF",
          200: "#f3f3f3",
          300: "#f5f5f5",
          400: "#ddd",
          500: "#8a8a8d",
          600: "#2f3b4d",
          700: "#212a37",
          800: "#262626",
          900: "#090909",
        },
        text: {
          primary: "#333333",
        },
        info: {
          50: "#EEF7FC",
          100: "#daedf8",
          200: "#66afe999",
          300: "#598ec5",
          400: "#4078B5",
          500: "#2a4b9c",
          600: "#223D81",
          700: "#1A2E61",
          800: "#2f3b4d",
          900: "#1F2733",
          softColor: "#31708f",
          softBg: "#e4eef5",
          softBorder: "#c1d1e1",
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
  fontFamily: {
    body: `var(--font-open-sans), Arial, sans-serif`,
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
      md: 768,
      lg: 1200,
      xl: 1536,
    },
  },
});
