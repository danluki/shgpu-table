import { printError } from "./error";
import axios, { AxiosResponse } from "axios";
import { $axios } from "./axios/axios";
const ACCESS_TOKEN_KEY = "access_token";

// export const authFetch = async(
//   url: RequestInfo | URL,
//   options: RequestInit,
// ): Promise<Response> => {
//   let isTriedRefresh = false;

//   let accessToken = localStorage.
// }

export const fetchLogin = async (
  login: string,
  pass: string
): Promise<AxiosResponse> => {
  const res = await $axios.post("/v1/admins/login", {
    login,
    pass,
  });

  if (!res) {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    return res;
  }

  localStorage.setItem(ACCESS_TOKEN_KEY, res.data.access_token);

  return res;
};

export class FetcherError extends Error {
  messages?: string;

  constructor(data: string | Record<string, any>) {
    super(typeof data === "string" ? data : "Query error");
    if (typeof data === "object") {
      this.messages = data.messages;
    }
  }
}

const createFetcher = (fetchFn = fetch) => {
  return async <T = any>(url: RequestInfo | URL, options?: RequestInit) => {
    const res = await fetchFn(url, options);

    const isJson = res.headers.get("content-type") == "application/json";
    const data = isJson ? await res.json() : await res.text();

    if (!res.ok) {
      throw new FetcherError(data);
    }

    return data as T;
  };
};
