import { useTranslation } from "next-i18next";
import { Grid, Stack, Link, Box } from "@/lib/ui";
import { Divider, styled } from "@mui/joy";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { PropsWithChildren, ReactNode } from "react";
import { Footer } from "./Footer";

const SideBarContainer = styled(Grid)(({ theme }) => ({
  padding: theme.spacing(2),
  paddingBottom: 0,
  backgroundColor: theme.vars.palette.neutral[200],
}));

type Props = PropsWithChildren & {
  hasBackButton?: boolean;
  sideBarContent: ReactNode;
};

export const PageWithSideBarNew = ({
  children,
  hasBackButton,
  sideBarContent,
}: Props) => {
  const { t } = useTranslation();
  return (
    <Box
      sx={{
        height: { xs: "100vh", sm: "auto" },
        overflowY: { xs: "auto", sm: "visible" },
      }}
    >
      <Grid container sx={{ marginTop: "56.38px" }}>
        <SideBarContainer xs={12} sm={5} md={4} lg={3}>
          <Stack spacing={2}>
            {hasBackButton && (
              <>
                <Link href={"/app"}>
                  <Stack direction="row" alignItems="center">
                    <FontAwesomeIcon
                      icon={faArrowLeft}
                      style={{ marginRight: "0.25rem" }}
                    />
                    {t("Terug")}
                  </Stack>
                </Link>
                <Divider />
              </>
            )}
            {sideBarContent}
          </Stack>
        </SideBarContainer>
        <Grid
          xs={12}
          sm={7}
          md={8}
          lg={9}
          sx={{
            height: "100vh",
            overflowY: { xs: "visible", sm: "auto" },
          }}
        >
          {children}
          <Footer />
        </Grid>
      </Grid>
    </Box>
  );
};
