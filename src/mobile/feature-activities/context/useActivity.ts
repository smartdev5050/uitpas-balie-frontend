import { useContext } from "react";
import { ActivityContext } from "@/mobile/feature-activities/context/ActivityContext";

export const useActivity = () => {
  const { selectedActivity, setSelectedActivity } = useContext(ActivityContext);

  return {
    selectedActivity,
    setSelectedActivity,
  };
};
