import ButtonUnstyled, {
  buttonUnstyledClasses,
} from "@mui/base/ButtonUnstyled";
import { styled } from "@mui/system";

export const Button = styled(ButtonUnstyled)(
  ({ theme }) => `
  text-decoration: none;
  transition: color 150ms ease-in-out,background 150ms ease-in-out,border 150ms ease-in-out;
  background-color: ${theme.palette.primary.main};
  border-color: ${theme.palette.primary.darker};
  color: ${theme.palette.primary.contrastText};
  
  display: inline-block;
  margin-bottom: 0;
  font-weight: 400;
  text-align: center;
  vertical-align: middle;
  touch-action: manipulation;
  cursor: pointer;
  background-image: none;
  border: 1px solid transparent;
  white-space: nowrap;
  padding: 8px 12px;
  font-size: 15px;
  line-height: 1.3333333;
  border-radius: 0;
  user-select: none;
  
  &:hover {
    background-color: #1f3874;
    border-color: #182a58;
  }

  &.${buttonUnstyledClasses.active} {
  }

  &.${buttonUnstyledClasses.focusVisible} {
  }

  &.${buttonUnstyledClasses.disabled} {
  }
`
);