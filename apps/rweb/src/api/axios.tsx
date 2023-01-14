import axios, { AxiosError } from "axios";

export const ACCESS_TOKEN_KEY = "access_token";
export const BACKEND_URL = /*process.env.API_GATEWAY ??*/ `http://localhost:3002`;

import { showNotification } from "@mantine/notifications";

export const printError = (message: string | string[]) => {
  showNotification({
    title: "Oops",
    message: (
      <div>
        {Array.isArray(message) &&
          message.map((m) => m.charAt(0).toUpperCase() + m.slice(1)).join(", ")}
        {!Array.isArray(message) && message}
      </div>
    ),
  });
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

export const $axios = axios.create({
  baseURL: BACKEND_URL,
  withCredentials: true,
  headers: {},
});

$axios.interceptors.request.use((config: any) => {
  if (!config.headers) return;

  const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
  config.headers.authorization = `Bearer ${accessToken}`;

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
        printError(error.response.data.messages);
      }
    } else {
      printError(error.response.data.messages);
    }
  }
);
