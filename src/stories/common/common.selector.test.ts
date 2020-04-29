import {
  commonReducer,
  selectorLoading,
  selectorConfig,
} from "./common.selector";
import { IAppState } from "../types";
import { ICommonState } from "./common.types";

describe("Users Selectors", () => {
  describe("commonReducer", () => {
    const state: ICommonState = {
      config: {},
      pageLoading: false,
    };
    const common = commonReducer(state);
    expect(common).toEqual({
      config: {},
      pageLoading: false,
    });
  });
  describe("selectorLoading", () => {
    it("should return loading", () => {
      const mockParameters: ICommonState = {
        config: {},
        pageLoading: false,
      };
      const selected = selectorLoading.resultFunc(mockParameters);
      expect(selected).toEqual(false);
    });
  });
  describe("selectorConfig", () => {
    it("should return config", () => {
      const mockParameters = {
        config: {
          API: "localhost",
          POST: "3000",
        },
        pageLoading: false,
      };
      const selected = selectorConfig.resultFunc(mockParameters);
      expect(selected).toEqual({ API: "localhost", POST: "3000" });
    });
  });
});
