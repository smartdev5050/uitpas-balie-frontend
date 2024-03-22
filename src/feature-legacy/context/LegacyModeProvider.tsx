"use client";

import { FC, PropsWithChildren, useEffect, useState } from "react";
import {
  LegacyMode,
  LegacyModeContext,
  legacyModeOrder,
} from "@/feature-legacy/context/LegacyModeContext";
import Mousetrap from "mousetrap";
import { LegacyModeWindow } from "@/feature-legacy/components/LegacyModeWindow";
import { LegacyModeDisplayModeOverlay } from "@/feature-legacy/components/LegacyModeDisplayModeOverlay";
import { useIsBlacklisted, usePreviousRender } from "@/lib/utils";

const getFirstLegacyMode = (isBlacklisted: boolean): LegacyMode =>
  isBlacklisted ? LegacyMode.PREFER_LEGACY : LegacyMode.PREFER_NEXT;

export const LegacyModeProvider: FC<PropsWithChildren> = ({ children }) => {
  const isBlacklisted = useIsBlacklisted();
  const prevIsBlackListed = usePreviousRender(isBlacklisted);

  const [legacyMode, setLegacyMode] = useState(
    getFirstLegacyMode(isBlacklisted)
  );

  useEffect(() => {
    setLegacyMode(getFirstLegacyMode(isBlacklisted));
  }, [isBlacklisted]);

  useEffect(() => {
    Mousetrap.bind("ctrl+shift+up", () => {
      setLegacyMode((legacyMode) => {
        const index = legacyModeOrder.indexOf(legacyMode);
        return legacyModeOrder[(index + 1) % legacyModeOrder.length];
      });
    });
    Mousetrap.bind("ctrl+shift+down", () => {
      setLegacyMode((legacyMode) => {
        const index = legacyModeOrder.indexOf(legacyMode);
        return legacyModeOrder[
          (index - 1 + legacyModeOrder.length) % legacyModeOrder.length
        ];
      });
    });

    return () => {
      Mousetrap.unbind("ctrl+shift+up");
      Mousetrap.unbind("ctrl+shift+down");
    };
  }, []);

  if (prevIsBlackListed !== isBlacklisted) {
    // Prevent flickering of the UI: when switching to a black listed path, make sure the children component is not rendered shortly
    return null;
  }

  return (
    <LegacyModeContext.Provider value={{ legacyMode }}>
      <LegacyModeDisplayModeOverlay />
      <LegacyModeWindow>{children}</LegacyModeWindow>
    </LegacyModeContext.Provider>
  );
};
