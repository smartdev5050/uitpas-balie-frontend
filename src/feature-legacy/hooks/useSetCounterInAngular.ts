import { useEffect, useState } from "react";
import { useCounter } from "@/feature-counter";
import {
  createCounterMessage,
  useHandleWindowMessage,
  WindowMessageSources,
  WindowMessageTypesReceived,
} from "./useHandleWindowMessage";

export const useSetCounterInAngular = () => {
  const { activeCounter } = useCounter();
  const [sendCounterWhenAvailable, setSendCounterWhenAvailable] =
    useState(false);

  useHandleWindowMessage({
    [WindowMessageTypesReceived.GET_COUNTER]: () => {
      setSendCounterWhenAvailable(true);
    },
  });

  useEffect(() => {
    const iframe = document.querySelector("iframe");

    if (iframe?.contentWindow && activeCounter && sendCounterWhenAvailable) {
      iframe.contentWindow.postMessage(
        createCounterMessage(activeCounter),
        "*"
      );
      setSendCounterWhenAvailable(false);
    }
  }, [activeCounter, sendCounterWhenAvailable]);
};
