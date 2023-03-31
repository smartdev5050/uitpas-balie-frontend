import { FC, PropsWithChildren, useEffect, useState } from "react";
import { Counter, CounterContext } from "./CounterContext";
import { RedirectWhenNoCounter } from "./RedirectWhenNoCounter";

const STORAGE_KEY = "@uitpas-balie/counter";

const storeCounter = (counter: Counter) =>
  localStorage.setItem(STORAGE_KEY, JSON.stringify(counter));
const readCounter = (): Counter => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "") ?? null;
  } catch {
    return null;
  }
};

export const CounterProvider: FC<PropsWithChildren> = ({ children }) => {
  const [activeCounter, setActiveCounter] = useState<Counter>(readCounter);

  useEffect(() => storeCounter(activeCounter), [activeCounter]);

  return (
    <CounterContext.Provider value={{ activeCounter, setActiveCounter }}>
      <RedirectWhenNoCounter counter={activeCounter}>
        {children}
      </RedirectWhenNoCounter>
    </CounterContext.Provider>
  );
};
