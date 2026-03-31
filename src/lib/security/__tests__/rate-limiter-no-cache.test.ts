/**
 * @jest-environment node
 *
 * rate-limiter.ts — covers line 66: `return kv ? ... : null` false branch.
 *
 * When getCloudflareContext() succeeds but env.CACHE is absent, getCacheKV()
 * returns null (the falsy branch of `kv ? (kv as KVNamespace) : null`).
 * The middleware then falls back to the local in-memory store.
 */

import { NextRequest, NextResponse } from "next/server";

jest.mock("@opennextjs/cloudflare", () => ({
  // Context available but no CACHE binding — kv will be undefined → false branch of line 66
  getCloudflareContext: () => ({ env: {} }),
}));

import { rateLimit } from "@/lib/security/rate-limiter";

describe("rateLimit middleware — CF context present but no CACHE binding", () => {
  it("falls back to local store when env.CACHE is absent (covers kv falsy branch)", async () => {
    const handler = jest.fn(async (_req: NextRequest) =>
      NextResponse.json({ ok: true }),
    );
    const limited = rateLimit({ maxRequests: 5, windowMs: 60_000 })(handler);

    const req = new NextRequest("http://localhost/api/no-cache", {
      headers: { "x-forwarded-for": "99.1.2.3" },
    });
    const res = await limited(req, undefined);

    // Should succeed using local fallback store
    expect(res.status).toBe(200);
    expect(handler).toHaveBeenCalledTimes(1);
  });
});
