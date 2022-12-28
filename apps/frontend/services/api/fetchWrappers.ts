import { printError } from "./error";
import axios, { AxiosError, AxiosResponse } from "axios";
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
): Promise<Response> => {
  let isTriedRefresh = false;

  let accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
  if (accessToken == null) {
    const result = await refreshAccessToken();
  }
};

export const authFetch = async (
  url: RequestInfo | URL,
  options?: RequestInit
): Promise<Response> => {};

export class FetcherError extends Error {
  messages?: string;

  constructor(data: string | Record<string, any>) {
    super(typeof data === "string" ? data : "Query error");
    if (typeof data === "object") {
      this.messages = data.messages;
    }
  }
}

const refreshAccessToken = async (): Promise<Response | string> => {
  const res = await fetch("/api/auth/token", { method: "POST" });

  if (!res.ok) {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    return res;
  }

  const accessToken = ((await res.json()) as { accessToken: string })
    .accessToken;
  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);

  return accessToken;
};

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

export const fetcher = createFetcher();
export const authFetcher = createFetcher();
