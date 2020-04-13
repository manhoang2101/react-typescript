import { colors } from "@material-ui/core";
import { createMuiTheme } from "@material-ui/core/styles";
import { responsiveFontSizes } from "@material-ui/core/styles";
// A custom theme for this app
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
});

export default responsiveFontSizes(themeStyle);
