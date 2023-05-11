import { styled, Input as JoyInput, InputProps, IconButton, Box } from "@mui/joy";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { forwardRef, useRef } from "react";

const StyledDateInput = styled(JoyInput)(({ theme }) => ({
  border: `${theme.vars.palette.neutral[500]} 1px solid`,
  borderRadius: 0,
  color: theme.vars.palette.neutral[500],
  ['> input[type="date"]']: {
    padding: '4px 8px',
    alignSelf:'center',
  },
  ['> input[type="date"]::-webkit-calendar-picker-indicator']: {
    display: "none",
  },
}));
const StyledDateInputEndDecorator = styled(IconButton)(({ theme }) => ({
  padding:'4px',
  height: "100%",
  borderRadius: 0,
  border:'none',
  borderLeft: `${theme.vars.palette.neutral[500]} 1px solid`,
}));

const DateInputWithRef = forwardRef<HTMLInputElement | null>((props, ref) => {
  const openDatePicker = () => {
    ref?.current?.showPicker?.();
  };
  return (
    <StyledDateInput
      type="date"
      slotProps={{
        input: {
          ref: ref,
        },
        endDecorator:{
          component:'div',
          sx:{
            height: '100%',
            marginInlineStart:0,
          }
        }
      }}
      endDecorator={
        <StyledDateInputEndDecorator
          variant="outlined"
          onClick={openDatePicker}
        >
          <FontAwesomeIcon color="#000" fontSize={"sm"} icon={faCalendar} />
        </StyledDateInputEndDecorator>
      }
      {...props}
    />
  );
});

export const DateInput = (props: InputProps) => {
  const ref = useRef<HTMLInputElement | null>(null);
  return <DateInputWithRef ref={ref} {...props} />;
};
