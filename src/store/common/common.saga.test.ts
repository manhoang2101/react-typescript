import { takeEvery, put } from "redux-saga/effects";
import watchFetchRequest, { fetchConfig } from "./common.saga";
import ECommonAction from "./common.actions";
import { IConfig } from "./common.types";
describe("SAGAS", () => {
  it('should dispatch action "FETCH_CONFIG" ', () => {
    const generator = watchFetchRequest();
    expect(generator.next().value).toEqual(
      takeEvery(ECommonAction.FETCH_CONFIG, fetchConfig)
    );
    expect(generator.next().done).toBeTruthy();
  });
  it('should dispatch action "FETCH_CONFIG_SUCCESS" with result from fetch News API', () => {
    const payload: IConfig = {
      API: "localhost",
      PORT: "3000",
    };
    const mockResponse = {
      status: 200,
      token: "sfdsfdsfdsfet4tregrfsdfsd",
      meta: { count: 3, description: "", more: {} },
      data: payload,
    };
    const generator = fetchConfig();
    generator.next();
    generator.next();
    expect(generator.next(mockResponse).value).toEqual(
      put({ type: ECommonAction.FETCH_CONFIG_SUCCESS, payload })
    );
    generator.next();
    expect(generator.next().done).toBeTruthy();
  });
});
