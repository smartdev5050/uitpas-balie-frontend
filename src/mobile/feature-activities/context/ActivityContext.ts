"use client";

import { createContext } from "react";
import { Search } from "@/shared/lib/dataAccess";

// undefined: user has chosen to continue without selecting an activity
// null: user hasn't selected an activity yet
export type Activity = Search.EventAllOf | null | undefined;

export const ActivityContext = createContext<{
  selectedActivity: Activity;
  setSelectedActivity: (activity: Activity) => void;
}>({
  selectedActivity: undefined,
  setSelectedActivity: () => {},
});
