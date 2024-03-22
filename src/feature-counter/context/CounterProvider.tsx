"use client";

import { FC, PropsWithChildren, useCallback, useEffect, useState } from "react";
import { Counter, CounterContext } from "./CounterContext";
import { RedirectWhenNoCounter } from "./RedirectWhenNoCounter";
import {
  readCounter,
  storeCounter,
  readPrevCounter,
  storePrevCounter,
} from "@/feature-counter/context/counterStore";

export const CounterProvider: FC<PropsWithChildren> = ({ children }) => {
  const [activeCounter, setActiveCounter] = useState<Counter>(readCounter);
  const [lastCounterUsed, setLastCounterUsed] =
    useState<Counter>(readPrevCounter);

  useEffect(() => storeCounter(activeCounter), [activeCounter]);
  useEffect(() => storePrevCounter(lastCounterUsed), [lastCounterUsed]);
  const clearCounter = useCallback(() => setActiveCounter(null), []);

  return (
    <CounterContext.Provider
      value={{
        activeCounter,
        setActiveCounter,
        lastCounterUsed,
        setLastCounterUsed,
      }}
    >
      <RedirectWhenNoCounter
        counter={activeCounter}
        clearCounter={clearCounter}
      >
        {children}
      </RedirectWhenNoCounter>
    </CounterContext.Provider>
  );
};
