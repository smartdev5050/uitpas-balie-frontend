import { memo } from "react";
import { Box } from "@/web/lib/ui";

type IFrameProps = {
  url: string;
};
export const IFrame = memo(({ url }: IFrameProps) => (
  <Box
    component="iframe"
    src={url}
    width="100%"
    height="100vh"
    flex={1}
    sx={{ paddingTop: "56.38px" }}
  />
));
IFrame.displayName = "IFrame";
