"use client";

import { QueryClient } from "@tanstack/react-query";
import { printError } from "./error";

import { FetcherError } from "./fetchWrappers";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 0, //maybe need to be changed
    },
    mutations: {
      onError: (error: any) => {
        if (error instanceof FetcherError) {
          printError(error.messages ?? error.message);
        } else {
          printError(error.message);
        }
      },
    },
  },
});
