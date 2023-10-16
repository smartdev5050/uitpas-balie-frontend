import { Counter } from "@/feature-counter/context/CounterContext";

const STORAGE_KEY = "@uitpas-balie/counter";

export const storeCounter = (counter: Counter) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(counter));
  } catch (e) {
    console.debug("Could not set localStorage item", e);
  }
};

export const readCounter = (): Counter => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "") ?? null;
  } catch (e) {
    console.debug("Could not parse localStorage item", e);
    return null;
  }
};
