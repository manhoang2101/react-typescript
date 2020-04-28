import { createStyles } from "@material-ui/core";

const style = () =>
  createStyles({
    TextField: {
      paddingRight: 25,
    },

    MuiAutocomplete: {
      input: {
        paddingRight: 25,
      },
    },
    KeyboardArrowDownIcon: {
      paddingLeft: 0,
      borderLeft: `1px solid #ccc`,
    },
  });

export default style;
