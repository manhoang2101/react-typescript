import { createStyles } from "@material-ui/core";

const style = () =>
  createStyles({
    appButton: {
      "&:hover": {
        backgroundColor: "#fff",
        borderColor: "#fff",
        boxShadow: "none",
      },
      "&:active": {
        boxShadow: "none",
        backgroundColor: "#0062cc",
        borderColor: "#005cbf",
      },
      "&:focus": {
        boxShadow: "0 0 0 0.2rem rgba(0,123,255,.5)",
      },
    },
  });

export default style;
