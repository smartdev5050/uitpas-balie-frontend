import { FC, PropsWithChildren, useEffect, useState } from "react";
import {
  LegacyModeContext,
  legacyModeOrder,
} from "@/feature-legacy/context/LegacyModeContext";
import Mousetrap from "mousetrap";
import { LegacyModeWindow } from "@/feature-legacy/components/LegacyModeWindow";
import { LegacyModeDisplayModeOverlay } from "@/feature-legacy/components/LegacyModeDisplayModeOverlay";

export const LegacyModeProvider: FC<PropsWithChildren> = ({ children }) => {
  const [legacyMode, setLegacyMode] = useState(legacyModeOrder[0]);

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

  return (
    <LegacyModeContext.Provider value={{ legacyMode }}>
      <LegacyModeDisplayModeOverlay />
      <LegacyModeWindow>{children}</LegacyModeWindow>
    </LegacyModeContext.Provider>
  );
};
