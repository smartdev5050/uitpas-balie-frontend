import { styled } from "@mui/system";
import Link from "next/link";

export const Header = styled("header")(({ theme }) => ({
  display: "flex",
  backgroundColor: theme.palette.grey["900"],
  color: theme.palette.text.contrastText,
}));

export const LogoLink = styled(Link)({
  padding: "16px 10px",
});

export const NavLink = styled(Link)(({ theme }) => ({
  padding: "16px 10px",
  display: "block",
  color: theme.palette.text.contrastText,
  "&:hover": {
    textDecoration: "none",
  },
}));
