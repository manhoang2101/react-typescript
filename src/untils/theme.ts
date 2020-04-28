import { createMuiTheme } from "@material-ui/core/styles";
import { responsiveFontSizes } from "@material-ui/core/styles";
// A custom theme for this app
const defaultTheme = createMuiTheme();
export const themeStyle = createMuiTheme({
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
