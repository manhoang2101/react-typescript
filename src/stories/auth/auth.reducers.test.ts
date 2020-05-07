import { authReducer, initialState } from "./auth.reducers";
import { AuthActionTypes } from "./auth.types";
import EAuthAction from "./auth.actions";

describe("Auth Reducers", () => {
  it(EAuthAction.LOGIN_SUBMIT, () => {
    const action: AuthActionTypes = {
      type: EAuthAction.LOGIN_SUBMIT,
      payload: {
        auth: {
          id: 1,
          name: "TEST",
          token: "token",
          email: "email",
        },
      },
    };
    const expected = {
      ...initialState,
      auth: null,
    };
    expect(authReducer(initialState, action)).toEqual(expected);
  });
  it(EAuthAction.LOGIN_SUBMIT_SUCCESS, () => {
    const action: AuthActionTypes = {
      type: EAuthAction.LOGIN_SUBMIT_SUCCESS,
      payload: {
        id: 1,
        name: "TEST",
        token: "token",
        email: "email",
      },
    };
    const expected = {
      ...initialState,
      auth: {
        id: 1,
        name: "TEST",
        token: "token",
        email: "email",
      },
    };
    expect(authReducer(initialState, action)).toEqual(expected);
  });
});
