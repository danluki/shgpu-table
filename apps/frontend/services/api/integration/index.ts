import {
  useMutation,
  UseMutationResult,
  useQuery,
  UseQueryResult,
} from "@tanstack/react-query";

export interface Integration<T> {
  useData: () => UseQueryResult<T, unknown>;
  useLogout: () => UseMutationResult<any, unknown, void, unknown>;
}
