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
      pageLoadding: false,
    };
    expect(commonReducer(initialCommonState, action)).toEqual(expected);
  });
  it(ECommonAction.UPDATE_LOADDING, () => {
    const action: CommonActionTypes = {
      type: ECommonAction.UPDATE_LOADDING,
      payload: true,
    };
    const expected = {
      config: {},
      pageLoadding: true,
    };
    expect(commonReducer(initialCommonState, action)).toEqual(expected);
  });
});
