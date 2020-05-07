import { selectorAuth, authReducer } from "./auth.selector";
import { IAuthState } from "./auth.types";

describe("Auth Selectors", () => {
  describe("authReducer", () => {
    const state: IAuthState = {
      auth: null,
    };
    const auth = authReducer(state);
    expect(auth).toEqual({
      auth: null,
    });
  });
  describe("selectorAuth", () => {
    it("should return auth", () => {
      const mockParameters = {
        auth: {
          id: 1,
          name: "TEST",
          token: "token",
          email: "email",
        },
      };
      const selected = selectorAuth.resultFunc(mockParameters);
      expect(selected).toEqual({
        id: 1,
        name: "TEST",
        token: "token",
        email: "email",
      });
    });
  });
});
