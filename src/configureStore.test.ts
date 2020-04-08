import { createBrowserHistory } from "history";
import configureStore from "./configureStore";

describe("should call configureStore", () => {
  test("should call", () => {
    const initUserReducer = {
      user: null,
      users: [],
    };
    const history = createBrowserHistory();
    const store = configureStore(history);
    const state = store.getState();
    const { userReducer } = state;
    expect(userReducer).toEqual(initUserReducer);
  });
});
