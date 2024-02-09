import React, { Children, PropsWithChildren } from "react";
import { ModalCloseButton, Stack } from "@/lib/ui";

export const ModalHeader = ({ children }: PropsWithChildren) => {
  return (
    <Stack
      sx={(theme) => ({
        flexDirection: "row",
        alignItems: "center",
        justifyContent:
          Children.count(children) > 0 ? "space-between" : "flex-end",
        borderBottom: `1px solid ${theme.palette.neutral[400]}`,
        padding: "8px 4px 8px 12px",
      })}
    >
      {children}
      <ModalCloseButton />
    </Stack>
  );
};
