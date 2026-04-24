import { jwtDecode } from "jwt-decode";
import type { UserStorage } from "../contexts/auth/types";

type TokenPayload = {
  sub: string;
  exp: number;
  id: string;
  role: string;
  warName: string;
  grad: string;
};

export function getUserFromToken(token: string): UserStorage {
  const decoded = jwtDecode<TokenPayload>(token);

  return {
    token,
    email: decoded.sub,
    id: decoded.id,
    role: decoded.role,
    warName: decoded.warName,
    grad: decoded.grad,
  };
}
