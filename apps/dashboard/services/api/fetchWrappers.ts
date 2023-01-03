import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { RefreshResponse } from "./auth";
import { $axios } from "./axios/axios";
import { printError } from "./error";
export const ACCESS_TOKEN_KEY = "access_token";

// export const authFetch = async(
//   url: RequestInfo | URL,
//   options: RequestInit,
// ): Promise<Response> => {
//   let isTriedRefresh = false;

//   let accessToken = localStorage.
// }

export const authFetch = async (
  url: string,
  options?: AxiosRequestConfig
): Promise<AxiosResponse | null> => {
  let isTriedRefresh = false;

  let accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
  if (!accessToken) {
    const result = await refreshAccessToken();
    if (!result) return null;

    accessToken = result;
    isTriedRefresh = true;
  }

  const execute = async (token: string) => {
    return await $axios(url, {
      ...options,
      headers: {
        ...options?.headers,
        Authorization: `Bearer ${token}`,
      },
    });
  };

  let response = await execute(accessToken);

  if (response.status == 401 && !isTriedRefresh) {
    const result = await refreshAccessToken();
    if (!result) {
      return null;
    }

    accessToken = result;
    response = await execute(accessToken);
  }

  return response;
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

const refreshAccessToken = async (): Promise<string | undefined> => {
  try {
    const res = await $axios.post<RefreshResponse>("/v1/admins/refresh");
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    const accessToken = res.data.access_token;
    localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);

    return accessToken;
  } catch (e) {
    if (axios.isAxiosError(e)) {
      throw new FetcherError(e.message);
    }
  }
};

const createFetcher = (fetchFn: any) => {
  return async <T = any>(options?: AxiosRequestConfig) => {
    try {
      const res = await fetchFn(options);
      return res.data as T;
    } catch (e) {
      if (axios.isAxiosError(e)) {
        throw new FetcherError(e.message);
      }
    }
  };
};

export const fetcher = createFetcher($axios);
export const authFetcher = createFetcher(authFetch);
