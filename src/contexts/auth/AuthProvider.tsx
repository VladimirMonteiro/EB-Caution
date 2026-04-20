import { createContext, useState, useEffect } from "react";
import {
  getUserLocalStorage,
  loginRequest,
  setUserLocalStorage,
} from "./utils";
import type {
  LoginRequest,
  LoginResponse,
  UserStorage,
  AuthContextType,
} from "./types";
import { getUserFromToken } from "../../utils/getUserFromToken";

export const authContext = createContext<AuthContextType>(
  {} as AuthContextType,
);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserStorage | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = getUserLocalStorage();

    if (stored?.token) {
      const userData = getUserFromToken(stored.token);
      setUser(userData);
    }

    setLoading(false);
  }, []);

  async function authenticate(data: LoginRequest): Promise<void> {
    const response: LoginResponse = await loginRequest(data);

    if (response?.token) {
      const userData = getUserFromToken(response.token);

      setUser(userData);
      setUserLocalStorage(userData);
    }
  }

  function logout() {
    setUser(null);
    setUserLocalStorage(null);
  }

  return (
    <authContext.Provider
      value={{
        user,
        loading,
        authenticate,
        logout,
      }}
    >
      {children}
    </authContext.Provider>
  );
};

export { AuthProvider };
