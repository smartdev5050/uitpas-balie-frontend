"use client";

import { styled } from "@mui/joy";

export const Link = styled("a")(({ theme }) => ({
  transition:
    "color 150ms ease-in-out,background 150ms ease-in-out,border 150ms ease-in-out",
  cursor: "pointer",
  textDecoration: "underline",
  backgroundColor: "transparent",
  color: theme.vars.palette.primary.mainChannel,
  "&:hover": {
    color: theme.vars.palette.primary.darkChannel,
    textDecoration: "none",
  },
}));
