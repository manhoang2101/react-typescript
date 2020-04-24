import MasterContainer from ".";
import React from "react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { shallow } from "enzyme";
import { withStyles } from "@material-ui/core";
import styles from "../../untils/styles";
const mockStore = configureStore([]);
describe("My Connected React-Redux MasterContainer", () => {
  let store: any;
  let Component: any;
  beforeEach(() => {
    store = mockStore({
      myState: "sample text",
    });
    Component = withStyles(styles)(MasterContainer);
    store.dispatch = jest.fn();
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
      <Provider store={store}>
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