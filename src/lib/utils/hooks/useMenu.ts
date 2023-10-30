import { useRef, useState, MouseEvent, KeyboardEvent } from "react";
import { MenuUnstyledActions } from "@mui/base/MenuUnstyled";

export const useMenu = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuActions = useRef<MenuUnstyledActions>(null);

  const handleButtonClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (isOpen) {
      setIsOpen(false);
      setAnchorEl(null);
    } else {
      setIsOpen(true);
      setAnchorEl(event.currentTarget);
    }
  };

  const handleButtonKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      setAnchorEl(event.currentTarget);
      if (event.key === "ArrowUp") {
        menuActions.current?.highlightLastItem();
      }
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
    buttonRef.current!.focus();
  };

  return {
    menuActions,
    isOpen,
    buttonRef,
    menuAnchorEl: anchorEl,
    onButtonClick: handleButtonClick,
    onButtonKeyDown: handleButtonKeyDown,
    onClose: handleClose,
  };
};
