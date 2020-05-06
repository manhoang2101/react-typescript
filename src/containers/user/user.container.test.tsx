import React from "react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { BrowserRouter } from "react-router-dom";
import { shallow } from "enzyme";
import { withStyles } from "@material-ui/core";
import { render } from "@testing-library/react";
import UserContainer from ".";
import style from "../../pages/user/style";
const mockStore = configureStore([]);
describe("My Connected React-Redux MasterContainer", () => {
  let stories: any;
  let warper: any;
  let Component: any;
  beforeEach(() => {
    stories = mockStore({
      myState: "sample text",
    });
    Component = withStyles(style)(UserContainer);
    stories.dispatch = jest.fn();
    warper = render(
      <Provider store={stories}>
        <BrowserRouter>
          <Component />
        </BrowserRouter>
      </Provider>
    );
  });

  it("should onSelectUser", () => {
    const setUser = jest.fn();
    const container = shallow(
      <Provider store={stories}>
        <BrowserRouter>
          <Component
            fetchUsersAction={jest.fn}
            users={[]}
            user={null}
            setUser={setUser}
          />
        </BrowserRouter>
      </Provider>
    )
      .find(Component)
      .dive()
      .dive()
      .instance();
    container.onSelectUser({
      id: 1,
      name: "ABC",
    });
    expect(setUser).toBeCalled();
  });
  it("should addUser", () => {
    const addUser = jest.fn();
    const container = shallow(
      <Provider store={stories}>
        <BrowserRouter>
          <Component
            fetchUsersAction={jest.fn}
            users={[]}
            user={null}
            addUser={addUser}
          />
        </BrowserRouter>
      </Provider>
    )
      .find(Component)
      .dive()
      .dive()
      .instance();
    container.addUser({
      id: 1,
      name: "ABC",
    });
    expect(addUser).toBeCalled();
  });
});
