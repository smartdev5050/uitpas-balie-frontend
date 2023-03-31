import { useActiveCounter } from "@/feature-counter";

export const useRedirectToCounter = () => {
  const counter = useActiveCounter();
};
