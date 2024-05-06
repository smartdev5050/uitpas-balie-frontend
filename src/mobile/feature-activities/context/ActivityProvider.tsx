import { PropsWithChildren, useEffect, useMemo, useState } from "react";
import {
  Activity,
  ActivityContext,
} from "@/mobile/feature-activities/context/ActivityContext";
import {
  readActivity,
  storeActivity,
} from "@/mobile/feature-activities/context/ActivityStore";

export const ActivityProvider = ({ children }: PropsWithChildren) => {
  const [selectedActivity, setSelectedActivity] =
    useState<Activity>(readActivity);

  useEffect(() => storeActivity(selectedActivity), [selectedActivity]);

  const providerValues = useMemo(() => {
    return {
      selectedActivity,
      setSelectedActivity,
    };
  }, [selectedActivity, setSelectedActivity]);

  return (
    <ActivityContext.Provider value={providerValues}>
      {children}
    </ActivityContext.Provider>
  );
};
