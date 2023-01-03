import {
  useMutation,
  UseMutationResult,
  useQuery,
  UseQueryResult,
} from "@tanstack/react-query";
import axios from "axios";
import { $axios } from "./axios/axios";
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

export interface RefreshResponse {
  access_token: string;
}

export interface AuthManager {
  useGetProfile: () => UseQueryResult<AboutAdmin, unknown>;
  useLogin: () => UseMutationResult<AdminDto, unknown, LoginDto>;
  useLogout: () => UseQueryResult<void, unknown>;
}

const createAuthManager = (): AuthManager => {
  return {
    useGetProfile: () =>
      useQuery<AboutAdmin>({
        queryKey: ["/admins/profile"],
        queryFn: async () =>
          (
            await $axios({
              method: "get",
              url: "/v1/admins",
            })
          ).data,
      }),
    useLogin: () =>
      useMutation({
        mutationFn: async (dto: LoginDto) => {
          return (
            await $axios({
              url: "/v1/admins/login",
              method: "post",
              data: dto,
            })
          )?.data;
        },
        onSuccess: (result, variables, context) => {
          if (!result) return;
          localStorage.setItem(ACCESS_TOKEN_KEY, result.access_token);
          window.location.replace(window.location.origin);
          queryClient.setQueriesData<LoginDto>(["/login"], (old) => {
            return result;
          });
        },
        mutationKey: ["/login"],
      }),
    useLogout: () =>
      useQuery({
        queryKey: ["/logout"],
        queryFn: () =>
          $axios({
            method: "get",
            url: "/v1/admins/logout",
          }),
      }),
  };
};

export const authManager = createAuthManager();
