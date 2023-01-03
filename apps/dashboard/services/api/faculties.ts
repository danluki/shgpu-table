import { useQuery } from "@tanstack/react-query";
import {Faculty} from "../../../../libs/shared/src/index"
import { fetcher } from "./fetchWrappers";

export const useFaculties = () => useQuery<Faculty[]>({
  queryKey: [`/v1/faculties`],
  queryFn: () => fetcher(`/v1/faculties`),
})