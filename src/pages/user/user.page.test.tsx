import { shallow } from "enzyme";
import React from "react";
import { UserPage } from ".";
import UserContainer from "../../containers/user.container";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
describe("<UserPage />", () => {
  const mockStore = configureStore();
  const store = mockStore();
  test("toMatchSnapshot()", () => {
    console.log(UserPage);
  });
});
