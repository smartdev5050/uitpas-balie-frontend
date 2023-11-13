import Image from "next/image";
import { useTranslation } from "next-i18next";
import { Box, Stack, Typography } from "@/lib/ui";
import { SiteLoginIntro } from "./Login.styles";
import { LoginButton } from "./LoginButton";
import { getAssetUrl } from "@/lib/utils";

export const LoginPage = () => {
  const { t } = useTranslation();

  return (
    <Box sx={{ m: "0 auto;", pt: 12, maxWidth: 500 }}>
      <Stack>
        <Box display="flex" flexDirection="column" alignItems="center">
          <Image
            src={getAssetUrl("/images/svg/logo-uitpas-full.svg")}
            alt={"UiTPAS Logo"}
            width={280}
            height={84}
            priority
          />
          <Typography>{t("appName")}</Typography>
        </Box>

        <Box>
          <SiteLoginIntro>{t("login.intro")}</SiteLoginIntro>
        </Box>

        <Box textAlign="center">
          <LoginButton>{t("login.loginBtn")}</LoginButton>
        </Box>
      </Stack>
    </Box>
  );
};
