import { Box } from "@/lib/ui";
import { FC, PropsWithChildren } from "react";
import { BoxProps } from "../system/Box";

type ElementVariants = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
export type TypographyProps = BoxProps & {
  variant?: ElementVariants | "body2";
};
export const Typography: FC<PropsWithChildren<TypographyProps>> = ({
  variant,
  sx,
  component,
  ...other
}) => {
  return (
    <Box
      sx={{ ...sx, typography: variant }}
      component={
        component ?? variant?.startsWith("h")
          ? (variant as ElementVariants)
          : variant === "body2"
          ? "span"
          : "p"
      }
      {...other}
    />
  );
};
