"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { refreshAdminSession } from "@/lib/admin-auth/api";

export type AdminAuthStatus =
  | {
      status: "loading";
      token: null;
      userName: "";
      userEmail: "";
    }
  | {
      status: "authenticated";
      token: string;
      userName: string;
      userEmail: string;
    }
  | {
      status: "redirecting";
      token: null;
      userName: "";
      userEmail: "";
    };

/**
 * Bootstraps an admin session on mount.
 *
 * - Calls `/api/auth/refresh` exactly once.
 * - Redirects to `/hub` when the user is not authenticated as `admin`.
 * - Returns the access token, display name, and email for callers to
 *   use with `adminFetch` / API requests.
 *
 * Used by both `/hub/*` and `/dashboard` to remove duplicated bootstrap.
 */
export function useAdminAuth(): AdminAuthStatus {
  const router = useRouter();
  const [state, setState] = useState<AdminAuthStatus>({
    status: "loading",
    token: null,
    userName: "",
    userEmail: "",
  });

  useEffect(() => {
    let cancelled = false;

    async function bootstrap() {
      try {
        const session = await refreshAdminSession();
        if (cancelled) return;

        if (!session) {
          setState({
            status: "redirecting",
            token: null,
            userName: "",
            userEmail: "",
          });
          router.push("/hub");
          return;
        }

        setState({
          status: "authenticated",
          token: session.accessToken,
          userName: session.user.name ?? "",
          userEmail: session.user.email ?? "",
        });
      } catch {
        if (cancelled) return;
        setState({
          status: "redirecting",
          token: null,
          userName: "",
          userEmail: "",
        });
        router.push("/hub");
      }
    }

    void bootstrap();

    return () => {
      cancelled = true;
    };
  }, [router]);

  return state;
}
