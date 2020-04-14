import configureStore from "redux-mock-store";
import React from "react";
import { Provider } from "react-redux";
import { shallow } from "enzyme";
import { render } from "@testing-library/react";
import App from "./App";
import { MasterContainer } from "./containers/master";

const initialState = {
  commonReducer: {
    config: {},
    pageLoadding: false,
  },
  userReducer: {
    users: [],
    user: null,
  },
};
const mockStore = configureStore();
let store: any;
describe("App", () => {
  beforeEach(() => {
    store = mockStore(initialState);
  });
  test("render component", () => {
    const { container } = render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });
});
