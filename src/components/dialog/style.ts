import { Theme, createStyles } from "@material-ui/core";

const style = (theme: Theme) =>
  createStyles({
    form: {
      display: "flex",
      flexDirection: "column",
      margin: "auto",
      width: "fit-content",
    },
    formControl: {
      marginTop: theme.spacing(2),
      minWidth: 120,
    },
    formControlLabel: {
      marginTop: theme.spacing(1),
    },
    appBar: {
      position: "relative",
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
    },
    title: {
      marginLeft: 0,
      flex: 1,
    },
    gutters: {
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
    },
  });

export default style;
