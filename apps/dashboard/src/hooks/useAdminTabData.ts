"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { adminFetch } from "@/lib/admin-auth/api";
import { logger } from "@/lib/utils/logger";

export type AdminTabDataState<T> =
  | { status: "idle"; data: null; error: null; isFetching: false }
  | { status: "loading"; data: null; error: null; isFetching: true }
  | { status: "success"; data: T; error: null; isFetching: boolean }
  | { status: "error"; data: T | null; error: string; isFetching: boolean };

export interface UseAdminTabDataOptions<T> {
  /** When false, the hook stays idle and never fetches. Default: true. */
  readonly enabled?: boolean;
  /** Override the response parser. Defaults to `(r) => r.json() as Promise<T>`. */
  readonly parse?: (response: Response) => Promise<T>;
}

export interface UseAdminTabDataActions<T> {
  /** Re-runs the fetch. Returns the new data or `null` on error. */
  readonly refetch: () => Promise<T | null>;
}

export type UseAdminTabDataResult<T> = AdminTabDataState<T> &
  UseAdminTabDataActions<T>;

/**
 * Shared data-loading hook for admin dashboard tabs.
 *
 * Handles the duplicated boilerplate previously inlined in every tab:
 *   - bearer-token fetch via `adminFetch`
 *   - loading / success / error state machine
 *   - manual refetch
 *   - aborts in-flight responses on unmount or token change
 *
 * Each tab provides a stable URL string (or array of params via the
 * URL itself); the hook re-fetches when `token` or `url` change.
 */
export function useAdminTabData<T>(
  token: string | null,
  url: string,
  options: UseAdminTabDataOptions<T> = {},
): UseAdminTabDataResult<T> {
  const { enabled = true, parse } = options;
  const [state, setState] = useState<AdminTabDataState<T>>({
    status: "idle",
    data: null,
    error: null,
    isFetching: false,
  });
  const cancelledRef = useRef(false);

  const fetchData = useCallback(async (): Promise<T | null> => {
    if (!token || !enabled) return null;
    setState((prev) =>
      prev.status === "success"
        ? { ...prev, isFetching: true, error: null }
        : { status: "loading", data: null, error: null, isFetching: true },
    );

    try {
      const response = await adminFetch(token, url);
      if (cancelledRef.current) return null;
      if (!response.ok) {
        throw new Error(`Request failed (${response.status})`);
      }
      const parser = parse ?? ((r: Response) => r.json() as Promise<T>);
      const data = await parser(response);
      if (cancelledRef.current) return null;
      setState({ status: "success", data, error: null, isFetching: false });
      return data;
    } catch (_err) {
      if (cancelledRef.current) return null;
      const message =
        _err instanceof Error ? _err.message : "Failed to load data";
      logger.error(`useAdminTabData(${url}) error:`, _err);
      setState((prev) => ({
        status: "error",
        data: prev.status === "success" ? prev.data : null,
        error: message,
        isFetching: false,
      }));
      return null;
    }
  }, [token, url, enabled, parse]);

  useEffect(() => {
    cancelledRef.current = false;
    void fetchData();
    return () => {
      cancelledRef.current = true;
    };
  }, [fetchData]);

  return { ...state, refetch: fetchData };
}
