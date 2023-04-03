import { FC, PropsWithChildren, useCallback, useEffect, useState } from "react";
import { Counter, CounterContext } from "./CounterContext";
import { RedirectWhenNoCounter } from "./RedirectWhenNoCounter";
import {
  readCounter,
  storeCounter,
} from "@/feature-counter/context/counterStore";

export const CounterProvider: FC<PropsWithChildren> = ({ children }) => {
  const [activeCounter, setActiveCounter] = useState<Counter>(readCounter);

  useEffect(() => storeCounter(activeCounter), [activeCounter]);
  const clearCounter = useCallback(() => setActiveCounter(null), []);

  return (
    <CounterContext.Provider value={{ activeCounter, setActiveCounter }}>
      <RedirectWhenNoCounter
        counter={activeCounter}
        clearCounter={clearCounter}
      >
        {children}
      </RedirectWhenNoCounter>
    </CounterContext.Provider>
  );
};
