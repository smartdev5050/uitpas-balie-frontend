import { styled } from "@mui/system";

export const Link = styled("a")(({ theme }) => ({
  transition:
    "color 150ms ease-in-out,background 150ms ease-in-out,border 150ms ease-in-out",
  cursor: "pointer",
  textDecoration: "underline",
  backgroundColor: "transparent",
  color: theme.palette.primary.main,
  "&:hover": {
    color: theme.palette.primary.darker,
    textDecoration: "none",
  },
}));
