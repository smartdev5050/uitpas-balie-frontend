import { ForwardedRef, forwardRef } from "react";
import { styled, IconButton, Stack, Theme } from "@mui/joy";
import ReactDatePicker, { ReactDatePickerProps } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTheme } from "@emotion/react";
import { MUIStyledCommonProps } from "@mui/system";

const StyledInputContainer = styled(Stack)(({ theme }) => ({
  boxSizing: "border-box",
  border: `${theme.vars.palette.neutral[400]} 1px solid`,
  padding: "0 0 0 8px",
  height: "40px",
  width: "100%",
}));
const StyledDateInput = styled("input")(({ theme }) => ({
  width: "80px",
  height: "100%",
  flexGrow: 1,
  border: "none",
  outline: "none",
  color: theme.vars.palette.neutral[700],
  [":focus-visible"]: {
    border: "none",
    outline: "none",
  },
}));

const StyledDateInputEndDecorator = styled(IconButton)(({ theme }) => ({
  height: "100%",
  borderRadius: 0,
  margin: 0,
  border: "none",
  borderLeft: `${theme.vars.palette.neutral[400]} 1px solid`,
}));

const DateInputWithRef = forwardRef(function DateInputComponent(
  {
    fullWidth,
    ...props
  }: MUIStyledCommonProps<Theme> & { fullWidth?: boolean },
  ref: ForwardedRef<HTMLInputElement>
) {
  const theme = useTheme();
  const openDatePicker = () => {
    // @todo fix ts-ignore
    // @ts-ignore
    props?.onClick?.();
  };
  return (
    <StyledInputContainer direction="row">
      <StyledDateInput
        ref={ref}
        {...props}
        sx={{
          ...(fullWidth && {
            width: "100%",
          }),
        }}
      />
      <StyledDateInputEndDecorator variant="outlined" onClick={openDatePicker}>
        <FontAwesomeIcon
          // @todo fix ts-ignore
          // @ts-ignore
          color={theme.vars.palette.neutral[700]}
          icon={faCalendarDays}
          fixedWidth
        />
      </StyledDateInputEndDecorator>
    </StyledInputContainer>
  );
});

export const DateInput = ({
  fullWidth = false,
  ...props
}: ReactDatePickerProps & {
  fullWidth?: boolean;
}) => {
  return (
    <ReactDatePicker
      customInput={<DateInputWithRef fullWidth={fullWidth} />}
      {...props}
    />
  );
};
