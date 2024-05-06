"use client";

import {
  LoadingButton as MuiLoadingButton,
  LoadingButtonProps,
} from "@mui/lab";

export const LoadingButton = ({ ...props }: LoadingButtonProps) => {
  return (
    <MuiLoadingButton
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
    </MuiLoadingButton>
  );
};
