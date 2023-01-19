import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { $axios, ACCESS_TOKEN_KEY, FetcherError } from "../api/axios";
import { Admin, LoginDto, LoginResponse } from "../dtos/dtos";

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
          const response = await $axios<LoginResponse>({
            method: "post",
            url: "/v1/admins/login",
            data: loginDto,
          });
          localStorage.setItem(ACCESS_TOKEN_KEY, response.data.access_token);
          set({ admin: response.data, isAuth: true });
        },
        logout: async () => {
          const response = await $axios({
            method: "get",
            url: "/v1/admins/logout",
          });
          if (!response) return;
          localStorage.setItem(ACCESS_TOKEN_KEY, "");
          set({ admin: null, isAuth: false });
        },
      }),
      {
        name: "admin-storage",
      }
    )
  )
);
