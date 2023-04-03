import { Counter } from "@/feature-counter/context/CounterContext";

const STORAGE_KEY = "@uitpas-balie/counter";

export const storeCounter = (counter: Counter) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(counter));
};

export const readCounter = (): Counter => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "") ?? null;
  } catch {
    return null;
  }
};
