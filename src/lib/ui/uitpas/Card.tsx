import { styled } from "@mui/joy";

export const Card = styled("div")(({ theme }) => ({
  marginBottom: theme.spacing(2.5),
  backgroundColor: "#fff",
  border: `1px solid ${theme.vars.palette.neutral[400]}`,
  borderRadius: "0",
  width: "100%",
}));

export const CardContent = styled("div")(({ theme }) => ({
  padding: theme.spacing(2.5),
}));
