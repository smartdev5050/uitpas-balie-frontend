"use client";

import { Button as MuiButton, ButtonProps } from "@mui/material";

export const Button = ({ ...props }: ButtonProps) => {
  return (
    <MuiButton
      variant="contained"
      fullWidth
      {...props}
      sx={{
        height: "48px",
        borderRadius: "16px",
        textTransform: "none",
        fontWeight: 700,
        fontSize: "16px",
        ...props.sx,
      }}
    >
      {props.children}
    </MuiButton>
  );
};
