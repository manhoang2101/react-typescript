export enum Emethod {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
  UPDATE = "UPDATE",
}
export interface IOptionCallApi {
  method: Emethod;
  url: string;
  path: string;
  data?: any;
}
export const initOptionCallApi: IOptionCallApi = {
  method: Emethod.GET,
  url: "http://localhost:3000",
  path: "",
  data: {},
};
export interface IMeta {
  count: number;
  description: string;
  more: any;
}
export interface IResponse {
  status: string | number;
  meta: IMeta;
  data: any;
  token: string;
}
export async function callApi(
  option: IOptionCallApi = initOptionCallApi
): Promise<IResponse> {
  const response = await ((option.method !== Emethod.GET &&
    fetch(`${option.url}/${option.path}`, {
      method: option.method,
      headers: {
        Accept: "application/json",
      },
      body: JSON.stringify(option.data || {}),
    })) ||
    fetch(`${option.url}/${option.path}`, {
      method: option.method,
      headers: {
        Accept: "application/json",
      },
    }));
  return response.json().then((res: IResponse) => checkRequest(res));
}
export const checkRequest = (res: IResponse) => {
  console.log(res);
  return res;
};
