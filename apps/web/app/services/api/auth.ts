import { useMutation, useQuery } from "@tanstack/react-query";
import { $axios } from "./axios";
import { ACCESS_TOKEN_KEY } from "./fetchWrappers";

export interface AboutAdmin {
  login: string;
  id: number;
}

export const useGetAdminData = () =>
  useQuery<AboutAdmin, unknown>(["admin"], fetchAdminData);

const fetchAdminData = async (): Promise<AboutAdmin> => {
  const response = await $axios({
    method: "get",
    url: "/v1/admins",
  });

  return response.data;
};

export const useLogout = () =>
  useMutation({
    mutationKey: ["/logout"],
    mutationFn: () =>
      $axios({
        method: "get",
        url: "/v1/admins/logout",
      }),
    onSuccess: () => {
      //localStorage.removeItem(ACCESS_TOKEN_KEY);
      window.location.replace("/dashboard/login");
    },
  });
