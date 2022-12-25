import { useMutation, useQuery } from "@tanstack/react-query";
import { fetchLogin } from "./fetchWrappers";

export const useLoginMutation = () =>
  useMutation({
    mutationFn: (loginDto: any) => {
      return fetchLogin(loginDto.login, loginDto.pass);
    },
  });
