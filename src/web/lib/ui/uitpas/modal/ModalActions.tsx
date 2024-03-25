"use client";

import { StackProps } from "@mui/joy";
import { Stack } from "@/web/lib/ui";

export const ModalActions = ({ ...props }: StackProps) => {
  return (
    <Stack
      sx={(theme) => ({
        flexDirection: "row",
        padding: "15px",
        borderTop: `1px solid ${theme.palette.neutral[400]}`,
        justifyContent: "flex-end",
      })}
      {...props}
    >
      {props.children}
    </Stack>
  );
};
