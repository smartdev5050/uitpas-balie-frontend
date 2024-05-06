import {
  TextField,
  InputAdornment,
  TextFieldProps,
  SxProps,
  Theme,
} from "@mui/material";
import { Search } from "@mui/icons-material";

export const SearchInput = ({ ...props }: TextFieldProps) => {
  return (
    <TextField
      variant="outlined"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Search />
          </InputAdornment>
        ),
        sx: ((theme: Theme): SxProps<Theme> => ({
          backgroundColor: theme.palette.neutral[0],
          color: theme.palette.neutral[900],
          fontSize: "18px",
          fontWeight: 700,
          borderRadius: "8px",
          height: "58px",
          ...props.sx,
        })) as SxProps<Theme>,
      }}
      sx={(theme) => ({
        fieldSet: { borderColor: theme.palette.neutral[200] },
      })}
      {...props}
    />
  );
};
