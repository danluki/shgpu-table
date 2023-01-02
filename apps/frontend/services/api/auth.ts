import {
  useMutation,
  UseMutationResult,
  useQuery,
  UseQueryResult,
} from "@tanstack/react-query";
import { ACCESS_TOKEN_KEY, authFetcher, fetcher } from "./fetchWrappers";
import { queryClient } from "./queryClient";

interface AdminDto {
  login: string;
  pass: string;
  access_token: string;
  id: number;
}

interface LoginDto {
  login: string;
  pass: string;
}

export interface AboutAdmin {
  login: string;
  id: number;
}

export interface AuthManager {
  useGetProfile: () => UseQueryResult<AboutAdmin, unknown>;
  useLogin: () => UseMutationResult<AdminDto, unknown, LoginDto>;
  useLogout: () => UseMutationResult<void, unknown, void>;
}

const createAuthManager = (): AuthManager => {
  return {
    useGetProfile: () =>
      useQuery<AboutAdmin>({
        queryKey: ["/admins/profile"],
        queryFn: () => authFetcher(`http://localhost:3002/v1/admins`),
      }),
    useLogin: () =>
      useMutation({
        mutationFn: (dto: LoginDto) => {
          return fetcher(`http://localhost:3002/v1/admins/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "same-origin",
            body: JSON.stringify(dto),
          });
        },
        onSuccess: (result, variables, context) => {
          localStorage.setItem(ACCESS_TOKEN_KEY, result.access_token);
          window.location.replace(window.location.origin);
          queryClient.setQueriesData<LoginDto>(["/login"], (old) => {
            return result;
          });
        },
        mutationKey: ["/login"],
      }),
    useLogout: () =>
      useMutation({
        mutationFn: () => {
          return fetcher(`http://localhost:3002/v1/admins/logout`, {
            method: "POST",
            credentials: "same-origin",
          });
        },
        onSuccess: (result, variables, context) => {
          localStorage.removeItem(ACCESS_TOKEN_KEY);
          window.location.replace(window.location.origin);
        },
        mutationKey: ["/logout"],
      }),
  };
};

export const authManager = createAuthManager();
