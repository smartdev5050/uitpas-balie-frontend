import { MenuItemUnstyled, menuItemUnstyledClasses } from "@mui/base";
import PopperUnstyled from "@mui/base/PopperUnstyled";
import { Theme, styled } from "@mui/joy";
import {
  forwardRef,
  HTMLProps,
  ForwardedRef,
  ButtonHTMLAttributes,
} from "react";

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

const navItemStyles = ({ theme }: { theme: Theme }) => ({
  cursor: "pointer",
  padding: "16px 10px",
  display: "inline-block",
  color: theme.vars.palette.neutral[50],
  // @ts-ignore
  fontSize: theme.typography.body1.fontSize,
  textDecoration: "underline",
  "&:hover": {
    textDecoration: "none",
  },
});

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
  display: "inline-block",
  cursor: "pointer",
  padding: "8px 12px",
  maxHeight: "38px",
  verticalAlign: "middle",
  fontSize: "15px",
  lineHeight: "1.333333",
  userSelect: "none",
  border: `1px #ccc solid`,
  backgroundColor: theme.palette.primary.solidColor,
  color: "#333",

  "&:hover": {
    backgroundColor: theme.palette.neutral[200],
  },

  transition:
    "color 150ms ease-in-out, background 150ms ease-in-out, border 150ms ease-in-out",

  ...(active && {
    backgroundColor: theme.vars.palette.neutral[300],
    textDecoration: "none",
  }),
}));

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

export const StyledDateItem = styled("a")(
  ({ theme }) => `
    cursor: pointer;
    display: block;
    padding: 3px 20px;
    clear: both;
    font-weight: normal;
    line-height: 1.3333333;
    color: ${theme.palette.text.primary};
    white-space: nowrap;
    text-decoration: underline;
    
    
    &:hover {
      text-decoration: none;
      color: ${theme.vars.palette.neutral[800]};
      background-color: ${theme.vars.palette.neutral[300]};
    }
  `
);

export const StyledDivider = styled("li")({
  height: "1px",
  margin: "8.5px 0",
  backgroundColor: "#e5e5e5",
  overflow: "hidden",
});

export const Popper = styled(PopperUnstyled)`
  z-index: 1;
`;
