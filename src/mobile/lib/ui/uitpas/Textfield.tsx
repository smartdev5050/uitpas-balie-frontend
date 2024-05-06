"use client";

import {
  SxProps,
  TextField as MuiTextField,
  TextFieldProps,
  Theme,
} from "@mui/material";

export const TextField = ({ ...props }: TextFieldProps) => {
  return (
    <MuiTextField
      fullWidth
      variant="outlined"
      inputProps={{
        sx: ((theme: Theme): SxProps<Theme> => ({
          backgroundColor: theme.palette.neutral[0],
          "&::placeholder": {
            color: theme.palette.neutral[900],
            opacity: 1,
          },
          color: theme.palette.neutral[900],
          fontSize: "18px",
          borderRadius: "8px",
          height: "44px",
          boxSizing: "border-box",
          ...props.sx,
        })) as SxProps<Theme>,
      }}
      sx={(theme) => ({
        fieldSet: { borderColor: theme.palette.neutral[200] },
      })}
      {...props}
    />
  );
};
