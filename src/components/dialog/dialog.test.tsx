import {
  withStyles,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@material-ui/core";
import style from "./style";
import AppDialog from ".";
import { shallow, mount } from "enzyme";
import React from "react";
describe("<AppDialog />", () => {
  const Component = withStyles(style)(AppDialog);
  const handleClickClose = jest.fn();
  const dialogTitle = () => (
    <DialogTitle id="max-width-dialog-title">
      Optional sizes FullWidth
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

  test("should show text of DialogContent fullScreen", () => {
    const handleClickClose = jest.fn();
    const dialogTitle = () => (
      <DialogTitle className="max-width-dialog-title">
        Optional sizes FullWidth
      </DialogTitle>
    );
    const dialogActions = () => (
      <DialogActions>
        <Button
          className={`data-test-click`}
          onClick={handleClickClose}
          color="primary"
        >
          Close
        </Button>
      </DialogActions>
    );
    const dialogContent = () => (
      <DialogContent>
        <DialogContentText className={`data-content-test-text`}>
          You can set my maximum width and whether to adapt or not.
        </DialogContentText>
        <form></form>
      </DialogContent>
    );
    const container = mount(
      <Component
        open={false}
        onClose={handleClickClose}
        dialogTitle={dialogTitle}
        dialogContent={dialogContent}
        dialogActions={dialogActions}
      />
    );
    const content = container.find(".data-content-test-text");
    expect(content.at(0).text()).toBe(
      "You can set my maximum width and whether to adapt or not."
    );
  });
  test("should show text of DialogContent on click onClose", () => {
    const handleClickClose = jest.fn();
    const dialogActions = () => (
      <DialogActions>
        <Button
          className={`data-test-click`}
          onClick={handleClickClose}
          color="primary"
        >
          Close
        </Button>
      </DialogActions>
    );
    const dialogContent = () => (
      <DialogContent>
        <DialogContentText className={`data-content-test-text`}>
          You can set my maximum width and whether to adapt or not.
        </DialogContentText>
        <form></form>
      </DialogContent>
    );
    const container = mount(
      <Component
        open={false}
        fullScreen
        onClose={handleClickClose}
        dialogContent={dialogContent}
        dialogActions={dialogActions}
        dialogTitle={null}
      />
    );
    const content = container.find(".data-content-test-text");
    expect(content.at(0).text()).toBe(
      "You can set my maximum width and whether to adapt or not."
    );
  });
  test("should show text of DialogContent", () => {
    const handleClickClose = jest.fn();
    const dialogActions = () => (
      <DialogActions>
        <Button
          className={`data-test-click`}
          onClick={handleClickClose}
          color="primary"
        >
          Close
        </Button>
      </DialogActions>
    );
    const dialogContent = () => (
      <DialogContent>
        <DialogContentText className={`data-content-test-text`}>
          You can set my maximum width and whether to adapt or not.
        </DialogContentText>
        <form></form>
      </DialogContent>
    );
    const container = mount(
      <Component
        open={false}
        fullScreen
        onClose={handleClickClose}
        dialogContent={dialogContent}
        dialogActions={dialogActions}
        dialogTitle={null}
      />
    );
    const content = container.find(".data-test-click");
    content.at(0).simulate("click");
    expect(handleClickClose).toBeCalled();
  });
});
