import api from "../../utils/api";
import type { UserStorage } from "./types";

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
