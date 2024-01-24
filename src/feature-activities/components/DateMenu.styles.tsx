import PopperUnstyled from "@mui/base/PopperUnstyled";
import { styled } from "@mui/joy";
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
    background-color: ${theme.palette.neutral[50]};
    border: 1px solid ${theme.palette.neutral.plainBorder};
    border-radius: 0;
    box-shadow: 0 6px 12px rgb(0 0 0 / 18%);
    background-clip: padding-box;
  `
);

export const TriggerButton = styled(
  forwardRef(function ButtonWrapper(
    {
      active,
      disabled,
      ...buttonProps
    }: HTMLProps<HTMLButtonElement> & { active: boolean; disabled?: boolean },
    ref: ForwardedRef<HTMLButtonElement>
  ) {
    return (
      <button
        {...buttonProps}
        type={buttonProps.type as ButtonHTMLAttributes<unknown>["type"]}
        disabled={disabled}
        ref={ref}
      />
    );
  })
)(({ theme, active, disabled = false }) => ({
  display: "inline-block",
  cursor: "pointer",
  padding: "8px 12px",
  maxHeight: "38px",
  verticalAlign: "middle",
  fontSize: "15px",
  lineHeight: "1.333333",
  userSelect: "none",
  border: `1px solid ${theme.palette.neutral.plainBorder}`,
  backgroundColor: theme.palette.primary.solidColor,
  color: theme.palette.text.primary,

  "&:hover": {
    backgroundColor: theme.palette.neutral[200],
  },

  transition:
    "color 150ms ease-in-out, background 150ms ease-in-out, border 150ms ease-in-out",

  ...(active && {
    backgroundColor: theme.vars.palette.neutral[300],
    textDecoration: "none",
  }),

  ...(disabled && {
    backgroundColor: theme.palette.neutral[200],
    "&:hover": {
      cursor: "not-allowed",
    },
  }),
}));

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

export const StyledDivider = styled("li")(({ theme }) => ({
  height: "1px",
  margin: "8.5px 0",
  backgroundColor: theme.palette.neutral[400],
  overflow: "hidden",
}));

export const Popper = styled(PopperUnstyled)`
  z-index: 1;
`;
