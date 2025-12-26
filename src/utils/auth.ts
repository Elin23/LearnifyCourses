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

let lastToken: string | null = null;
let lastUserRaw: string | null = null;
let lastSnapshot: { token: string | null; user: AuthUser | null } = {
  token: null,
  user: null,
};

export function getAuthSnapshot(): { token: string | null; user: AuthUser | null } {
  const token = getAuthToken();
  const rawUser = localStorage.getItem("user");

  if (token === lastToken && rawUser === lastUserRaw) {
    return lastSnapshot;
  }

  lastToken = token;
  lastUserRaw = rawUser;

  let user: AuthUser | null = null;
  try {
    user = rawUser ? (JSON.parse(rawUser) as AuthUser) : null;
  } catch {
    user = null;
  }

  lastSnapshot = { token, user };
  return lastSnapshot;
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
}

export function subscribeAuth(callback: () => void) {
  const onAuth = () => callback();
  const onStorage = (e: StorageEvent) => {
    if (e.key === AUTH_TOKEN_KEY || e.key === "user") callback();
  };

  window.addEventListener(AUTH_EVENT, onAuth);
  window.addEventListener("storage", onStorage);

  return () => {
    window.removeEventListener(AUTH_EVENT, onAuth);
    window.removeEventListener("storage", onStorage);
  };
}
