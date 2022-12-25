import axios, { AxiosRequestConfig } from "axios";
import { printError } from "../error";

export const $axios = axios.create({
  baseURL: "http://localhost:3002",
  withCredentials: true,
  responseEncoding: "utf8",
});
$axios.interceptors.request.use((config: any) => {
  if (!config.headers) return;
  const admin = JSON.parse(localStorage.getItem("admin") ?? "{}");

  if (!admin) return;

  config.headers.authorization = `Bearer ${admin?.access_token}`;

  return config;
});

$axios.interceptors.response.use(
  (config: any) => {
    return config;
  },
  async (error) => {
    if (
      error.response.status === 401 &&
      error.config &&
      !error.config._isRetry
    ) {
      try {
        const originalRequest = error.config;
        originalRequest._isRetry = true;

        const response = await axios.get(
          `http://localhost:3002/v1/admins/refresh`
        );
      } catch (e: any) {
        printError(e);
      }
    }
  }
);
