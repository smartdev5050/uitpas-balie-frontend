"use client";

import { createContext } from "react";

export enum LegacyMode {
  PREFER_NEXT = "PREFER_NEXT",
  SPLIT_X = "SPLIT_X",
  SPLIT_Y = "SPLIT_Y",
  PREFER_LEGACY = "PREFER_LEGACY",
}

export const legacyModeOrder = [
  LegacyMode.PREFER_NEXT,
  LegacyMode.SPLIT_X,
  LegacyMode.SPLIT_Y,
  LegacyMode.PREFER_LEGACY,
];

export const LegacyModeContext = createContext<{ legacyMode: LegacyMode }>({
  legacyMode: legacyModeOrder[0],
});
