import { useContext } from "react";
import { LegacyModeContext } from "../context/LegacyModeContext";

export const useLegacyMode = () => {
  return useContext(LegacyModeContext);
};
