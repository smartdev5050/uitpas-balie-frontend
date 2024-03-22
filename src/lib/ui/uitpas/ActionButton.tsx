"use client";

import { styled } from "@mui/joy";
import { Link } from "@/lib/ui";

export const ActionButton = styled(Link)(({ theme }) => ({
  textDecoration: "none",
  display: "flex",
  cursor: "pointer",
  padding: "8px 12px",
  flexDirection: "column",
  justifyContent: "center",
  textAlign: "center",
  fontSize: "15px",
  fontFamily: "Open Sans,Arial,sans-serif",
  lineHeight: "1.333333",
  userSelect: "none",
  border: `1px ${theme.palette.neutral.plainBorder} solid`,
  backgroundColor: theme.palette.primary.solidColor,
  color: theme.palette.text.primary,
  minHeight: "29px",
  maxHeight: "45px",
  width: "max-content",
  height: "max-content",
  transition:
    "color 150ms ease-in-out, background 150ms ease-in-out, border 150ms ease-in-out",
  "&:hover": {
    backgroundColor: theme.palette.neutral[200],
  },
}));
