import { reactive } from "vue";

export const auth = reactive({
  isAuthenticated: false,
  token: null,
});


export function initAuth() {
  const token = localStorage.getItem("token");
  if (token) {
    auth.token = token;
    auth.isAuthenticated = true;
  }
}
