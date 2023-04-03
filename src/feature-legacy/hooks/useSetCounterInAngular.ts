import { useEffect, useState } from "react";
import { useActiveCounter } from "@/feature-counter";
import {
  useHandleWindowMessage,
  WindowMessageSources,
  WindowMessageTypes,
} from "./useHandleWindowMessage";

export const useSetCounterInAngular = () => {
  const counter = useActiveCounter();
  const [sendCounterWhenAvailable, setSendCounterWhenAvailable] =
    useState(false);

  useHandleWindowMessage({
    [WindowMessageTypes.GET_COUNTER]: () => {
      setSendCounterWhenAvailable(true);
    },
  });

  useEffect(() => {
    const iframe = document.querySelector("iframe");
    if (iframe?.contentWindow && counter && sendCounterWhenAvailable) {
      iframe.contentWindow.postMessage(
        {
          source: WindowMessageSources.BALIE,
          type: WindowMessageTypes.SET_COUNTER,
          payload: {
            counter,
          },
        },
        "*"
      );
      setSendCounterWhenAvailable(false);
    }
  }, [counter, sendCounterWhenAvailable]);
};
