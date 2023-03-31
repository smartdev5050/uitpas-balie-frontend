import { createContext, Dispatch, SetStateAction } from "react";
import { Organizer } from "@/lib/dataAccess";

export type Counter = Organizer | null;

export const CounterContext = createContext<{
  activeCounter: Counter;
  setActiveCounter: Dispatch<SetStateAction<Counter>>;
}>({
  activeCounter: null,
  setActiveCounter: () => {},
});
