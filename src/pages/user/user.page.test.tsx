import configureStore from "redux-mock-store";
import React from "react";
import { UserPage, mapDispatchToProps } from ".";
import { Provider } from "react-redux";
import { shallow } from "enzyme";
import { render } from "@testing-library/react";
import EUserAction from "../../store/user/user.actions";

const initialState = {
  users: [],
  user: null,
};
const mockStore = configureStore();
let store: any;
describe("UserPage", () => {
  beforeEach(() => {
    store = mockStore(initialState);
  });
  test("render component", () => {
    const { container } = render(
      <Provider store={store}>
        <UserPage />
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });
  test("UserPage as component", () => {
    const container = shallow(
      <Provider store={store}>
        <UserPage />
      </Provider>
    );
    expect(container.find(UserPage).length).toBe(1);
  });

  it("should call addUser", () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).addUser({ id: 100, name: "name" });
    expect(dispatch.mock.calls[0][0]).toEqual({
      payload: { id: 100, name: "name" },
      type: EUserAction.ADD_USER,
    });
  });
  it("should call setUser", () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).setUser({ id: 100, name: "name" });
    expect(dispatch.mock.calls[0][0]).toEqual({
      payload: { id: 100, name: "name" },
      type: EUserAction.SET_USER,
    });
  });
});
