import { createStyles } from "@material-ui/core";

const style = () =>
  createStyles({
    textField: {
      paddingRight: 25,
    },
    popupIndicator: {
      borderRadius: 0,
      "&:hover": {
        background: `transparent`,
        color: `rgb(153, 153, 153)`,
      },
      "&:focus": {
        background: `transparent`,
        color: `rgb(153, 153, 153)`,
      },
      "&:active": {
        background: `transparent`,
        color: `rgb(153, 153, 153)`,
      },
      color: "rgb(204, 204, 204)",
    },
    clearIndicator: {
      borderRadius: 0,
      "&:hover": {
        background: `transparent`,
        color: `rgb(153, 153, 153)`,
      },
      "&:focus": {
        background: `transparent`,
        color: `rgb(153, 153, 153)`,
      },
      "&:active": {
        background: `transparent`,
        color: `rgb(153, 153, 153)`,
      },
      color: "rgb(204, 204, 204)",
    },
  });

export default style;
