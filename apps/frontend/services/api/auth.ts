import {
  useMutation,
  UseMutationResult,
  useQuery,
  UseQueryResult,
} from "@tanstack/react-query";
import { ACCESS_TOKEN_KEY, fetcher } from "./fetchWrappers";
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

export interface AuthManager {
  // useGetProfile: () => UseQueryResult<AdminDto, unknown>;
  useLogin: () => UseMutationResult<AdminDto, unknown, LoginDto>;
  useLogout: () => UseMutationResult<any, unknown, any>;
}

const createAuthManager = (): AuthManager => {
  return {
    useLogin: () =>
      useMutation({
        mutationFn: (dto: LoginDto) => {
          return fetcher(`http://localhost:3002/v1/admins/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(dto),
          });
        },
        onSuccess: (result, variables, context) => {
          localStorage.setItem(ACCESS_TOKEN_KEY, result.access_token);
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
          });
        },
        onSuccess: (result, variables, context) => {
          localStorage.removeItem(ACCESS_TOKEN_KEY);
        },
        mutationKey: ["/logout"],
      }),
  };
};

export const authManager = createAuthManager();
