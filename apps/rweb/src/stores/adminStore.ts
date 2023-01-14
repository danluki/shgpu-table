import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { $axios, FetcherError } from "../api/axios";
import { Admin, LoginDto } from "../dtos/dtos";

interface AdminState {
  admin: Admin | null;
  isAuth: boolean;
  login: (_: LoginDto) => void;
  logout: () => void;
}

export const useAdminStore = create<AdminState>()(
  devtools(
    persist(
      (set) => ({
        admin: null,
        isAuth: false,
        login: async (loginDto: LoginDto) => {
          try {
            const response = await $axios({
              method: "get",
              url: "/v1/admins",
            });
            set({ admin: response.data, isAuth: true });
          } catch (err: any) {
            throw new FetcherError(err.message);
          }
        },
      }),
      {
        name: "admin-storage",
      }
    )
  )
);
