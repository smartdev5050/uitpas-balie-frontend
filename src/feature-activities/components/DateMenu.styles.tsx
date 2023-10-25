import PopperUnstyled from "@mui/base/PopperUnstyled";
import { styled } from "@mui/joy";

export const StyledListbox = styled("ul")(
  ({ theme }) => `
    min-width: 160px;
    padding: 5px 0;
    margin: 2px 0 0;
    list-style: none;
    font-size: 15px;
    text-align: left;
    background-color: #fff;
    border: 1px solid #ccc;
    border: 1px solid rgba(0, 0, 0, 0.15);
    border-radius: 0;
    box-shadow: 0 6px 12px rgb(0 0 0 / 18%);
    background-clip: padding-box;
  `
);

export const Popper = styled(PopperUnstyled)`
  z-index: 1;
`;
