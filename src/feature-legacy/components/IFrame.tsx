import { memo } from "react";
import { Box } from "@/lib/ui";

type IFrameProps = {
  url: string;
};
export const IFrame = memo(({ url }: IFrameProps) => (
  <Box component="iframe" src={url} width="100%" height="100vh" flex={1} />
));
IFrame.displayName = "IFrame";
