"use client";

import { useAdminAuth, type AdminAuthStatus } from "./useAdminAuth";

export type HubAdminAuthStatus =
  | { status: "loading"; token: null; userName: "" }
  | { status: "authenticated"; token: string; userName: string }
  | { status: "redirecting"; token: null; userName: "" };

/**
 * Backwards-compatible wrapper around `useAdminAuth`. New code should
 * call `useAdminAuth` directly.
 */
export function useHubAdminAuth(): HubAdminAuthStatus {
  const state: AdminAuthStatus = useAdminAuth();
  if (state.status === "authenticated") {
    return {
      status: "authenticated",
      token: state.token,
      userName: state.userName,
    };
  }
  if (state.status === "redirecting") {
    return { status: "redirecting", token: null, userName: "" };
  }
  return { status: "loading", token: null, userName: "" };
}
