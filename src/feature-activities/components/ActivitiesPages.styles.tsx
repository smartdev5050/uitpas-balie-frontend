import { styled } from "@mui/joy";
import { Link, Stack, Typography } from "@/lib/ui";
import {
  ButtonHTMLAttributes,
  ForwardedRef,
  forwardRef,
  HTMLProps,
} from "react";

export const StyledPageContainerStack = styled(Stack)({
  margin: "24px 16px",
  alignContent: "flex-start",
});

export const StyledPageTitle = styled(Typography)({
  fontSize: "18px",
  textTransform: "uppercase",
  borderBottom: "1px solid",
  marginBottom: "12px",
  paddingBottom: "12px",
});

export const StyledUserInputStack = styled(Stack)(({ theme }) => ({
  flexDirection: "row",
  justifyContent: "space-between",
  marginBottom: "15px",

  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    rowGap: "24px",
  },
}));

export const StyledActivityStack = styled(Stack)(({ theme }) => ({
  borderBottom: "1px solid #e5e5e5",
  justifyContent: "space-between",
  minHeight: "90px",
  "&:hover": {
    cursor: "pointer",
    backgroundColor: "#e4eef5",
    transition: "background 150ms ease-in-out",
  },

  [theme.breakpoints.up("md")]: {
    flexDirection: "row",
    "> :last-child": {
      backgroundColor: "#f3f3f3",
    },
    "&:hover > :last-child": {
      backgroundColor: "#c1d1e1",
      transition: "background 150ms ease-in-out",
    },
  },
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    alignItems: "center",
  },
}));

export const StyledItemStack = styled(Stack)(({ theme }) => ({
  flexGrow: 100,
  padding: "6px 10px",
  justifyContent: "center",
  alignItems: "flex-start",

  [theme.breakpoints.down("md")]: {
    alignItems: "center",
  },
}));

export const StyledEventDate = styled(Typography)({
  color: "#8a8a8d",
});

export const StyledEventName = styled(Typography)({
  color: "#2a4b9c",
  fontSize: "16px",
  fontWeight: 700,
  lineHeight: "1.1",
});

export const StyledActionsStack = styled(Stack)(({ theme }) => ({
  flexDirection: "row",
  minWidth: "500px",
  width: 1 / 2,
  justifyContent: "flex-end",
  alignItems: "center",
  padding: "0 16px",
  gap: "16px",

  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    minWidth: "0",
    width: "max-content",
    "& > a:last-child": {
      marginBottom: "12px",
    },
  },
}));

export const ActionLink = styled(Link)(({ theme }) => ({
  textDecoration: "none",
  display: "flex",
  cursor: "pointer",
  padding: "6px 5px",
  flexDirection: "column",
  justifyContent: "center",
  textAlign: "center",
  fontSize: "13px",
  fontFamily: "Open Sans,Arial,sans-serif",
  lineHeight: "1.333333",
  userSelect: "none",
  border: `1px #ccc solid`,
  backgroundColor: theme.palette.primary.solidColor,
  color: "#333",
  minWidth: "118px",
  minHeight: "29px",
  maxHeight: "45px",
  width: "100%",
  height: "max-content",
  transition:
    "color 150ms ease-in-out, background 150ms ease-in-out, border 150ms ease-in-out",
  "&:hover": {
    backgroundColor: theme.palette.neutral[200],
  },

  [theme.breakpoints.up("md")]: {
    maxWidth: "auto",
  },
}));
