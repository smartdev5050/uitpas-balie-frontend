import styled from "@emotion/styled";
import { Typography, TypographyProps } from "@mui/joy";
import { PropsWithChildren } from "react";

const StyledTypography = styled(Typography)`
  color: ${({ theme }) => theme.palette.primary.solidBg};
  text-decoration: underline;
  &:hover {
    cursor: pointer;
    text-decoration: none;
  }
`;

type Props = TypographyProps & PropsWithChildren;
export const AnchorButton = ({ children, ...props }: Props) => {
  return (
    <StyledTypography
      display="inline"
      level="body1"
      component="span"
      {...props}
    >
      {children}
    </StyledTypography>
  );
};
