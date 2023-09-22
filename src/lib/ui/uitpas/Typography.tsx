import { styled, TypographyProps } from "@mui/joy";
import { Typography as MuiTypography } from "@mui/joy";

export const SideBarTitle = styled((props: TypographyProps) => (
  <MuiTypography level={"h1"} {...props} />
))`
  font-size: 1.6em;
  margin: 0 0 0.6em;
`;

export const SideBarSubTitle = styled((props: TypographyProps) => (
  <MuiTypography level={"h3"} {...props} />
))`
  color: #8a8a8d;
  font-size: 1em;
  font-weight: 400;
  text-shadow: 1px 1px #fff;
`;

export const Typography = MuiTypography;
