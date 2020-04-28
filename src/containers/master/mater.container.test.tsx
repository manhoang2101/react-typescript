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
  it("should handleOpenSidebar", () => {
    const fetchConfigAction = jest.fn();
    const props = {
      config: {},
      fetchConfigAction,
      pageLoading: false,
    };
    Component = withStyles(styles)(MasterContainer);
    const container = shallow(
      <Provider store={stories}>
        <Component {...props} />
      </Provider>
    )
      .find(Component)
      .dive()
      .dive()
      .dive()
      .instance();
    container.handleOpenSidebar(true);
    expect(container.state.OpenSidebar).toBe(true);
  });
});
