import { Box } from "@/lib/ui";
import { FC, PropsWithChildren } from "react";
import { BoxProps } from "../system/Box";

export type TypographyProps = BoxProps & {
  variant?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
};
export const Typography: FC<PropsWithChildren<TypographyProps>> = ({
  variant,
  sx,
  ...other
}) => {
  return (
    <Box
      sx={{ ...sx, typography: variant }}
      component={variant?.startsWith("h") ? variant : "p"}
      {...other}
    />
  );
};
