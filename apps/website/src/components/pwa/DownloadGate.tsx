"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { MaterialIcon } from "@/components/icons/MaterialIcon";

interface DownloadGateProps {
  children: React.ReactNode;
  /**
   * Set to true for the Employee Application — always renders children
   * regardless of auth state.
   */
  exempt?: boolean;
}

type StoredRole = "admin" | "superintendent" | "worker" | "traveler";

function getStoredRole(): StoredRole | null {
  try {
    // Admin path
    const adminToken = localStorage.getItem("admin_token");
    const adminUser = localStorage.getItem("admin_user");
    if (adminToken && adminUser) {
      const parsed = JSON.parse(adminUser) as { role?: string };
      if (parsed.role === "admin") return "admin";
    }

    // Field path (superintendent, worker, traveler)
    const fieldToken = localStorage.getItem("field_auth_token");
    const fieldUser = localStorage.getItem("field_user");
    if (fieldToken && fieldUser) {
      const parsed = JSON.parse(fieldUser) as { role?: string };
      const role = parsed.role;
      if (
        role === "superintendent" ||
        role === "worker" ||
        role === "traveler"
      ) {
        return role as StoredRole;
      }
    }
  } catch {
    // localStorage unavailable or JSON parse error
  }
  return null;
}

/**
 * DownloadGate
 *
 * Wraps any download or print action. Team members with a stored
 * superintendent or admin token (from the Hub login) see the real button.
 * Everyone else sees app access guidance.
 *
 * The gate is offline-safe: it reads from localStorage, which persists
 * through loss of connectivity.
 *
 * Employee Application is the sole public exemption — pass `exempt`.
 */
export function DownloadGate({
  children,
  exempt = false,
}: Readonly<DownloadGateProps>) {
  const [role, setRole] = useState<StoredRole | null | "loading">("loading");

  useEffect(() => {
    setRole(getStoredRole());
  }, []);

  // Avoid SSR mismatch — render nothing until the client reads localStorage
  if (role === "loading") return null;

  // Employee Application and other exempt documents — always accessible
  if (exempt) return <>{children}</>;

  // Authorized: admin or superintendent
  if (role === "admin" || role === "superintendent") return <>{children}</>;

  // Not authorized — show app prompt
  return (
    <div className="flex flex-col items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800/60">
      <div className="flex items-center gap-2">
        <MaterialIcon
          icon="lock"
          size="sm"
          className="shrink-0 text-brand-primary"
        />
        <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">
          Available in the MH Construction App
        </span>
      </div>

      <p className="text-xs leading-relaxed text-slate-500 dark:text-slate-400">
        Downloads and printing are available to team members. Use the Install
        App button in the site header or footer, then log in with your team
        passcode to access this document.
      </p>

      <div className="flex flex-wrap items-center gap-2">
        <Link
          href="/hub"
          className="inline-flex items-center gap-1.5 rounded-lg border border-brand-primary/30 px-3 py-1.5 text-xs font-semibold text-brand-primary/80 transition-colors hover:border-brand-primary/50 hover:text-brand-primary dark:text-brand-secondary"
        >
          Already installed? Open the app
          <MaterialIcon icon="smartphone" size="sm" />
        </Link>
      </div>
    </div>
  );
}
