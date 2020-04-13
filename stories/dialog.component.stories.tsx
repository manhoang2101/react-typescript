import React, { useState } from "react";
import AppDialog from "../src/components/dialog";
import {
  DialogTitle,
  DialogContent,
  DialogContentText,
  Button,
  DialogActions,
} from "@material-ui/core";
export const Large = () => {
  const dialogTitle = () => (
    <DialogTitle id="max-width-dialog-title">Optional sizes Large</DialogTitle>
  );
  const dialogContent = () => (
    <DialogContent>
      <DialogContentText>
        You can set my maximum width and whether to adapt or not.
      </DialogContentText>
      <form></form>
    </DialogContent>
  );
  const dialogActions = () => (
    <DialogActions>
      <Button onClick={handleClickClose} color="primary">
        Close
      </Button>
    </DialogActions>
  );
  const [open, setOpen] = useState<boolean>(false);
  const handleClickOpen = () => [setOpen(true)];
  const handleClickClose = () => [setOpen(false)];
  return (
    <>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Open dialog Large
      </Button>
      <AppDialog
        maxWidth={"lg"}
        fullWidth
        open={open}
        onClose={handleClickClose}
        dialogTitle={dialogTitle}
        dialogContent={dialogContent}
        dialogActions={dialogActions}
      />
    </>
  );
};
export const Medium = () => {
  const dialogTitle = () => (
    <DialogTitle id="max-width-dialog-title">Optional sizes Medium</DialogTitle>
  );
  const dialogContent = () => (
    <DialogContent className={"data-test-dialog-content"}>
      <DialogContentText>
        You can set my maximum width and whether to adapt or not.
      </DialogContentText>
      <form></form>
    </DialogContent>
  );
  const dialogActions = () => (
    <DialogActions>
      <Button onClick={handleClickClose} color="primary">
        Close
      </Button>
    </DialogActions>
  );
  const [open, setOpen] = useState<boolean>(false);
  const handleClickOpen = () => [setOpen(true)];
  const handleClickClose = () => [setOpen(false)];
  return (
    <>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Open dialog Medium
      </Button>
      <AppDialog
        maxWidth={"md"}
        fullWidth
        open={open}
        onClose={handleClickClose}
        dialogTitle={dialogTitle}
        dialogContent={dialogContent}
        dialogActions={dialogActions}
      />
    </>
  );
};
export const Small = () => {
  const dialogTitle = () => (
    <DialogTitle id="max-width-dialog-title">Optional sizes Small</DialogTitle>
  );
  const dialogContent = () => (
    <DialogContent>
      <DialogContentText>
        You can set my maximum width and whether to adapt or not.
      </DialogContentText>
      <form></form>
    </DialogContent>
  );
  const dialogActions = () => (
    <DialogActions>
      <Button onClick={handleClickClose} color="primary">
        Close
      </Button>
    </DialogActions>
  );
  const [open, setOpen] = useState<boolean>(false);
  const handleClickOpen = () => [setOpen(true)];
  const handleClickClose = () => [setOpen(false)];
  return (
    <>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Open dialog Small
      </Button>
      <AppDialog
        maxWidth={"sm"}
        fullWidth
        open={open}
        onClose={handleClickClose}
        dialogTitle={dialogTitle}
        dialogContent={dialogContent}
        dialogActions={dialogActions}
      />
    </>
  );
};
export const ExtraSmall = () => {
  const dialogTitle = () => (
    <DialogTitle id="max-width-dialog-title">
      Optional sizes ExtraSmall
    </DialogTitle>
  );
  const dialogContent = () => (
    <DialogContent>
      <DialogContentText>
        You can set my maximum width and whether to adapt or not.
      </DialogContentText>
      <form></form>
    </DialogContent>
  );
  const dialogActions = () => (
    <DialogActions>
      <Button onClick={handleClickClose} color="primary">
        Close
      </Button>
    </DialogActions>
  );
  const [open, setOpen] = useState<boolean>(false);
  const handleClickOpen = () => [setOpen(true)];
  const handleClickClose = () => [setOpen(false)];
  return (
    <>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Open dialog ExtraSmall
      </Button>
      <AppDialog
        maxWidth={"xs"}
        fullWidth
        open={open}
        onClose={handleClickClose}
        dialogTitle={dialogTitle}
        dialogContent={dialogContent}
        dialogActions={dialogActions}
      />
    </>
  );
};
export const FullWidth = () => {
  const dialogTitle = () => <DialogTitle>Optional sizes FullWidth</DialogTitle>;
  const dialogContent = () => (
    <DialogContent>
      <DialogContentText>
        You can set my maximum width and whether to adapt or not.
      </DialogContentText>
      <form></form>
    </DialogContent>
  );
  const dialogActions = () => (
    <DialogActions>
      <Button onClick={handleClickClose} color="primary">
        Close
      </Button>
    </DialogActions>
  );
  const [open, setOpen] = useState<boolean>(false);
  const handleClickOpen = () => [setOpen(true)];
  const handleClickClose = () => [setOpen(false)];
  return (
    <>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Open dialog FullWidth
      </Button>
      <AppDialog
        fullScreen
        maxWidth={false}
        open={open}
        onClose={handleClickClose}
        dialogTitle={dialogTitle}
        dialogContent={dialogContent}
        dialogActions={dialogActions}
      />
    </>
  );
};
export default { title: "Component/Dialog" };
