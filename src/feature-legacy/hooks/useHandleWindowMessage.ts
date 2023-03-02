import { useCallback, useEffect, useMemo } from "react";
import { isClient } from "@/lib/utils";

enum WindowMessageTypes {
  URL_CHANGED = "URL_CHANGED",
  URL_UNKNOWN = "URL_UNKNOWN",
  HTTP_ERROR_CODE = "HTTP_ERROR_CODE",
}

type TDataBase = { type: WindowMessageTypes };
type EventsMap<TData extends TDataBase> = Partial<
  Record<WindowMessageTypes, (data: Omit<TData, "type">) => void>
>;

const useHandleWindowMessage = <TData extends TDataBase>(
  eventsMap: EventsMap<TData>
) => {
  const isClientSide = isClient();

  const internalHandler = useCallback(
    (event: MessageEvent<TData>) => {
      const { type, ...data } = event.data;
      eventsMap[type]?.(data); // call handler when it exists
    },
    [eventsMap]
  );

  useEffect(() => {
    if (!isClientSide) return;
    window.addEventListener("message", internalHandler);
    return () => window.removeEventListener("message", internalHandler);
  }, [isClientSide, internalHandler]);
};

export { useHandleWindowMessage, WindowMessageTypes };
