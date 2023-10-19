import { useTranslation } from "next-i18next";
import { Box, Stack, Typography } from "@/lib/ui";
import Image from "next/image";
import { CounterPicker } from "./CounterPicker";
import { useUserInfo } from "@/lib/user";
import { getAssetUrl } from "@/lib/utils";
import { Input } from "@mui/joy";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

export const SelectCounterPage = () => {
  const { t } = useTranslation();
  const userInfo = useUserInfo();
  const [searchString, setSearchString] = useState<string>("");

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchString(e.target.value);
  };

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

        <Box
          sx={{
            px: { xs: 2, sm: 0 },
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography level="h1" sx={{ alignSelf: "center" }}>
            {t("counter.welcome", { name: userInfo?.given_name ?? "" })}
          </Typography>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: "0.5em",
            }}
          >
            <Typography level="h2" sx={{ m: 0 }}>
              {t("counter.selectCounter")}
            </Typography>
            <Input
              placeholder="Zoek balie"
              variant="plain"
              startDecorator={<FontAwesomeIcon icon={faMagnifyingGlass} />}
              sx={{
                ml: "auto",
                border: "1px #969ca5 solid",
                "--Input-focusedHighlight": "#2f3b4d",
                "--Input-focusedThickness": "1px",
                fontWeight: 600,
                letterSpacing: "4px",
              }}
              onChange={handleSearchInputChange}
            />
          </Box>
          <CounterPicker searchString={searchString} />
        </Box>
      </Stack>
    </Box>
  );
};
