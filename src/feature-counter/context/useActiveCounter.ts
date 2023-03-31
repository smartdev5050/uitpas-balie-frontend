import { useContext } from "react";
import { CounterContext } from "./CounterContext";

export const useActiveCounter = () => {
  const { activeCounter } = useContext(CounterContext);
  return activeCounter;
};
