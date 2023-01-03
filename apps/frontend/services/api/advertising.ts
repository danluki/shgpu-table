import {
  useMutation,
  UseMutationResult,
  useQuery,
  UseQueryResult,
} from "@tanstack/react-query";
import { $axios } from "./axios/axios";
import { AddAdvertisingDto, AdvertisingDto } from "./dtos/dtos";
import { authFetcher, fetcher } from "./fetchWrappers";
import { queryClient } from "./queryClient";

export interface AdvertisingManager {
  useGetAll: () => UseQueryResult<{ advertisings: AdvertisingDto[] }, unknown>;
  useDelete: () => UseMutationResult<any, unknown, number, unknown>;
  usePatch: () => UseMutationResult<any, unknown, AdvertisingDto, unknown>;
  useCreate: () => UseMutationResult<any, unknown, AddAdvertisingDto, unknown>;
}

const createAdvertisingManager = (): AdvertisingManager => {
  return {
    useGetAll: () =>
      useQuery({
        queryKey: ["/v1/advertisings"],
        queryFn: async () =>
          (
            await $axios({
              url: "/v1/advertisings",
            })
          ).data,
      }),
    useDelete: () =>
      useMutation({
        mutationFn: (id: number) => {
          return authFetcher(
            `${process.env.API_GATEWAY}/v1/advertisings/${id}`,
            {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
        },
        onSuccess: (result, id, context) => {
          queryClient.setQueriesData<AdvertisingDto[]>(["delete"], (old) => {
            return old?.filter((adv) => adv.id !== id);
          });
        },
        mutationKey: ["delete"],
      }),
    usePatch: () =>
      useMutation({
        mutationFn: (advertising: AdvertisingDto) => {
          return authFetcher(`${process.env.API_GATEWAY}/v1/advertisings`, {
            body: JSON.stringify(advertising),
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
          });
        },
        onSuccess: (result, data) => {
          queryClient.setQueryData<AdvertisingDto[]>(["patch"], (old) => {
            if (!old) {
              return [result];
            }
            const index = old?.findIndex((o) => o.id === data.id);
            old[index!] = result;
            return old;
          });
        },
        mutationKey: ["patch"],
      }),
    useCreate: () =>
      useMutation({
        mutationFn: (advertising: AddAdvertisingDto) => {
          return authFetcher(`${process.env.API_GATEWAY}/v1/advertisings`, {
            body: JSON.stringify(advertising),
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          });
        },
        onSuccess: (result, data) => {
          queryClient.setQueryData<AdvertisingDto[]>(["create"], (old) => {
            if (!old) {
              return [result];
            }
            old.push(result);
            console.log(result);
            return old;
          });
        },
        mutationKey: ["create"],
      }),
  };
};

export const advertisingManager = createAdvertisingManager();
