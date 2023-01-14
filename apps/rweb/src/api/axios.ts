import axios, { AxiosError } from "axios";

export const ACCESS_TOKEN_KEY = "access_token";
export const BACKEND_URL = /*process.env.API_GATEWAY ??*/ `http://localhost:3002`;

export class FetcherError extends Error {
  messages?: string;

  constructor(data: string | Record<string, any>) {
    super(typeof data === "string" ? data : "Query error");
    if (typeof data === "object") {
      this.messages = data.messages;
    }
  }
}

export const $axios = axios.create({
  baseURL: BACKEND_URL,
  withCredentials: true,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  },
});

$axios.interceptors.request.use((config: any) => {
  if (!config.headers) return;
  if (localStorage) {
    const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);

    config.headers.authorization = `Bearer ${accessToken}`;
  }
  return config;
});

$axios.interceptors.response.use(
  (config: any) => {
    return config;
  },
  async (error: any) => {
    if (
      error.response?.status === 401 &&
      error.config &&
      !error.config._isRetry
    ) {
      try {
        const originalRequest = error.config;
        originalRequest._isRetry = true;

        const response = await axios.post(`${BACKEND_URL}/v1/admins/refresh`);
      } catch (e: any) {
        if (e instanceof Error) {
          const axiosError = e as AxiosError;
          const messages = (axiosError.response?.data as any).messages;
          throw new FetcherError(e.message);
        }
      }
    } else {
      throw new FetcherError(error.message);
    }
  }
);
