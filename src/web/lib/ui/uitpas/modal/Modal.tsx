"use client";

import {
  Modal as MuiModal,
  ModalProps as MuiModalProps,
  ModalDialog as ModalDialogMui,
  ModalDialogProps,
} from "@mui/joy";
import React, { useRef } from "react";
import { Transition } from "react-transition-group";
import { alpha } from "@mui/system";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  modalProps?: MuiModalProps;
  dialogProps?: ModalDialogProps;
  children: React.ReactNode;
};
export const Modal = ({
  open,
  onClose,
  modalProps,
  dialogProps,
  children,
}: ModalProps) => {
  const nodeRef = useRef(null);
  const backdropTransitionDuration = 150;
  const modalTransitionDuration = 300;

  // timeout set to 0, so that there would be no delay in starting the animation
  return (
    <Transition in={open} timeout={0} nodeRef={nodeRef}>
      {(state: string) => (
        <MuiModal
          slotProps={{
            backdrop: {
              sx: (theme) => ({
                backdropFilter: "none",
                transition: `opacity ${backdropTransitionDuration}ms linear`,
                backgroundColor: theme.palette.neutral[900],
                ...{
                  entering: { opacity: 0 },
                  entered: { opacity: 0.65 },
                }[state],
              }),
            },
          }}
          open={open}
          onClose={() => onClose()}
          {...modalProps}
        >
          <ModalDialogMui
            variant="soft"
            slotProps={{
              root: {
                sx: (theme) => ({
                  maxWidth: "600px",
                  width: "100%",
                  borderRadius: 0,
                  border: `1px solid ${alpha(theme.palette.neutral[900], 0.2)}`,
                  backgroundColor: theme.palette.neutral[50],
                  boxShadow: `0px 5px 15px ${alpha(
                    theme.palette.neutral[900],
                    0.5
                  )}`,
                  padding: 0,
                  transition: `top ${modalTransitionDuration}ms ease-out, opacity ${modalTransitionDuration}ms ease-out`,
                  ...{
                    entering: { top: "6%", opacity: 0 },
                    entered: { top: "12%", opacity: 1 },
                  }[state],
                }),
              },
            }}
            sx={{
              backgroundColor: "white",
            }}
            {...dialogProps}
          >
            {children}
          </ModalDialogMui>
        </MuiModal>
      )}
    </Transition>
  );
};
