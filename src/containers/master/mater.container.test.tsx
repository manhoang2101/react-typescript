import MasterContainer from ".";
import React from "react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { BrowserRouter } from "react-router-dom";
import { shallow, mount } from "enzyme";
import { withStyles } from "@material-ui/core";
import styles from "src/untils/styles";
import { render } from "@testing-library/react";
const mockStore = configureStore([]);
describe("My Connected React-Redux MasterContainer", () => {
  let store: any;
  let warper: any;
  let Component: any;
  beforeEach(() => {
    store = mockStore({
      myState: "sample text",
    });
    Component = withStyles(styles)(MasterContainer);
    store.dispatch = jest.fn();
    warper = render(
      <Provider store={store}>
        <BrowserRouter>
          <Component />
        </BrowserRouter>
      </Provider>
    );
  });
  it("should render with given state from Redux store", () => {
    expect(warper).toMatchSnapshot();
  });

  it("should handleOpenSidebar", () => {
    const SetOpen = jest.fn();
    const container = shallow(
      <Provider store={store}>
        <BrowserRouter>
          <MasterContainer />
        </BrowserRouter>
      </Provider>
    )
      .find(MasterContainer)
      .dive()
      .dive()
      .instance();
    container.handleOpenSidebar(true);
    expect(container.state.OpenSidebar).toBe(true);
  });
});
