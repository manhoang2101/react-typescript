import { colors } from "@material-ui/core";
import { createMuiTheme } from "@material-ui/core/styles";
import { responsiveFontSizes } from "@material-ui/core/styles";
import { orange } from "@material-ui/core/colors";
import { fade } from "@material-ui/core/styles/colorManipulator";
// A custom theme for this app
const defaultTheme = createMuiTheme();
export const themeStyle = createMuiTheme({
  spacing: 5,
  palette: {
    primary: {
      main: "#009c52",
    },
    secondary: {
      main: "#37474f",
    },
    background: {
      default: "#FFFFFF",
    },
    action: {
      disabled: "#78909c",
      selected: "#d3dfe9",
    },
    text: {
      primary: "#263238",
      secondary: "#455a64",
      disabled: "#648191",
    },
  },
  props: {
    MuiCardHeader: {
      titleTypographyProps: {
        variant: "h6",
      },
      subheaderTypographyProps: {
        variant: "caption",
      },
    },
  },
  overrides: {
    MuiInput: {
      underline: {
        "&$disabled:before": {
          borderBottomStyle: "dashed",
          borderBottomColor: "#a1b3be",
        },
      },
    },
    MuiInputLabel: {
      shrink: {
        fontWeight: "bold",
      },
    },
    MuiFormLabel: {
      root: {
        "&$disabled": {
          color: "#455a64",
        },
      },
      asterisk: {
        color: "#f00000",
        fontSize: 22,
      },
    },
  },
});

export default responsiveFontSizes(themeStyle);
