import { styled } from "@mui/joy";
import { Link, Stack, Typography } from "@/lib/ui";
import { AnchorHTMLAttributes, DetailedHTMLProps, MouseEvent } from "react";

export const StyledPageContainerStack = styled(Stack)({
  margin: "24px 16px",
  alignContent: "flex-start",
});

export const StyledPageTitle = styled(Typography)({
  fontSize: "18px",
  textTransform: "uppercase",
  borderBottom: "1px solid",
  marginBottom: "12px",
  paddingBottom: "12px",
});

export const StyledUserInputStack = styled(Stack)(({ theme }) => ({
  flexDirection: "row",
  justifyContent: "space-between",
  marginBottom: "15px",

  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    rowGap: "24px",
  },
}));

export const StyledActivityStack = styled(Stack)(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.neutral[400]}`,
  justifyContent: "space-between",
  minHeight: "90px",
  "&:hover": {
    cursor: "pointer",
    backgroundColor: theme.palette.info.softBg,
    transition: "background 150ms ease-in-out",
  },

  [theme.breakpoints.up("md")]: {
    flexDirection: "row",
    "> :last-child": {
      backgroundColor: theme.palette.neutral[200],
    },
    "&:hover > :last-child": {
      backgroundColor: theme.palette.info.softBorder,
      transition: "background 150ms ease-in-out",
    },
  },
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    alignItems: "center",
  },
}));

export const StyledItemStack = styled(Stack)(({ theme }) => ({
  flexGrow: 100,
  padding: "6px 10px",
  justifyContent: "center",
  alignItems: "flex-start",

  [theme.breakpoints.down("md")]: {
    alignItems: "center",
  },
}));

export const StyledEventDate = styled(Typography)(({ theme }) => ({
  color: theme.palette.neutral[500],
}));

export const StyledEventName = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.mainChannel,
  fontSize: "16px",
  fontWeight: 700,
  lineHeight: "1.1",
}));

export const StyledActionsStack = styled(Stack)(({ theme }) => ({
  flexDirection: "row",
  minWidth: "500px",
  width: 1 / 2,
  justifyContent: "flex-end",
  alignItems: "center",
  padding: "0 16px",
  gap: "16px",

  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    minWidth: "0",
    width: "max-content",
    "& > a:last-child": {
      marginBottom: "12px",
    },
  },
}));

const StyledActionLink = styled(Link)(({ theme }) => ({
  textDecoration: "none",
  display: "flex",
  cursor: "pointer",
  padding: "6px 5px",
  flexDirection: "column",
  justifyContent: "center",
  textAlign: "center",
  fontSize: "13px",
  fontFamily: "Open Sans,Arial,sans-serif",
  lineHeight: "1.333333",
  userSelect: "none",
  border: `1px #ccc solid`,
  backgroundColor: theme.palette.primary.solidColor,
  color: "#333",
  minWidth: "118px",
  minHeight: "29px",
  maxHeight: "45px",
  width: "100%",
  height: "max-content",
  transition:
    "color 150ms ease-in-out, background 150ms ease-in-out, border 150ms ease-in-out",
  "&:hover": {
    backgroundColor: theme.palette.neutral[200],
  },

  [theme.breakpoints.up("md")]: {
    maxWidth: "auto",
  },
}));

type ActionLinkProps = {
  allowPropagation?: boolean;
  onClick?: (e: MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
};

export const ActionLink = ({
  allowPropagation = false,
  ...props
}: { allowPropagation?: boolean } & DetailedHTMLProps<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
>) => {
  return (
    <StyledActionLink
      as={Link}
      onClick={(e) => {
        if (!allowPropagation) {
          e.stopPropagation();
        }
      }}
      {...props}
    >
      {props.children}
    </StyledActionLink>
  );
};
