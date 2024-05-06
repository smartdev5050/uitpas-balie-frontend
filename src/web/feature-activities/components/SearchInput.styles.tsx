import { Input, styled } from "@mui/joy";
import { Button, Stack } from "@/web/lib/ui";

const componentHeight = 40;

export const StyledSearchStack = styled(Stack)(({ theme }) => ({
  flexDirection: "row",
  maxHeight: `${componentHeight}px`,
  "&:focus-within": {
    boxShadow: `0 0 8px ${theme.palette.info[200]}`,
  },
}));

export const StyledSearchInput = styled(Input)(({ theme }) => ({
  border: `1px ${theme.palette.neutral.plainBorder} solid`,
  "--Input-placeholderOpacity": 0.4,
  "--Input-minHeight": `${componentHeight}px`,
  "&:focus-within::before": {
    borderColor: theme.palette.neutral.solidBorder,
    boxShadow: "none",
  },
  borderRadius: 0,
  fontSize: "15px",
  color: theme.palette.neutral[800],
  flex: 1,
}));

export const StyledSearchButton = styled(Button)(({ theme }) => ({
  width: "100px",
  "--Button-minHeight": `${componentHeight}px`,
  display: "inline-block",
  cursor: "pointer",
  padding: "8px 12px",
  verticalAlign: "middle",
  fontSize: "15px",
  lineHeight: "1.333333",
  userSelect: "none",
  border: `1px solid ${theme.palette.neutral.plainBorder}`,
  borderLeft: "none",
  backgroundColor: theme.palette.primary.solidColor,
  color: theme.palette.text.primary,

  "&:hover": {
    backgroundColor: theme.palette.neutral[200],
  },

  transition:
    "color 150ms ease-in-out, background 150ms ease-in-out, border 150ms ease-in-out",

  "&:disabled": {
    backgroundColor: theme.palette.neutral[200],
    color: theme.palette.neutral[800],
  },
}));
export const StyledSearchForm = styled("form")<{ customInput?: boolean }>(
  ({ theme, customInput = false }) => ({
    alignSelf: "flex-end",
    width: "50%",
    [theme.breakpoints.down("md")]: {
      width: "100%",
    },

    ...(customInput && {
      maxWidth: "500px",
      width: "100%",
      [theme.breakpoints.down("lg")]: {
        width: "100%",
        maxWidth: "none",
      },
    }),
  })
);
