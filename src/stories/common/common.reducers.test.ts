import { commonReducer, initialCommonState } from "./common.reducers";
import { CommonActionTypes } from "./common.types";
import ECommonAction from "./common.actions";

describe("User Reducers", () => {
  it(ECommonAction.FETCH_CONFIG, () => {
    const action: CommonActionTypes = {
      type: ECommonAction.FETCH_CONFIG_SUCCESS,
      payload: {
        API: "localhost",
        PORT: "3000",
      },
    };
    const expected = {
      config: {
        API: "localhost",
        PORT: "3000",
      },
      pageLoading: false,
    };
    expect(commonReducer(initialCommonState, action)).toEqual(expected);
  });
  it(ECommonAction.UPDATE_LOADING, () => {
    const action: CommonActionTypes = {
      type: ECommonAction.UPDATE_LOADING,
      payload: true,
    };
    const expected = {
      config: {},
      pageLoading: true,
    };
    expect(commonReducer(initialCommonState, action)).toEqual(expected);
  });
});
