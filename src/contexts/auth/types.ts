import type { LoginRequest } from "../../services/authService/types";

export type User = {
  id?: number;
  email: string;
  role?: string;
  warName?: string;
  grad?: string;
};

export type UserStorage = {
  token: string;
  email: string;
  id?: number;
  role?: string;
  warName?: string;
  grad?: string;
};

export type AuthContextType = {
  user: UserStorage | null;
  loading: boolean;
  authenticate: (data: LoginRequest) => Promise<void>;
  logout: () => void;
};
