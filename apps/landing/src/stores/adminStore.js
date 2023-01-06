import { defineStore } from "pinia";
export const useAdminStore = defineStore("admin", {
    state: () => ({
        isAuth: false,
        name: "",
    }),
    actions: {
        async login() {
        },
    },
});
//# sourceMappingURL=adminStore.js.map