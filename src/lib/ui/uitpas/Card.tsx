import { styled } from "@mui/system";

export const Card = styled("div")(({ theme }) => ({
  marginBottom: theme.spacing(2.5),
  backgroundColor: "#fff",
  border: `1px solid ${theme.palette.grey[400]}`,
  borderRadius: "0",
  width: "100%",
}));

export const CardContent = styled("div")(({ theme }) => ({
  padding: theme.spacing(2.5),
}));
