import { useContext } from "react";
import { CounterContext } from "./CounterContext";

export const useSetActiveCounter = () => {
  const { setActiveCounter } = useContext(CounterContext);
  return setActiveCounter;
};
