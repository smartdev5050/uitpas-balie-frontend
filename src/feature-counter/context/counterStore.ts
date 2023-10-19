import { storeData, readData } from "@/lib/utils/localStorageUtils";
import { Counter } from "@/feature-counter/context/CounterContext";

const COUNTER_STORAGE_KEY = "@uitpas-balie/counter";
const PREV_COUNTER_STORAGE_KEY = "@uitpas-balie/counter-prev";

export const storeCounter = (counter: Counter) => {
  storeData(COUNTER_STORAGE_KEY, counter);
};

export const storePrevCounter = (counter: Counter) => {
  storeData(PREV_COUNTER_STORAGE_KEY, counter);
};

export const readCounter = (): Counter => {
  return readData(COUNTER_STORAGE_KEY);
};

export const readPrevCounter = (): Counter => {
  return readData(PREV_COUNTER_STORAGE_KEY);
};
