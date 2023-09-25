import { styled } from "@mui/joy";
import { Typography } from "@/lib/ui";

export const SiteLoginIntro = styled(Typography)(({ theme }) => ({
  color: theme.vars.palette.neutral["500"],
  fontStyle: "italic",
  textAlign: "center",
  margin: `${theme.spacing(5)} 0`,
}));
