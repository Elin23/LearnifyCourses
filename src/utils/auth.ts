const AUTH_TOKEN_KEY = "authToken";
const AUTH_EVENT = "auth-change";

export type AuthUser = {
  name: string;
  email: string;
};

export function getAuthToken() {
  const t = localStorage.getItem(AUTH_TOKEN_KEY);
  if (!t || t === "null" || t === "undefined" || t.trim() === "") return null;
  return t;
}

export function getAuth(): { token: string | null; user: AuthUser | null } {
  const token = getAuthToken();

  const rawUser = localStorage.getItem("user");
  let user: AuthUser | null = null;
  try {
    user = rawUser ? (JSON.parse(rawUser) as AuthUser) : null;
  } catch {
    user = null;
  }

  return { token, user };
}

export function isAuthed() {
  return Boolean(getAuthToken());
}

export function setAuth(payload: { token: string; user?: AuthUser }) {
  localStorage.setItem(AUTH_TOKEN_KEY, payload.token);
  if (payload.user) localStorage.setItem("user", JSON.stringify(payload.user));
  window.dispatchEvent(new Event(AUTH_EVENT));
}

export function clearAuth() {
  localStorage.removeItem(AUTH_TOKEN_KEY);
  localStorage.removeItem("user");
  localStorage.removeItem("cart");
  window.dispatchEvent(new Event(AUTH_EVENT));
  window.dispatchEvent(new Event("storage"));
}
