import { authRoutes } from "../../routes/authRoutes";
import type { LoginRequest, LoginResponse, RegisterRequest } from "./types";

export async function loginRequest(data: LoginRequest): Promise<LoginResponse> {
  try {
    const response = await authRoutes.login(data);

    return response.data;
  } catch (error: any) {
    console.error("Erro no login:", error?.response?.data || error.message);

    throw new Error(
      error?.response?.data?.message || "Erro ao autenticar usuário",
    );
  }
}

export async function registerRequest(data: RegisterRequest): Promise<void> {
  try {
    await authRoutes.register(data);
  } catch (error: any) {
    console.error("Erro no login:", error?.response?.data || error.message);
     throw new Error(
      error?.response?.data?.message || "Erro ao cadastrar usuário")
  }
}
