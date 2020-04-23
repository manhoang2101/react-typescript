import configureStore from "redux-mock-store";
import React from "react";
import { Provider } from "react-redux";
import { render } from "@testing-library/react";
import App from "./App";

const initialState = {
  commonReducer: {
    config: {},
    pageLoading: false,
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
