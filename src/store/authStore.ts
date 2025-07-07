import { defineStore } from "pinia";
import type { LoginResponse } from "../api/interface";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null as LoginResponse | null,
    token: "" as string,
  }),
  actions: {
    setLoginData(payload: LoginResponse) {
      debugger;
      this.user = payload;
      this.token = payload.accessToken;
      localStorage.setItem("token", payload.accessToken);
      localStorage.setItem("username", payload.username);
    },
    logout() {
      this.user = null;
      this.token = "";
      localStorage.removeItem("token");
      localStorage.removeItem("username");
    },
  },
});
