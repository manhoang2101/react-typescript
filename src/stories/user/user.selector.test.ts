import { selectorUser, selectorUsers, userReducer } from "./user.selector";
import { IUserState } from "./user.types";

describe("Users Selectors", () => {
  describe("userReducer", () => {
    const state: IUserState = {
      users: [],
      user: null,
    };
    const user = userReducer(state);
    expect(user).toEqual({
      users: [],
      user: null,
    });
  });
  describe("selectorUser", () => {
    it("should return user", () => {
      const mockParameters = {
        user: {
          id: 1,
          name: "TEST",
        },
        users: [],
      };
      const selected = selectorUser.resultFunc(mockParameters);
      expect(selected).toEqual({
        id: 1,
        name: "TEST",
      });
    });
  });
  describe("selectorUsers", () => {
    it("should return login.authenticated as boolean", () => {
      const mockParameters = {
        users: [
          { id: 1, name: "TEST" },
          { id: 2, name: "TEST2" },
        ],
      };
      const selected = selectorUsers.resultFunc(mockParameters);
      expect(selected).toEqual([
        { id: 1, name: "TEST" },
        { id: 2, name: "TEST2" },
      ]);
    });
  });
});
