import { forwardRef } from "react";
import { styled, IconButton, Stack } from "@mui/joy";
import ReactDatePicker from "react-datepicker";
import { ReactDatePickerProps } from "@types/react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const StyledInputContainer = styled(Stack)(({ theme }) => ({
  border: `${theme.vars.palette.neutral[400]} 1px solid`,
}));
const StyledDateInput = styled("input")(({ theme }) => ({
  //height: "100%",
  height: "37px",
  border: "none",
  outline: "none",
  [":focus-visible"]: {
    border: "none",
    outline: "none",
  },
}));

const StyledDateInputEndDecorator = styled(IconButton)(({ theme }) => ({
  padding: "4px",
  height: "100%",
  borderRadius: 0,
  margin: 0,
  border: "none",
  borderLeft: `${theme.vars.palette.neutral[400]} 1px solid`,
}));

const DateInputWithRef = forwardRef<HTMLInputElement>((props, ref) => {
  const openDatePicker = () => {
    props?.onClick?.();
  };
  return (
    <StyledInputContainer direction="row">
      <StyledDateInput ref={ref} {...props} />
      <StyledDateInputEndDecorator variant="outlined" onClick={openDatePicker}>
        <FontAwesomeIcon color="#000" fontSize={"sm"} icon={faCalendar} />
      </StyledDateInputEndDecorator>
    </StyledInputContainer>
  );
});

export const DateInput = (props: ReactDatePickerProps) => {
  return <ReactDatePicker customInput={<DateInputWithRef />} {...props} />;
};
