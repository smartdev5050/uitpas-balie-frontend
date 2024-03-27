"use client";

import { styled } from "@mui/material";
import NextLink from "next/link";

export const Link = styled(NextLink)(({ theme }) => ({
  padding: "0 16px",
  textAlign: "center",
  fontSize: "16px",
  fontWeight: 700,
  color: theme.palette.secondary.main,
}));
