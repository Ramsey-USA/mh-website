#!/usr/bin/env node

/**
 * Production Safety System smoke checks.
 *
 * Verifies key Safety pages and APIs return expected status classes/codes.
 * This is intentionally lightweight and non-destructive.
 */

const DEFAULT_BASE_URL = "https://www.mhc-gc.com";
const baseUrl = (
  process.env.SAFETY_SMOKE_BASE_URL ||
  process.env.NEXT_PUBLIC_SITE_URL ||
  DEFAULT_BASE_URL
).replace(/\/$/, "");

const timeoutMs = Number(process.env.SAFETY_SMOKE_TIMEOUT_MS || 12000);
const strictPublic200 = /^(1|true|yes)$/i.test(
  process.env.SAFETY_SMOKE_STRICT_PUBLIC_200 || "",
);
const requireAuthChecks = /^(1|true|yes)$/i.test(
  process.env.SAFETY_SMOKE_REQUIRE_AUTH_CHECKS || "",
);
const jwtSecret = process.env.SAFETY_SMOKE_JWT_SECRET || "";
const jwtIssuer = process.env.SAFETY_SMOKE_JWT_ISSUER || baseUrl;
const jwtAudience = "mh-construction-api";
const userTokenInput = process.env.SAFETY_SMOKE_USER_BEARER_TOKEN || "";
const adminTokenInput = process.env.SAFETY_SMOKE_ADMIN_BEARER_TOKEN || "";
const fieldPasscode = process.env.SAFETY_SMOKE_FIELD_PASSCODE || "";
const fieldName = process.env.SAFETY_SMOKE_FIELD_NAME || "Smoke Superintendent";
const adminEmail = process.env.SAFETY_SMOKE_ADMIN_EMAIL || "";
const adminPassword = process.env.SAFETY_SMOKE_ADMIN_PASSWORD || "";

const publicPageExpected = strictPublic200
  ? [200, 301, 302, 307, 308]
  : [200, 301, 302, 307, 308, 403];

const checks = [
  {
    name: "Safety landing page",
    path: "/safety",
    method: "GET",
    expected: publicPageExpected,
  },
  {
    name: "Safety hub page",
    path: "/safety/hub",
    method: "GET",
    expected: publicPageExpected,
  },
  {
    name: "Safety manual page",
    path: "/resources/safety-manual",
    method: "GET",
    expected: publicPageExpected,
  },
  {
    name: "Safety forms API",
    path: "/api/safety/forms",
    method: "GET",
    expected: [200, 401, 403, 405],
  },
  {
    name: "Safety form by id API",
    path: "/api/safety/forms/smoke-test-id",
    method: "GET",
    expected: [400, 401, 403, 404, 405],
  },
  {
    name: "Safety jobs API",
    path: "/api/safety/jobs",
    method: "GET",
    expected: [200, 401, 403, 405],
  },
  {
    name: "Safety job by id API",
    path: "/api/safety/jobs/smoke-test-id",
    method: "GET",
    expected: [400, 401, 403, 404, 405],
  },
  {
    name: "Safety downloads API",
    path: "/api/safety/downloads",
    method: "GET",
    expected: [200, 400, 401, 403, 405],
  },
];

function formatExpected(expected) {
  return expected.join(", ");
}

function normalizeBearerToken(value) {
  const token = value.trim();
  if (!token) {
    return "";
  }
  if (token.toLowerCase().startsWith("bearer ")) {
    return token.slice(7).trim();
  }
  return token;
}

async function generateJwtToken(secret, payload) {
  const { SignJWT } = await import("jose");
  const key = new TextEncoder().encode(secret);

  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setIssuedAt()
    .setIssuer(jwtIssuer)
    .setAudience(jwtAudience)
    .setExpirationTime("15m")
    .sign(key);
}

async function loginAndGetAccessToken(path, payload, label) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  const url = `${baseUrl}${path}`;

  try {
    const response = await fetch(url, {
      method: "POST",
      redirect: "follow",
      headers: {
        Accept: "application/json, text/html;q=0.9, */*;q=0.8",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    clearTimeout(timeout);

    if (!response.ok) {
      throw new Error(`${label} login failed with status ${response.status}`);
    }

    const body = await response.json();
    const token = typeof body?.accessToken === "string" ? body.accessToken : "";
    if (!token) {
      throw new Error(`${label} login did not return an accessToken`);
    }

    return token;
  } catch (error) {
    clearTimeout(timeout);
    throw error;
  }
}

async function resolveAuthTokens() {
  const userToken = normalizeBearerToken(userTokenInput);
  const adminToken = normalizeBearerToken(adminTokenInput);

  if (userToken || adminToken) {
    return { userToken, adminToken };
  }

  const canFieldLogin = Boolean(fieldPasscode);
  const canAdminLogin = Boolean(adminEmail && adminPassword);
  if (canFieldLogin || canAdminLogin) {
    const resolved = { userToken: "", adminToken: "" };

    if (canFieldLogin) {
      resolved.userToken = await loginAndGetAccessToken(
        "/api/auth/field-login",
        { passcode: fieldPasscode, name: fieldName },
        "Field",
      );
    }

    if (canAdminLogin) {
      resolved.adminToken = await loginAndGetAccessToken(
        "/api/auth/admin-login",
        { email: adminEmail, password: adminPassword },
        "Admin",
      );
    }

    return resolved;
  }

  if (!jwtSecret) {
    return { userToken: "", adminToken: "" };
  }

  const [generatedUserToken, generatedAdminToken] = await Promise.all([
    generateJwtToken(jwtSecret, {
      uid: "smoke-superintendent",
      role: "superintendent",
      name: "Smoke Superintendent",
      email: "smoke-superintendent@mhc-gc.com",
    }),
    generateJwtToken(jwtSecret, {
      uid: "smoke-admin",
      role: "admin",
      name: "Smoke Admin",
      email: "smoke-admin@mhc-gc.com",
    }),
  ]);

  return {
    userToken: generatedUserToken,
    adminToken: generatedAdminToken,
  };
}

async function runCheck(check) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  const url = `${baseUrl}${check.path}`;

  try {
    const headers = {
      Accept: "application/json, text/html;q=0.9, */*;q=0.8",
      ...(check.headers || {}),
    };
    if (check.body && !headers["Content-Type"]) {
      headers["Content-Type"] = "application/json";
    }

    const response = await fetch(url, {
      method: check.method,
      redirect: "follow",
      headers,
      body: check.body ? JSON.stringify(check.body) : undefined,
      signal: controller.signal,
    });

    clearTimeout(timeout);

    const passed = check.expected.includes(response.status);
    const statusMessage = `${response.status} ${response.statusText}`;

    if (passed) {
      console.log(
        `PASS  ${check.name} (${check.method} ${check.path}) -> ${statusMessage}`,
      );
      return { passed: true };
    }

    console.log(
      `FAIL  ${check.name} (${check.method} ${check.path}) -> ${statusMessage}. Expected one of: ${formatExpected(check.expected)}`,
    );
    return { passed: false };
  } catch (error) {
    clearTimeout(timeout);
    console.log(
      `FAIL  ${check.name} (${check.method} ${check.path}) -> Request error: ${error.message}`,
    );
    return { passed: false };
  }
}

async function main() {
  console.log(`Running Safety smoke checks against ${baseUrl}`);
  if (strictPublic200) {
    console.log(
      "Strict public mode enabled: public Safety pages must return 200/3xx.",
    );
  }

  const { userToken, adminToken } = await resolveAuthTokens();
  const authChecks = [];
  const hasUserToken = Boolean(userToken);
  const hasAdminToken = Boolean(adminToken);

  if (hasUserToken) {
    const userHeaders = { Authorization: `Bearer ${userToken}` };
    authChecks.push(
      {
        name: "Authenticated superintendent list forms",
        path: "/api/safety/forms",
        method: "GET",
        expected: [200, 503],
        headers: userHeaders,
      },
      {
        name: "Authenticated superintendent list jobs",
        path: "/api/safety/jobs",
        method: "GET",
        expected: [200, 503],
        headers: userHeaders,
      },
      {
        name: "Authenticated superintendent form by id",
        path: "/api/safety/forms/smoke-test-id",
        method: "GET",
        expected: [404, 503],
        headers: userHeaders,
      },
      {
        name: "Authenticated superintendent job by id",
        path: "/api/safety/jobs/smoke-test-id",
        method: "GET",
        expected: [404, 503],
        headers: userHeaders,
      },
      {
        name: "Role guard: superintendent cannot create jobs",
        path: "/api/safety/jobs",
        method: "POST",
        expected: [403],
        headers: userHeaders,
        body: {},
      },
      {
        name: "Authenticated superintendent log download validation",
        path: "/api/safety/downloads",
        method: "POST",
        expected: [400, 503],
        headers: userHeaders,
        body: {},
      },
    );
  }

  if (hasAdminToken) {
    const adminHeaders = { Authorization: `Bearer ${adminToken}` };
    authChecks.push(
      {
        name: "Authenticated admin list download logs",
        path: "/api/safety/downloads",
        method: "GET",
        expected: [200, 503],
        headers: adminHeaders,
      },
      {
        name: "Authenticated admin create job validation",
        path: "/api/safety/jobs",
        method: "POST",
        expected: [400, 503],
        headers: adminHeaders,
        body: {},
      },
    );
  }

  if (hasUserToken || hasAdminToken) {
    console.log("Authenticated smoke checks enabled.");
  } else {
    if (requireAuthChecks) {
      throw new Error(
        "Authenticated checks were required but no auth source was available. Configure login credentials, bearer tokens, or JWT secret.",
      );
    }
    console.log(
      "Authenticated smoke checks skipped. Set login credentials, bearer tokens, or SAFETY_SMOKE_JWT_SECRET to enable.",
    );
  }

  let passed = 0;
  let failed = 0;

  for (const check of [...checks, ...authChecks]) {
    const result = await runCheck(check);
    if (result.passed) {
      passed += 1;
    } else {
      failed += 1;
    }
  }

  console.log(`\nSummary: ${passed} passed, ${failed} failed`);

  if (failed > 0) {
    process.exit(1);
  }
}

main().catch((error) => {
  console.error(`Smoke test runner failed: ${error.message}`);
  process.exit(1);
});
