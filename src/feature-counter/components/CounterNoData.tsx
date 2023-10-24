import { LoginButton } from "@/feature-login/components/LoginButton";
import { Typography } from "@/lib/ui";
import { useTranslation } from "react-i18next";

export const CounterNoData = () => {
  const { t } = useTranslation();
  return (
    <>
      <Typography
        sx={(theme) => ({
          fontStyle: "italic",
          color: theme.vars.palette.neutral[500],
        })}
      >
        {t("counter.noCounterP1")}
      </Typography>
      <Typography
        sx={(theme) => ({
          fontStyle: "italic",
          color: theme.vars.palette.neutral[500],
          pb: "1em",
        })}
      >
        {t("counter.noCounterP2")}
      </Typography>

      <LoginButton>{t("login.loginOtherAccountBtn")}</LoginButton>
    </>
  );
};
