import api from "../../utils/api";
import { getUserFromToken } from "../../utils/getUserFromToken";
import type { LoginRequest, LoginResponse, UserStorage } from "./types";

export function setUserLocalStorage(user: UserStorage | null) {
  if (!user) {
    localStorage.removeItem("u");
    delete api.defaults.headers.common["Authorization"];
    return;
  }

  localStorage.setItem("u", JSON.stringify(user));

  api.defaults.headers.common["Authorization"] = `Bearer ${user.token}`;
}

export function getUserLocalStorage(): UserStorage | null {
  const json = localStorage.getItem("u");

  if (!json) return null;

  const user: UserStorage = JSON.parse(json);

  if (user?.token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${user.token}`;
  }

  return user;
}

export async function loginRequest(data: LoginRequest): Promise<LoginResponse> {
  try {
    const response = await api.post("auth/login", data);
    console.log(getUserFromToken(response.data.token));

    return response.data;
  } catch (error: any) {
    console.error("Erro no login:", error?.response?.data || error.message);

    throw new Error(
      error?.response?.data?.message || "Erro ao autenticar usuário",
    );
  }
}
