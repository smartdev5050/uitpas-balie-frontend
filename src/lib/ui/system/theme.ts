import { createTheme } from "@mui/system";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#2a4b9c",
      darker: "#1a2e60",
    },
    grey: {
      400: "#ddd",
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
      fontSize: 18,
      fontWeight: 700,
      lineHeight: 1.1,
    },
  },
});
