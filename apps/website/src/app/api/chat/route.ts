/**
 * Chat API Route
 *
 * Handles chatbot conversations using Cloudflare Workers AI.
 * Falls back to a knowledge-base-only approach when the AI binding
 * is unavailable (local dev or AI not provisioned).
 *
 * Rate limited to 10 requests per minute per IP (expensive preset).
 */

import { type NextRequest, NextResponse } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { withSecurity } from "@/middleware/security";
import { rateLimit } from "@/lib/security/rate-limiter";
import { logger } from "@/lib/utils/logger";
import { captureServerException } from "@/lib/monitoring/sentry-server";
import { buildSystemPrompt } from "@/lib/chatbot/knowledge-base";
import { getChatFallbackResponse } from "@/lib/chatbot/fallback";
import { badRequest, internalServerError } from "@/lib/api/responses";

export const dynamic = "force-dynamic";

// ── Constants ────────────────────────────────────────────────────────────────

const MAX_MESSAGE_LENGTH = 500;
const MAX_HISTORY_LENGTH = 10;

// ── Types ────────────────────────────────────────────────────────────────────

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

interface ChatPayload {
  message: string;
  history?: ChatMessage[];
  locale: "en" | "es";
}

// ── Validation ───────────────────────────────────────────────────────────────

function sanitize(value: unknown, maxLen: number): string {
  if (typeof value !== "string") return "";
  return value.replaceAll(/[\x00-\x1F\x7F]/g, "").slice(0, maxLen);
}

function validatePayload(body: unknown): ChatPayload | null {
  if (!body || typeof body !== "object") return null;
  const obj = body as Record<string, unknown>;

  const message = sanitize(obj["message"], MAX_MESSAGE_LENGTH);
  if (!message) return null;

  const history: ChatMessage[] = [];
  if (Array.isArray(obj["history"])) {
    const raw = (obj["history"] as unknown[]).slice(-MAX_HISTORY_LENGTH);
    for (const item of raw) {
      if (!item || typeof item !== "object") continue;
      const m = item as Record<string, unknown>;
      const role = m["role"];
      if (role !== "user" && role !== "assistant") continue;
      const content = sanitize(m["content"], MAX_MESSAGE_LENGTH);
      if (!content) continue;
      history.push({ role, content });
    }
  }

  const locale = obj["locale"] === "es" ? "es" : "en";

  return { message, history, locale };
}

// ── Cloudflare Workers AI interface ──────────────────────────────────────────

interface AiTextGenerationOutput {
  response?: string;
}

interface AiBinding {
  run(
    model: string,
    input: {
      messages: Array<{ role: string; content: string }>;
      max_tokens?: number;
      temperature?: number;
    },
  ): Promise<AiTextGenerationOutput>;
}

// ── Handler ──────────────────────────────────────────────────────────────────

async function handler(request: NextRequest): Promise<Response> {
  try {
    const body = await request.json();
    const payload = validatePayload(body);
    if (!payload) {
      return badRequest(
        "Invalid request. Send a JSON body with a 'message' string.",
      );
    }

    // Try Cloudflare Workers AI first
    let aiResponse: string | null = null;
    try {
      const { env } = getCloudflareContext();
      const ai = (env as Record<string, unknown>)["AI"] as
        | AiBinding
        | undefined;

      if (ai) {
        const localeInstruction =
          payload.locale === "es"
            ? "\n## RESPONSE LANGUAGE\n- Respond in Spanish. Keep URLs, phone numbers, and proper names exactly as written."
            : "";

        const messages: Array<{ role: string; content: string }> = [
          {
            role: "system",
            content: `${buildSystemPrompt()}${localeInstruction}`,
          },
          ...(payload.history ?? []).map((m) => ({
            role: m.role,
            content: m.content,
          })),
          { role: "user", content: payload.message },
        ];

        const result = await ai.run("@cf/meta/llama-3.1-8b-instruct", {
          messages,
          max_tokens: 300,
          temperature: 0.3,
        });

        if (result.response) {
          aiResponse = result.response;
        }
      }
    } catch (_aiError) {
      // Workers AI not available — fall back to knowledge base
      logger.debug("Workers AI unavailable, using fallback", {
        error: _aiError instanceof Error ? _aiError.message : "unknown",
      });
    }

    const response =
      aiResponse ?? getChatFallbackResponse(payload.message, payload.locale);

    return NextResponse.json({ response });
  } catch (_error) {
    const errorMessage = _error instanceof Error ? _error.message : "unknown";

    logger.error("Chat API error", {
      error: errorMessage,
    });

    try {
      captureServerException(_error, { request, route: "/api/chat" });
    } catch (_captureError) {
      logger.warn("Chat API capture failed", {
        error:
          _captureError instanceof Error ? _captureError.message : "unknown",
      });
    }

    if (process.env.NODE_ENV !== "production") {
      return NextResponse.json(
        { error: "Internal server error", detail: errorMessage },
        { status: 500 },
      );
    }

    return internalServerError(
      "Something went wrong. Please try again or call (509) 308-6489.",
    );
  }
}

// Rate limit: 10 requests/minute (more restrictive than general API)
export const POST = rateLimit({ maxRequests: 10, windowMs: 60_000 })(
  withSecurity(handler),
);
