import { useMutation, useQuery } from "@tanstack/react-query";
import { ACCESS_TOKEN_KEY, authFetch } from "./fetchWrappers";

export const useLoginMutation = () =>
  useMutation({
    mutationFn: (loginDto: any) => {
      return authFetch("/v1/admins/login", {method: "POST"})
    },
    // onSuccess(data: Response) {
    //   localStorage.setItem(ACCESS_TOKEN_KEY, data.json());
    // }
  });
