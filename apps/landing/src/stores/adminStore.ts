import { defineStore } from "pinia";

type AdminState = {
  isAuth: boolean;
  name: string;
};

export const useAdminStore = defineStore("admin", {
  state: () =>
    ({
      isAuth: false,
      name: "",
    } as AdminState),
  actions: {
    async login() {
      
    },
  },
});
