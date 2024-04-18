import { readCookie, storeCookie } from "@/shared/lib/utils/cookieUtils";
import { readData, storeData } from "@/shared/lib/utils/localStorageUtils";
import { Counter } from "@/shared/feature-counter/context/CounterContext";

const localstorageSupport = typeof localStorage !== "undefined";

const COUNTER_STORAGE_KEY = "@uitpas-balie/counter";
const PREV_COUNTER_STORAGE_KEY = "@uitpas-balie/counter-prev";

export const storeCounter = (counter: Counter) => {
  localstorageSupport
    ? storeData(COUNTER_STORAGE_KEY, counter)
    : storeCookie(COUNTER_STORAGE_KEY, counter);
};

export const storePrevCounter = (counter: Counter) => {
  localstorageSupport
    ? storeData(PREV_COUNTER_STORAGE_KEY, counter)
    : storeCookie(PREV_COUNTER_STORAGE_KEY, counter);
};

export const readCounter = (): Counter => {
  return localstorageSupport
    ? readData(COUNTER_STORAGE_KEY, {
        id: "28808C2F-0DB2-D2CF-F508ECB994D2505F",
        name: "Muntpunt",
      })
    : readCookie(COUNTER_STORAGE_KEY);
};

export const readPrevCounter = (): Counter => {
  return localstorageSupport
    ? readData(PREV_COUNTER_STORAGE_KEY)
    : readCookie(PREV_COUNTER_STORAGE_KEY);
};
