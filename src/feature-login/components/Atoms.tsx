import { styled } from "@mui/system";
import { Typography } from "@/lib/ui";

export const SiteLoginIntro = styled(Typography)(({ theme }) => ({
  color: theme.palette.grey["600"],
  fontStyle: "italic",
  textAlign: "center",
  margin: `${theme.spacing(5)} 0`,
}));
