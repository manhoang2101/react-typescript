import { takeEvery, put } from "redux-saga/effects";
import watchFetchRequest, { fetchUsers } from "./user.saga";
import EUserAction from "./user.actions";
describe("SAGAS", () => {
  it('should dispatch action "FETCH_USERS" ', () => {
    const generator = watchFetchRequest();
    expect(generator.next().value).toEqual(
      takeEvery(EUserAction.FETCH_USERS, fetchUsers)
    );
    expect(generator.next().done).toBeTruthy();
  });
  it('should dispatch action "FETCH_USERS_SUCCESS" with result from fetch News API', () => {
    const payload = [
      {
        id: 1,
        name: "Luis Suarez",
        cardNumber: "XXXX-XXXX-XXXX-4321",
        cardType: "Visa",
      },
      {
        id: 2,
        name: "Lucas Torreira",
        cardNumber: "XXXX-XXXX-XXXX-1369",
        cardType: "Master",
      },
      {
        id: 3,
        name: "Edison Cavani",
        cardNumber: "XXXX-XXXX-XXXX-8888",
        cardType: "Visa",
      },
    ];
    const mockResponse = {
      status: 200,
      token: "sfdsfdsfdsfet4tregrfsdfsd",
      meta: { count: 3, description: "", more: {} },
      data: payload,
    };
    const generator = fetchUsers();
    generator.next();
    generator.next();
    expect(generator.next(mockResponse).value).toEqual(
      put({ type: EUserAction.FETCH_USERS_SUCCESS, payload })
    );
    generator.next();
    expect(generator.next().done).toBeTruthy();
  });
});
