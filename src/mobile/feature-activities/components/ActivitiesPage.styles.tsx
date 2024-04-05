import { Stack, styled } from "@mui/material";

export const ScrollableActivitesContainer = styled(Stack)({
  height: "380px",
  overflowY: "auto",
  "::-webkit-scrollbar": {
    display: "none",
  },
  scrollbarWidth: "none",
  msOverflowStyle: "none",
  mb: 3,
  gap: "12px",
});
