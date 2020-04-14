import {
  commonReducer,
  selectorLoaddding,
  selectorCongifg,
} from "./common.selector";
import { IAppState } from "../types";
import { ICommonState } from "./common.types";

describe("Users Selectors", () => {
  describe("commonReducer", () => {
    const state: IAppState = {
      router: jest.fn(),
      userReducer: {
        users: [],
        user: null,
      },
      commonReducer: {
        config: {},
        pageLoadding: false,
      },
    };
    const common = commonReducer(state);
    expect(common).toEqual({
      config: {},
      pageLoadding: false,
    });
  });
  describe("selectorLoaddding", () => {
    it("should return loaddding", () => {
      const mockParameters: ICommonState = {
        config: {},
        pageLoadding: false,
      };
      const selected = selectorLoaddding.resultFunc(mockParameters);
      expect(selected).toEqual(false);
    });
  });
  describe("selectorCongifg", () => {
    it("should return congifg", () => {
      const mockParameters = {
        config: {
          API: "localhost",
          POST: "3000",
        },
        pageLoadding: false,
      };
      const selected = selectorCongifg.resultFunc(mockParameters);
      expect(selected).toEqual({ API: "localhost", POST: "3000" });
    });
  });
});
