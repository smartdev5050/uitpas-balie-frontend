import { useContext } from "react";
import { CounterContext } from "@/shared/feature-counter/context/CounterContext";

export const useCounter = () => {
  const {
    activeCounter,
    lastCounterUsed,
    setActiveCounter,
    setLastCounterUsed,
  } = useContext(CounterContext);
  return {
    activeCounter,
    lastCounterUsed,
    setActiveCounter,
    setLastCounterUsed,
  };
};
