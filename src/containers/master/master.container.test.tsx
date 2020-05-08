import MasterContainer from ".";
import React from "react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { shallow } from "enzyme";
import { withStyles } from "@material-ui/core";
import styles from "../../untils/styles";
const mockStore = configureStore([]);
describe("My Connected React-Redux MasterContainer", () => {
  let stories: any;
  let Component: any;
  beforeEach(() => {
    stories = mockStore({
      myState: "sample text",
    });
    Component = withStyles(styles)(MasterContainer);
    stories.dispatch = jest.fn();
  });
});
