import { Input, styled } from "@mui/joy";
import { Button } from "@/lib/ui";

export const StyledSearchInput = styled(Input)(({ theme }) => ({
  ml: "auto",
  border: `1px #ccc solid`,
  "--Input-placeholderOpacity": 0.4,
  "--Input-minHeight": "37px",
  "&:focus-within::before": {
    borderColor: "#bababa",
    boxShadow: "none",
  },
  borderRadius: 0,
  fontSize: "15px",
  color: "#555",
  flex: 1,
}));

export const StyledSearchButton = styled(Button)(({ theme }) => ({
  width: "100px",
  "--Button-minHeight": "37px",
  display: "inline-block",
  cursor: "pointer",
  padding: "8px 12px",
  verticalAlign: "middle",
  fontSize: "15px",
  lineHeight: "1.333333",
  userSelect: "none",
  border: `1px #ccc solid`,
  borderLeft: "none",
  backgroundColor: theme.palette.primary.solidColor,
  color: "#333",

  "&:hover": {
    backgroundColor: theme.palette.neutral[200],
  },

  transition:
    "color 150ms ease-in-out, background 150ms ease-in-out, border 150ms ease-in-out",

  "&:disabled": {
    backgroundColor: theme.palette.neutral[200],
    color: theme.palette.neutral[800],
  },
}));

export const StyledSearchForm = styled("form")(({ theme }) => ({
  alignSelf: "flex-end",
  width: "50%",

  [theme.breakpoints.down("md")]: {
    width: "100%",
  },
}));
