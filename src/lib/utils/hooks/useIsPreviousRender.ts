import { useEffect, useState } from "react";

/**
 * Returns the value from the last render.
 * Consider alternative solutions: This hook triggers 2 re-renders
 */
export function usePreviousRender<T>(value: T): T | null {
  const [current, setCurrent] = useState<null | T>(value);
  const [previous, setPrevious] = useState<null | T>(null);

  useEffect(() => {
    setPrevious(current);
    setCurrent(value);
  });

  return previous;
}
