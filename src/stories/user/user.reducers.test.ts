import { userReducer, initialState } from "./user.reducers";
import { UserActionTypes } from "./user.types";
import EUserAction from "./user.actions";

describe("User Reducers", () => {
  it(EUserAction.FETCH_USERS_SUCCESS, () => {
    const action: UserActionTypes = {
      type: EUserAction.FETCH_USERS_SUCCESS,
      payload: [
        { id: 1, name: "Name1" },
        { id: 2, name: "Name2" },
      ],
    };
    const expected = {
      ...initialState,
      users: [
        { id: 1, name: "Name1" },
        { id: 2, name: "Name2" },
      ],
    };
    expect(userReducer(initialState, action)).toEqual(expected);
  });
  it(EUserAction.SET_USER, () => {
    const action: UserActionTypes = {
      type: EUserAction.SET_USER,
      payload: { id: 1, name: "Name1" },
    };
    const expected = {
      ...initialState,
      user: { id: 1, name: "Name1" },
    };
    expect(userReducer(initialState, action)).toEqual(expected);
  });
  it(EUserAction.ADD_USER, () => {
    const action: UserActionTypes = {
      type: EUserAction.ADD_USER,
      payload: { id: 3, name: "Name3" },
    };
    const users = [...initialState.users];
    users.push({ id: 3, name: "Name3" });
    const expected = {
      ...initialState,
      users,
    };
    expect(userReducer(initialState, action)).toEqual(expected);
  });
});
