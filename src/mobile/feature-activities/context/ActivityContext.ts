"use client";

import { createContext } from "react";
import { Search } from "@/shared/lib/dataAccess";

// null: user has chosen to continue without selecting an activity
// undefined: user hasn't selected an activity yet
export type Activity = Search.EventAllOf | null | undefined;

export const ActivityContext = createContext<{
  selectedActivity: Activity;
  setSelectedActivity: (activity: Activity) => void;
}>({
  selectedActivity: undefined,
  setSelectedActivity: () => {},
});
