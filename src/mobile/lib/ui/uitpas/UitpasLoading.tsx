import { CircularProgress, Stack, StackProps } from "@mui/material";
import uitpasLogoGreen from "public/images/svg/logo-uitpas-green.svg";
import Image from "next/image";

export const UitpasLoading = ({ ...props }: StackProps) => {
  return (
    <Stack
      sx={{
        height: "100vh",
        alignItems: "center",
        justifyContent: "center",
        gap: 2,
        ...props.sx,
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
          margin: "0 auto",
        }}
        priority={true}
      />
      <CircularProgress />
    </Stack>
  );
};
