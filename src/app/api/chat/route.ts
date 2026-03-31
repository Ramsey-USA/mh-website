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
import { buildSystemPrompt, ALLIES } from "@/lib/chatbot/knowledge-base";

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
}

// ── Validation ───────────────────────────────────────────────────────────────

function sanitize(value: unknown, maxLen: number): string {
  if (typeof value !== "string") return "";
  return value.replace(/[\x00-\x1F\x7F]/g, "").slice(0, maxLen);
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

  return { message, history };
}

// ── Fallback (no Workers AI binding) ─────────────────────────────────────────

function generateFallbackResponse(message: string): string {
  const lower = message.toLowerCase();

  // Ally / trade partner queries
  for (const ally of ALLIES) {
    const nameWords = ally.name.toLowerCase().split(/\s+/);
    if (nameWords.some((w) => lower.includes(w) && w.length > 3)) {
      const contact = [
        ally.phone ? `phone: ${ally.phone}` : null,
        ally.email ? `email: ${ally.email}` : null,
        ally.website ? ally.website : null,
      ]
        .filter(Boolean)
        .join(", ");
      return `${ally.name} is our ${ally.role}. ${ally.description} You can reach them at ${contact}. Be sure to mention MH Construction when you contact them!`;
    }
  }

  // Trade-specific queries
  const tradeMap: Record<string, string> = {
    electric: "Diamond Electric",
    electrical: "Diamond Electric",
    sign: "Mustang Signs",
    signage: "Mustang Signs",
    landscape: "Bagley Landscape Construction, Inc.",
    landscaping: "Bagley Landscape Construction, Inc.",
    glass: "McKinney Glass",
    glazing: "McKinney Glass",
    window: "McKinney Glass",
    door: "Dupree Building Specialties",
    fence: "D-Fence Fencing Company",
    fencing: "D-Fence Fencing Company",
    insulation: "Intermountain West Insulation (IWI)",
    plumbing: "Viking Plumbing & Mechanical",
    plumber: "Viking Plumbing & Mechanical",
    cabinet: "Core Cabinet Production",
    cabinetry: "Core Cabinet Production",
  };

  for (const [keyword, allyName] of Object.entries(tradeMap)) {
    if (lower.includes(keyword)) {
      const ally = ALLIES.find((a) => a.name === allyName);
      if (ally) {
        const contact = ally.phone
          ? `at ${ally.phone}`
          : ally.website
            ? `at ${ally.website}`
            : "";
        return `For ${keyword} work, we partner with ${ally.name} — our ${ally.role}. ${ally.description} You can reach them ${contact}. Mention MH Construction when you contact them!`;
      }
    }
  }

  // Contact / consultation
  if (
    lower.includes("contact") ||
    lower.includes("phone") ||
    lower.includes("call") ||
    lower.includes("email") ||
    lower.includes("consult")
  ) {
    return "You can reach MH Construction at (509) 308-6489 or email office@mhc-gc.com. We offer free face-to-face consultations — visit mhc-gc.com/contact to get started. Our hours are Monday–Friday, 7:00 AM – 4:00 PM PST.";
  }

  // Pricing / estimate
  if (
    lower.includes("price") ||
    lower.includes("cost") ||
    lower.includes("estimate") ||
    lower.includes("bid") ||
    lower.includes("quote")
  ) {
    return "We practice open-book pricing with complete transparency — no hidden costs. Every project is unique, so we'd love to discuss your specific needs during a free consultation. Call us at (509) 308-6489 or visit mhc-gc.com/contact.";
  }

  // Veteran
  if (
    lower.includes("veteran") ||
    lower.includes("military") ||
    lower.includes("va ") ||
    lower.includes("dd-214")
  ) {
    return "MH Construction is veteran-owned since January 2025 by Army veteran Jeremy Thamert. We offer a Combat Veteran Discount and priority scheduling for all veterans. Bring your DD-214 or VA card to your consultation. Learn more at mhc-gc.com/veterans.";
  }

  // Safety
  if (
    lower.includes("safety") ||
    lower.includes("emr") ||
    lower.includes("osha")
  ) {
    return "Safety is non-negotiable at MH Construction. We maintain a 0.64 EMR — 40% better than the industry average. We've earned multiple AGC-WA Top EMR Awards, OSHA VPP Star designation, and have 3+ consecutive years without time-loss injuries.";
  }

  // Services
  if (
    lower.includes("service") ||
    lower.includes("what do you") ||
    lower.includes("what can you") ||
    lower.includes("what type")
  ) {
    return "MH Construction provides commercial construction, industrial projects, healthcare & medical facilities, public safety, education, civic/nonprofit, pre-engineered metal buildings (PEMB), government & public sector construction, design-build, tenant improvements, master planning, and more. Visit mhc-gc.com/services for the full list, or call (509) 308-6489 to discuss your project.";
  }

  // Location / service area
  if (
    lower.includes("where") ||
    lower.includes("location") ||
    lower.includes("area") ||
    lower.includes("tri-cities") ||
    lower.includes("pasco") ||
    lower.includes("kennewick") ||
    lower.includes("richland")
  ) {
    return "We're headquartered at 3111 N. Capitol Ave., Pasco, WA 99301. Our primary service area is the Tri-Cities (Pasco, Kennewick, Richland, West Richland). We also serve Yakima, Spokane, Walla Walla, Hermiston (OR), Pendleton (OR), Coeur d'Alene (ID), and Omak. Licensed in WA, OR, and ID.";
  }

  // Allies / partners
  if (
    lower.includes("ally") ||
    lower.includes("allies") ||
    lower.includes("partner") ||
    lower.includes("trade")
  ) {
    const names = ALLIES.map((a) => a.name).join(", ");
    return `Our Allies are trusted Trade Partners we work alongside — THE ROI IS THE RELATIONSHIP. Our current Allies include: ${names}. Visit mhc-gc.com/allies to learn more about each partner.`;
  }

  // Default
  return "Thanks for reaching out! I can help with information about MH Construction's services, our Trade Partner network (Allies), veteran benefits, safety record, and more. For project-specific questions, the best step is a free consultation — call (509) 308-6489 or visit mhc-gc.com/contact.";
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
      return NextResponse.json(
        { error: "Invalid request. Send a JSON body with a 'message' string." },
        { status: 400 },
      );
    }

    // Try Cloudflare Workers AI first
    let aiResponse: string | null = null;
    try {
      const { env } = await getCloudflareContext();
      const ai = (env as Record<string, unknown>)["AI"] as
        | AiBinding
        | undefined;

      if (ai) {
        const messages: Array<{ role: string; content: string }> = [
          { role: "system", content: buildSystemPrompt() },
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
    } catch (aiError) {
      // Workers AI not available — fall back to knowledge base
      logger.debug("Workers AI unavailable, using fallback", {
        error: aiError instanceof Error ? aiError.message : "unknown",
      });
    }

    const response = aiResponse ?? generateFallbackResponse(payload.message);

    return NextResponse.json({ response });
  } catch (error) {
    logger.error("Chat API error", {
      error: error instanceof Error ? error.message : "unknown",
    });
    return NextResponse.json(
      {
        error: "Something went wrong. Please try again or call (509) 308-6489.",
      },
      { status: 500 },
    );
  }
}

// Rate limit: 10 requests/minute (more restrictive than general API)
export const POST = rateLimit({ maxRequests: 10, windowMs: 60_000 })(
  withSecurity(handler),
);
