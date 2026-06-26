#!/usr/bin/env node

/**
 * Spanish chatbot API smoke check.
 *
 * Usage:
 *   npm run smoke:chat:es
 *
 * Optional env vars:
 *   CHAT_SMOKE_BASE_URL=http://localhost:3000
 *   CHAT_SMOKE_TIMEOUT_MS=15000
 *   CHAT_SMOKE_MESSAGE="Necesito su telefono y correo de contacto."
 *   CHAT_SMOKE_BYPASS_KEY=your-bypass-key
 *   CHAT_SMOKE_USE_LH_QUERY=1
 */

const baseUrl = (process.env.CHAT_SMOKE_BASE_URL || "http://localhost:3000")
  .trim()
  .replace(/\/$/, "");

const timeoutMs = Number(process.env.CHAT_SMOKE_TIMEOUT_MS || 15000);
const message =
  process.env.CHAT_SMOKE_MESSAGE ||
  "Necesito su telefono y correo de contacto.";
const bypassKey = process.env.CHAT_SMOKE_BYPASS_KEY || "";
const useLhQuery = /^(1|true|yes)$/i.test(
  process.env.CHAT_SMOKE_USE_LH_QUERY || "",
);

function withOptionalLhQuery(url) {
  if (!useLhQuery) {
    return url;
  }

  return `${url}${url.includes("?") ? "&" : "?"}__lh=1`;
}

const endpoint = withOptionalLhQuery(`${baseUrl}/api/chat`);
const csrfSeedUrl = withOptionalLhQuery(`${baseUrl}/`);
const expectedPhone = "(509) 308-6489";
const expectedEmail = "office@mhc-gc.com";
const spanishSignalRegex =
  /\b(puede|comunicarse|ll[aá]menos|llame|horario|servicios|aliados|veteranos|correo|tel[eé]fono)\b/i;

function fail(messageText) {
  console.error(`FAIL: ${messageText}`);
  process.exit(1);
}

function extractCsrfTokenFromSetCookie(setCookieHeader) {
  if (!setCookieHeader) {
    return null;
  }

  const match = /(?:^|[,\s])_csrf=([^;\s,]+)/.exec(setCookieHeader);
  return match?.[1] ?? null;
}

async function fetchCsrfToken(timeoutSignal) {
  const response = await fetch(csrfSeedUrl, {
    method: "GET",
    headers: {
      Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      "User-Agent":
        "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
    },
    signal: timeoutSignal,
  });

  const setCookie = response.headers.get("set-cookie");
  return extractCsrfTokenFromSetCookie(setCookie);
}

function withTimeout(ms) {
  const controller = new AbortController();
  const id = setTimeout(
    () => controller.abort(new Error("Request timed out")),
    ms,
  );
  return {
    signal: controller.signal,
    clear: () => clearTimeout(id),
  };
}

async function run() {
  console.log(`Running Spanish chatbot smoke check against ${endpoint}`);

  const timeout = withTimeout(timeoutMs);
  let response;

  const baseHeaders = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Origin: baseUrl,
    Referer: `${baseUrl}/`,
    ...(bypassKey ? { "x-mh-lighthouse-key": bypassKey } : {}),
    "User-Agent":
      "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
  };

  const body = JSON.stringify({
    message,
    locale: "es",
  });

  try {
    response = await fetch(endpoint, {
      method: "POST",
      headers: baseHeaders,
      body,
      signal: timeout.signal,
    });

    if (response.status === 403) {
      const csrfToken = await fetchCsrfToken(timeout.signal);

      if (csrfToken) {
        response = await fetch(endpoint, {
          method: "POST",
          headers: {
            ...baseHeaders,
            "X-CSRF-Token": csrfToken,
            Cookie: `_csrf=${csrfToken}`,
          },
          body,
          signal: timeout.signal,
        });
      }
    }
  } catch (error) {
    timeout.clear();
    const detail = error instanceof Error ? error.message : String(error);
    fail(`Unable to reach chat API at ${endpoint}. ${detail}`);
  }

  timeout.clear();

  if (!response.ok) {
    fail(`Expected HTTP 200, received ${response.status}`);
  }

  let payload;
  try {
    payload = await response.json();
  } catch (error) {
    const detail = error instanceof Error ? error.message : String(error);
    fail(`Response is not valid JSON. ${detail}`);
  }

  const text =
    payload &&
    typeof payload === "object" &&
    typeof payload.response === "string"
      ? payload.response
      : "";

  if (!text) {
    fail("Chat API returned an empty response.");
  }

  const hasContact =
    text.includes(expectedPhone) || text.toLowerCase().includes(expectedEmail);

  if (!hasContact) {
    fail(
      `Expected Spanish contact response to include ${expectedPhone} or ${expectedEmail}. Received: ${text}`,
    );
  }

  if (!spanishSignalRegex.test(text)) {
    fail(
      `Expected response to contain Spanish language signals. Received: ${text}`,
    );
  }

  console.log("PASS: Spanish chatbot smoke check succeeded.");
}

run();
