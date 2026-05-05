/**
 * Shared client-side helpers for admin-only pages (/hub, /dashboard).
 *
 * Generalizes the pattern previously duplicated in `lib/hub/api.ts` and
 * the inline bootstrap inside `app/dashboard/page.tsx`:
 *   1. Refresh the session via `/api/auth/refresh` and confirm admin role.
 *   2. Make subsequent requests with `Authorization: Bearer <token>`.
 *
 * Hub-specific exports remain available from `lib/hub/api.ts` for
 * backwards compatibility — they delegate here.
 */

export interface AdminUser {
  readonly name?: string;
  readonly email?: string;
  readonly role: "admin";
}

export interface AdminSession {
  readonly accessToken: string;
  readonly user: AdminUser;
}

interface RefreshApiResponse {
  accessToken?: string;
  user?: { name?: string; email?: string; role?: string };
}

/**
 * Calls `/api/auth/refresh` and returns an admin session, or `null` when
 * the refresh fails or the user is not an admin. Callers should redirect
 * unauthenticated users to `/`.
 */
export async function refreshAdminSession(): Promise<AdminSession | null> {
  const res = await fetch("/api/auth/refresh", {
    method: "POST",
    credentials: "include",
  });

  if (!res.ok) return null;

  const data = (await res.json()) as RefreshApiResponse;

  if (!data.accessToken || data.user?.role !== "admin") {
    return null;
  }

  const user: AdminUser = { role: "admin" };
  if (data.user.name !== undefined) {
    (user as { name?: string }).name = data.user.name;
  }
  if (data.user.email !== undefined) {
    (user as { email?: string }).email = data.user.email;
  }

  return { accessToken: data.accessToken, user };
}

/**
 * `fetch` wrapper that injects the bearer token and a JSON content-type
 * header when a body is present. Returns the raw `Response` so callers
 * can branch on `status`.
 */
export function adminFetch(
  token: string,
  input: RequestInfo,
  init: RequestInit = {},
): Promise<Response> {
  const headers = new Headers(init.headers);
  headers.set("Authorization", `Bearer ${token}`);
  if (init.body !== undefined && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }
  return fetch(input, { ...init, headers });
}
