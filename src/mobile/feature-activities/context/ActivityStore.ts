import { Activity } from "@/mobile/feature-activities/context/ActivityContext";
import {
  readCookie,
  readData,
  storeCookie,
  storeData,
} from "@/shared/lib/utils";

const localstorageSupport = typeof localStorage !== "undefined";

const ACTIVITY_STORAGE_KEY = "@uitpas-balie/mobile/activity";

export const storeActivity = (activity: Activity) => {
  localstorageSupport
    ? storeData(ACTIVITY_STORAGE_KEY, activity)
    : storeCookie(ACTIVITY_STORAGE_KEY, activity);
};

export const readActivity = (): Activity => {
  return localstorageSupport
    ? readData(ACTIVITY_STORAGE_KEY, undefined)
    : readCookie(ACTIVITY_STORAGE_KEY, undefined);
};
