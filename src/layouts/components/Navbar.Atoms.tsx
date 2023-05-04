import { styled, Theme } from "@mui/joy";
import Link from "next/link";
import {
  ButtonHTMLAttributes,
  ForwardedRef,
  forwardRef,
  HTMLProps,
} from "react";
import MenuItemUnstyled, {
  menuItemUnstyledClasses,
} from "@mui/base/MenuItemUnstyled";
import PopperUnstyled from "@mui/base/PopperUnstyled";

export const Header = styled("header")(({ theme }) => ({
  display: "flex",
  backgroundColor: theme.vars.palette.neutral["600"],
  color: theme.vars.palette.neutral[50],
  position: "fixed",
  width: "100%",
}));

export const LogoLink = styled(Link)({
  padding: "16px 10px",
});

const navItemStyles = ({ theme }: { theme: Theme }) => ({
  cursor: "pointer",
  padding: "16px 10px",
  display: "block",
  color: theme.vars.palette.neutral[50],
  // @ts-ignore
  fontSize: theme.typography.body1.fontSize,
  textDecoration: "underline",
  "&:hover": {
    textDecoration: "none",
  },
});

export const NavLink = styled(Link)(({ theme }) => navItemStyles({ theme }));

export const TriggerButton = styled(
  forwardRef(
    (
      {
        active,
        ...buttonProps
      }: HTMLProps<HTMLButtonElement> & { active: boolean },
      ref: ForwardedRef<HTMLButtonElement>
    ) => (
      <button
        {...buttonProps}
        type={buttonProps.type as ButtonHTMLAttributes<unknown>["type"]}
        ref={ref}
      />
    )
  )
)(({ theme, active }) => ({
  ...navItemStyles({ theme }),
  background: "none",
  border: "none",
  display: "flex",
  alignItems: "center",

  ...(active && {
    backgroundColor: theme.vars.palette.neutral[800],
    textDecoration: "none",
  }),
}));

export const StyledListbox = styled("ul")(
  ({ theme }) => `
    min-width: 160px;
    padding: 5px 0;
    margin: 2px 0 0;
    list-style: none;
    font-size: 15px;
    text-align: left;
    background-color: #fff;
    border: 1px solid #ccc;
    border: 1px solid rgba(0, 0, 0, 0.15);
    border-radius: 0;
    box-shadow: 0 6px 12px rgb(0 0 0 / 18%);
    background-clip: padding-box;
  `
);

export const StyledMenuItem = styled(MenuItemUnstyled)(
  ({ theme }) => `
      margin-bottom: 0.3em;
      
      &.${menuItemUnstyledClasses.focusVisible} {
        outline: none;
      }
      
      &.${menuItemUnstyledClasses.focusVisible} a {
        text-decoration: none;
        color: ${theme.vars.palette.neutral[800]};
        background-color: ${theme.vars.palette.neutral[300]};
      }
  `
);
export const StyledLink = styled(Link)(
  ({ theme }) => `
    display: block;
    padding: 3px 20px;
    clear: both;
    font-weight: normal;
    line-height: 1.3333333;
    color: ${theme.palette.text.primary};
    white-space: nowrap;
    
    
    &:hover {
      text-decoration: none;
      color: ${theme.vars.palette.neutral[800]};
      background-color: ${theme.vars.palette.neutral[300]};
    }
`
);

export const Popper = styled(PopperUnstyled)`
  z-index: 1;
`;
