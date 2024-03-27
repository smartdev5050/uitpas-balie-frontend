"use client";

import { useGetPermissions } from "@/shared/lib/dataAccess";
import { CircularProgress, Stack } from "@mui/material";
import Image from "next/image";
import uitpasLogoGreen from "public/images/svg/logo-uitpas-green.svg";
import { CounterNoData } from "@/mobile/feature-counter";

export const CounterPage = () => {
  const { data: allData, isSuccess, isLoading } = useGetPermissions();

  return (
    <Stack
      sx={{
        height: "100vh",
        px: 2,
      }}
    >
      <Stack
        sx={{
          margin: "49px 0 0 0",
          alignItems: "center",
          width: "100%",
          height: "100%",
          gap: 4,
        }}
      >
        <Image
          src={uitpasLogoGreen}
          alt="uitpas logo green"
          style={{
            maxWidth: "300px",
            maxHeight: "8vh",
            width: "auto",
            height: "100%",
          }}
        />
        {isLoading ? (
          <CircularProgress sx={{ my: "auto" }} />
        ) : isSuccess && allData.data.length > 0 ? (
          "TODO COUNTERS"
        ) : (
          <CounterNoData />
        )}
      </Stack>
    </Stack>
  );
};
