import { Link, Typography } from "@/mobile/lib/ui";
import { Box } from "@mui/material";

export const CounterContactsPage = () => {
  return (
    <Box
      sx={(theme) => ({
        backgroundColor: theme.palette.background.primary,
        height: "100vh",
      })}
    >
      <Typography variant="h1">Waiting on design</Typography>
      <Link href="/mobile/counters">CLICK HERE TO GO BACK</Link>
    </Box>
  );
};
