import { callApi, initOptionCallApi, Emethod } from "./api";

describe("API", () => {
  const mockFetch = Promise.resolve({
    json: () =>
      Promise.resolve({
        response: "OnRequest Server Mockup Test",
      }),
  });
  beforeEach(() => {
    window.fetch = jest.fn().mockImplementation(() => mockFetch);
  });

  it("callApi is not send option", async () => {
    const expected = { response: "OnRequest Server Mockup Test" };
    await callApi().then((response) => expect(response).toEqual(expected));
  });
  it("callApi is send option", async () => {
    const expected = { response: "OnRequest Server Mockup Test" };
    const option = { ...initOptionCallApi, method: Emethod.POST };
    await callApi(option).then((response) =>
      expect(response).toEqual(expected)
    );
  });

  it("callApi is  send option data is false", async () => {
    const expected = { response: "OnRequest Server Mockup Test" };
    const option = { ...initOptionCallApi, method: Emethod.POST, data: false };
    await callApi(option).then((response) =>
      expect(response).toEqual(expected)
    );
  });
});
