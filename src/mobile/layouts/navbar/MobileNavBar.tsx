"use client";

import { useCounter } from "@/shared/feature-counter/context/useCounter";
import { PropsWithChildren } from "react";
import { Box } from "@mui/material";
import uitpasLogo from "public/images/svg/logo-uitpas.svg";
import Image from "next/image";
import { Settings } from "@mui/icons-material";
import { Typography } from "@/mobile/lib/ui";

export const MobileNavBar = ({ children }: PropsWithChildren) => {
  const { activeCounter } = useCounter();

  return (
    <>
      <Box
        sx={(theme) => ({
          display: "flex",
          justifyContent: "space-between",
          height: "46px",
          width: "100%",
          backgroundColor: theme.palette.navigation.primary,
          alignItems: "center",
          boxShadow: "0px 6px 9px rgba(0, 0, 0, 0.1)",
        })}
      >
        <Image
          src={uitpasLogo}
          alt="uitpas logo"
          width={102}
          height={25}
          style={{ marginLeft: "12px" }}
        />
        {activeCounter && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              mr: "8px",
            }}
          >
            <Typography variant="h1" sx={{ color: "white", paddingRight: 1 }}>
              {activeCounter.name}
            </Typography>
            <Settings sx={{ fontSize: 24, color: "white" }} />
          </Box>
        )}
      </Box>
      {children}
    </>
  );
};
