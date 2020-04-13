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
  Button,
  makeStyles,
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
export interface PropsAppDialog extends WithStyles<typeof style> {
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
}
class AppDialog extends React.Component<PropsAppDialog> {
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
    } = this.props;
    const OnDialogTitle = dialogTitle || null;
    const OnDialogActions = dialogActions;
    const OnDialogContent = dialogContent;
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
