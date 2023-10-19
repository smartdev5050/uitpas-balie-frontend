import { useTranslation } from "next-i18next";
import { Box, Stack, Typography } from "@/lib/ui";
import Image from "next/image";
import { CounterPicker } from "./CounterPicker";
import { useUserInfo } from "@/lib/user";
import { getAssetUrl } from "@/lib/utils";

export const SelectCounterPage = () => {
  const { t } = useTranslation();
  const userInfo = useUserInfo();

  return (
    <Box sx={{ m: "40px auto;", pt: 12, maxWidth: 500 }}>
      <Stack>
        <Box display="flex" flexDirection="column" alignItems="center">
          <Image
            src={getAssetUrl("/images/svg/logo-uitpas-full.svg")}
            alt={"UiTPAS Logo"}
            width={280}
            height={84}
          />
        </Box>

        <Box sx={{ px: { xs: 2, sm: 0 } }}>
          <Typography level="h1">
            {t("counter.welcome", { name: userInfo?.given_name })}
          </Typography>
          <Typography level="h2" sx={{ mt: "-.5em" }}>
            {t("counter.selectCounter")}
          </Typography>

          <CounterPicker />
        </Box>
      </Stack>
    </Box>
  );
};
