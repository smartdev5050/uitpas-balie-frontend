import { Button as MuiButton, ButtonProps, Theme } from "@mui/material";

export const OutlinedButton = ({ ...props }: ButtonProps) => {
  return (
    <MuiButton
      variant="outlined"
      fullWidth
      {...props}
      sx={{
        minHeight: "44px",
        height: "44px",
        borderRadius: "16px",
        textTransform: "none",
        fontWeight: 700,
        fontSize: "16px",
        border: "2px solid",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textAlign: "center",
        display: "block",
        borderColor: (theme: Theme) => theme.palette.primary.main,
        ...props.sx,
      }}
    >
      {props.children}
    </MuiButton>
  );
};
