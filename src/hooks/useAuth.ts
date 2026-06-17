import { useContext } from "react";
import { authContext } from "../contexts/auth/AuthProvider";

import type { AuthContextType } from "../contexts/auth/types";

export function useAuth(): AuthContextType {
  const context = useContext(authContext);

  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }

  return context;
}
