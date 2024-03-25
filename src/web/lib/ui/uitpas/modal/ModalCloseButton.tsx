"use client";

import {
  IconButton,
  IconButtonProps,
  ModalClose,
  ModalCloseProps,
} from "@mui/joy";
import { mdiCloseThick } from "@mdi/js";
import Icon from "@mdi/react";
import React, { forwardRef, Ref } from "react";

const ForwardedIconButton = forwardRef(
  (rootProps: IconButtonProps, ref: Ref<HTMLButtonElement>) => (
    <IconButton
      ref={ref}
      variant="plain"
      size="sm"
      sx={(theme) => ({
        color: theme.palette.neutral[900],
        opacity: 0.2,
        "&:hover": {
          backgroundColor: "transparent",
          opacity: 0.5,
        },
      })}
      {...rootProps}
    >
      <Icon path={mdiCloseThick} size={0.7} />
    </IconButton>
  )
);

// https://stackoverflow.com/questions/67992894/component-definition-is-missing-display-name-for-forwardref
ForwardedIconButton.displayName = "ForwardedIconButton";

export const ModalCloseButton = (props: ModalCloseProps) => {
  return (
    <ModalClose
      size="sm"
      slots={{
        root: ForwardedIconButton,
      }}
      {...props}
    />
  );
};
