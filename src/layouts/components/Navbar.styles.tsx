import { IconButton, Stack, styled, Theme } from "@mui/joy";
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
  position: "absolute",
  width: "100%",
}));

export const NavBarStack = styled(Stack)(({ theme }) => ({
  width: "100%",
  paddingLeft: 1.5 * 8,
  paddingRight: 1.5 * 8,
  flexDirection: "row",

  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
  },
}));

export const LogoIconButtonStack = styled(Stack)(({ theme }) => ({
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  paddingRight: 16,

  [theme.breakpoints.down("md")]: {
    padding: 0,
  },
}));

export const HamburgerButton = styled(IconButton)({
  color: "white",
  width: "44px",
  height: "34px",
  border: "1px solid #333",
  borderRadius: 0,
  "&:hover": {
    backgroundColor: "#333",
  },
});

export const NavBarContentStack = styled(Stack)(({ theme }) => ({
  flexDirection: "row",
  alignItems: "center",
  borderTop: "none",
  borderBottom: "none",
  boxShadow: "none",
  marginTop: 0,
  paddingTop: 0,
  flexBasis: "100%",

  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    alignItems: "start",
    borderTop: `1px solid ${theme.vars.palette.neutral["700"]}`,
    borderBottom: `1px solid ${theme.vars.palette.neutral["700"]}`,
    boxShadow:
      "inset 0 1px 0px 0px rgba(255,255,255,0.1), 0 1px 0px 0px rgba(255,255,255,0.1)",
    marginTop: "0.5em",
    paddingTop: "7.75px",
  },
}));

export const UserStack = styled(Stack)(({ theme }) => ({
  flexDirection: "row",
  paddingTop: 0,
  paddingBottom: 0,
  alignItems: "center",
  marginLeft: "auto",

  [theme.breakpoints.down("md")]: {
    paddingTop: "0.5em",
    paddingBottom: "0.5em",
  },
}));

export const LogoLink = styled(Link)({
  display: "flex",
});

const navItemStyles = ({ theme }: { theme: Theme }) => ({
  cursor: "pointer",
  padding: "16px 10px",
  [theme.breakpoints.down("md")]: {
    padding: "10px 15px",
  },
  display: "block",
  color: theme.vars.palette.neutral[50],
  // @ts-ignore
  fontSize: theme.typography.body1.fontSize,
  textDecoration: "underline",
  "&:hover": {
    textDecoration: "none",
  },
});

export const NavLink = styled(Link)(({ theme }) => ({
  ...navItemStyles({ theme }),
  [theme.breakpoints.down("md")]: {
    width: "100%",
  },
}));

export const NavLinkMobile = styled(Link)(({ theme }) => ({
  ...navItemStyles({ theme }),
  width: "100%",
  padding: "5px 15px 5px 25px !important",
  marginTop: "0.2em",
}));

export const TriggerButton = styled(
  forwardRef(function ButtonWrapper(
    {
      active,
      ...buttonProps
    }: HTMLProps<HTMLButtonElement> & { active: boolean },
    ref: ForwardedRef<HTMLButtonElement>
  ) {
    return (
      <button
        {...buttonProps}
        type={buttonProps.type as ButtonHTMLAttributes<unknown>["type"]}
        ref={ref}
      />
    );
  })
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

  [theme.breakpoints.down("md")]: {
    width: "100%",
    padding: "10px 15px 10px 10px !important",
  },
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
