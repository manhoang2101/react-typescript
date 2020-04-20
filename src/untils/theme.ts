import { colors } from "@material-ui/core";
import { createMuiTheme } from "@material-ui/core/styles";
import { responsiveFontSizes } from "@material-ui/core/styles";
// A custom theme for this app
const defaultTheme = createMuiTheme();
export const themeStyle = createMuiTheme({
  palette: {
    type: "light",
    primary: {
      main: colors.blue[500],
    },
    secondary: {
      main: colors.pink[500],
    },
    error: {
      main: colors.red[500],
    },
    background: {
      default: "#fffff",
    },
  },
  overrides: {
    MuiDialogTitle: {
      root: {
        paddingLeft: defaultTheme.spacing(1),
        paddingRight: defaultTheme.spacing(1),
      },
    },
    MuiFormControl: {
      root: {
        margin: defaultTheme.spacing(1),
      },
    },
    MuiFormHelperText: {
      contained: { marginLeft: 0 },
    },
  },
});

export default responsiveFontSizes(themeStyle);
