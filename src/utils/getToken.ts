export function getToken(): string | null {
  const json = localStorage.getItem("u");
  if (!json) return null;

  try {
    const user = JSON.parse(json) as { token?: string };
    return user?.token ?? null;
  } catch {
    return null;
  }
}
