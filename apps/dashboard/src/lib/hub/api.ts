/**
 * Shared client-side helpers for Hub admin pages.
 *
 * Thin compatibility layer over `lib/admin-auth/api.ts`. New code should
 * import from `@/lib/admin-auth/api` directly.
 */

import { adminFetch, refreshAdminSession } from "@/lib/admin-auth/api";

export const refreshHubAdminSession = refreshAdminSession;
export const hubFetch = adminFetch;
