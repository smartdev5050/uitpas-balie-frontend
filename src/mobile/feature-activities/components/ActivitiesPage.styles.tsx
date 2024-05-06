import { Stack, styled } from "@mui/material";

export const ScrollableActivitesContainer = styled(Stack)(({ theme }) => ({
  height: "410px",
  overflowY: "scroll",
  "::-webkit-scrollbar": {
    width: "6px",
    color: theme.palette.primary.main,
  },
  "::-webkit-scrollbar-button": {
    background: "transparent",
  },
  "::-webkit-scrollbar-track-piece": {
    background: "transparent",
  },
  "::-webkit-scrollbar-thumb": {
    background: theme.palette.primary.main,
    borderRadius: "10px",
  },
  msOverflowStyle: "none",
  mb: 3,
  paddingRight: "8px",
  gap: "12px",
}));
