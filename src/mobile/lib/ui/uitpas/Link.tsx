"use client";

import { useTheme } from "@mui/material";
import NextLink, { LinkProps as NextLinkProps } from "next/link";
import { PropsWithChildren } from "react";

type LinkProps = NextLinkProps &
  PropsWithChildren & {
    color: "primary" | "secondary";
  };

export const Link = ({ ...props }: LinkProps) => {
  const theme = useTheme();
  return (
    <NextLink
      {...props}
      style={{
        color: theme.palette[props.color].main,
        padding: "0 16px",
        textAlign: "center",
        fontSize: "16px",
        fontWeight: 700,
      }}
    >
      {props.children}
    </NextLink>
  );
};
