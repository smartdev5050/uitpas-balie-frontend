import { useTranslation } from "next-i18next";
import { Box, Stack, Typography } from "@/lib/ui";
import Image from "next/image";
import { CounterPicker } from "./CounterPicker";
import { useUserInfo } from "@/lib/user";
import { getAssetUrl } from "@/lib/utils";
import { CircularProgress, Input } from "@mui/joy";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ChangeEvent, useEffect, useState } from "react";
import { useGetPermissions } from "@/lib/dataAccess";
import { useCounter } from "@/feature-counter";

export const SelectCounterPage = () => {
  const { t } = useTranslation();
  const userInfo = useUserInfo();
  const [searchString, setSearchString] = useState<string>("");
  const { data: allData, isSuccess, isLoading } = useGetPermissions();
  const { setActiveCounter, lastCounterUsed } = useCounter();

  const data =
    allData?.data?.filter(
      (permission) => permission.organizer.id !== lastCounterUsed?.id
    ) ?? [];

  const handleSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchString(e.target.value);
  };

  const filteredData = data?.filter((organizer) =>
    organizer.organizer.name?.toLowerCase().includes(searchString.toLowerCase())
  );

  useEffect(() => {
    const data = allData?.data || [];
    if (data.length === 1) {
      setActiveCounter(data[0].organizer);
    }
  }, [allData?.data, setActiveCounter]);

  return (
    <Box sx={{ m: "40px auto;", pt: 12, maxWidth: 500 }}>
      <Stack>
        <Box display="flex" flexDirection="column" alignItems="center">
          <Image
            src={getAssetUrl("/images/svg/logo-uitpas-full.svg")}
            alt={"UiTPAS Logo"}
            width={280}
            height={84}
            priority
          />
        </Box>

        <Box
          sx={{
            px: { xs: 2, sm: 0 },
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography
            level="h1"
            sx={{ alignSelf: "center", m: 0, pt: "0.3em", pb: "1.2em" }}
          >
            {t("counter.welcome", { name: userInfo?.given_name ?? "" })}
          </Typography>

          {data.length > 0 && (
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
                placeholder={`${t("counter.searchCounter")}`}
                variant="plain"
                startDecorator={<FontAwesomeIcon icon={faMagnifyingGlass} />}
                sx={(theme) => ({
                  ml: "auto",
                  border: `1px ${theme.vars.palette.neutral.solidBorder} solid`,
                  "--Input-focusedHighlight":
                    theme.vars.palette.primary.darkChannel,
                  "--Input-focusedThickness": "1px",
                  fontWeight: 600,
                  letterSpacing: "4px",
                })}
                onChange={handleSearchInputChange}
              />
            </Box>
          )}
          <CounterPicker
            data={filteredData}
            filterString={searchString}
            isLoading={isLoading}
          />
        </Box>
      </Stack>
    </Box>
  );
};
