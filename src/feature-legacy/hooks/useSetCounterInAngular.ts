import { useEffect, useState } from "react";
import { useCounter } from "@/feature-counter";
import {
  useHandleWindowMessage,
  WindowMessageSources,
  WindowMessageTypes,
} from "./useHandleWindowMessage";

export const useSetCounterInAngular = () => {
  const { activeCounter } = useCounter();
  const [sendCounterWhenAvailable, setSendCounterWhenAvailable] =
    useState(false);

  useHandleWindowMessage({
    [WindowMessageTypes.GET_COUNTER]: () => {
      setSendCounterWhenAvailable(true);
    },
  });

  useEffect(() => {
    const iframe = document.querySelector("iframe");
    if (iframe?.contentWindow && activeCounter && sendCounterWhenAvailable) {
      iframe.contentWindow.postMessage(
        {
          source: WindowMessageSources.BALIE,
          type: WindowMessageTypes.SET_COUNTER,
          payload: {
            activeCounter,
          },
        },
        "*"
      );
      setSendCounterWhenAvailable(false);
    }
  }, [activeCounter, sendCounterWhenAvailable]);
};
