import { Stack } from "@/lib/ui";
import { StackProps } from "@mui/joy";

export const ModalContent = ({ ...props }: StackProps) => {
  return (
    <Stack sx={{ padding: "15px 15px" }} {...props}>
      {props.children}
    </Stack>
  );
};
