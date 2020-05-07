import { takeEvery, put } from "redux-saga/effects";
import watchFetchRequest, { submitLogin } from "./auth.saga";
import EAuthAction from "./auth.actions";
import { AuthActionTypes } from "./auth.types";
describe("SAGAS", () => {
  it('should dispatch action "LOGIN_SUBMIT" ', () => {
    const generator = watchFetchRequest();
    expect(generator.next().value).toEqual(
      takeEvery(EAuthAction.LOGIN_SUBMIT, submitLogin)
    );
    expect(generator.next().done).toBeTruthy();
  });
  it('should dispatch action "FETCH_USERS_SUCCESS" with result from fetch News API', () => {
    const payload = {
      id: 1,
      name: "TEST",
      token: "token",
      email: "email",
    };
    const mockResponse = {
      status: 200,
      token: "token",
      meta: { count: 3, description: "", more: {} },
      data: payload,
    };
    const action: AuthActionTypes = {
      type: EAuthAction.LOGIN_SUBMIT,
      payload: {
        auth: payload,
      },
    };
    const generator = submitLogin(action);
    generator.next();
    expect(generator.next(mockResponse).value).toEqual(
      put({ type: EAuthAction.LOGIN_SUBMIT_SUCCESS, payload })
    );
    generator.next();
    expect(generator.next().done).toBeTruthy();
  });
});
