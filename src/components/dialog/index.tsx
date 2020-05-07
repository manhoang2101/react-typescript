import React from "react";
import Dialog from "@material-ui/core/Dialog";
import {
  withStyles,
  WithStyles,
  Slide,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import style from "./style";
import { TransitionProps } from "@material-ui/core/transitions/transition";
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});
export interface IAppDialogProps extends WithStyles<typeof style> {
  style?: Object;
  class?: string;
  onClick?: () => void;
  content?: React.Component;
  fullWidth?: boolean;
  maxWidth?: false | "xs" | "sm" | "md" | "lg";
  fullScreen?: boolean;
  open: boolean;
  onClose: () => void;
  dialogActions: any;
  dialogTitle?: any;
  dialogContent: any;
  className?: string;
}
class AppDialog extends React.Component<IAppDialogProps> {
  render() {
    const {
      fullWidth,
      maxWidth,
      fullScreen,
      open,
      dialogTitle,
      dialogActions,
      dialogContent,
      classes,
      onClose,
      className,
    } = this.props;
    const OnDialogTitle = dialogTitle || null;
    const OnDialogActions = dialogActions;
    const OnDialogContent = dialogContent;
    const appDialogClass = ["App-Button", className];
    return (
      <React.Fragment>
        <Dialog
          fullScreen={fullScreen}
          fullWidth={fullWidth}
          maxWidth={maxWidth}
          open={open}
          keepMounted
          onClose={onClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
          TransitionComponent={Transition}
          className={appDialogClass.join(" ")}
        >
          <AppBar className={classes.appBar}>
            <Toolbar className={classes.gutters}>
              <Typography variant="h6" className={classes.title}>
                {OnDialogTitle && <OnDialogTitle />}
              </Typography>
              <IconButton
                edge="start"
                color="inherit"
                onClick={onClose}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
          <OnDialogContent />
          <OnDialogActions />
        </Dialog>
      </React.Fragment>
    );
  }
}
export default withStyles(style)(AppDialog);
