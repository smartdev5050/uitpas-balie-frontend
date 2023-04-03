import { useCallback, useEffect, useMemo } from "react";
import { isClient } from "@/lib/utils";

export enum WindowMessageSources {
  BALIE = "BALIE",
}

export enum WindowMessageTypes {
  URL_CHANGED = "URL_CHANGED",
  URL_UNKNOWN = "URL_UNKNOWN",
  HTTP_ERROR_CODE = "HTTP_ERROR_CODE",
  LOGIN = "LOGIN",
  LOGOUT = "LOGOUT",
  GET_COUNTER = "GET_COUNTER",
  SET_COUNTER = "SET_COUNTER",
}

type TDataBase = {
  type: WindowMessageTypes;
  source: WindowMessageSources;
  payload?: Record<string, string | number>;
};
type EventsMap<TData extends TDataBase> = Partial<
  Record<WindowMessageTypes, (data: Omit<TData, "type" | "source">) => void>
>;

export const useHandleWindowMessage = <TData extends TDataBase>(
  eventsMap: EventsMap<TData>
) => {
  const isClientSide = isClient();

  const internalHandler = useCallback(
    (event: MessageEvent<TData>) => {
      const { type, source, ...data } = event.data;
      if (source !== WindowMessageSources.BALIE) return;

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
