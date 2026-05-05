/**
 * Safety Manual — Allowlist-based excerpt extractor
 * ──────────────────────────────────────────────────
 * Pulls ONLY the safe, intentionally-public preview blocks out of a section's
 * raw HTML body (1.0 PURPOSE, 2.0 SCOPE, and Training & Reference Resources).
 *
 * This is an *allowlist* by design — anything not explicitly named here is
 * dropped. New content added to a section's body cannot accidentally leak
 * proprietary procedures into a public preview unless someone updates this
 * allowlist deliberately.
 *
 * Used by `/resources/safety-manual/[cluster]` to render scan-to-web previews
 * for QR-code visitors without exposing the full proprietary manual.
 */

const ALLOWED_HEADINGS: ReadonlyArray<RegExp> = [
  /^\s*1(?:\.0)?\s+purpose\b/i,
  /^\s*2(?:\.0)?\s+scope\b/i,
  /^\s*training\s*(?:&|and)\s*reference\s*resources?\b/i,
  /^\s*purpose\s*$/i,
  /^\s*scope\s*$/i,
];

const HEADING_TAG = /<(h[1-6])\b[^>]*>([\s\S]*?)<\/\1>/gi;
const STRIP_ATTRS = /\s(?:on\w+|style|class|id)=("[^"]*"|'[^']*'|[^\s>]+)/gi;
const SCRIPT_OR_STYLE = /<(script|style)\b[\s\S]*?<\/\1>/gi;
const WORD_RE = /\S+/g;

/** Coarse word counter for an HTML fragment (strips tags first). */
function wordCount(html: string): number {
  const text = html.replaceAll(/<[^>]+>/g, " ");
  return (text.match(WORD_RE) || []).length;
}

/**
 * Extract an allowlisted HTML preview from a section body.
 *
 * @param body - raw section HTML (from `safety-manual.json`).
 * @param maxWords - soft cap; preview is truncated at the next block boundary
 *   once this is exceeded. Default 250.
 * @returns sanitized HTML containing only allowlisted heading→content blocks,
 *   or an empty string if no allowlisted heading is found.
 */
export function extractPreviewHtml(
  body: string | undefined | null,
  maxWords = 250,
): string {
  if (!body || typeof body !== "string") return "";

  // Drop any embedded scripts/styles defensively before scanning.
  const safe = body.replaceAll(SCRIPT_OR_STYLE, "");

  // Walk the string by heading positions and emit only allowlisted blocks
  // along with the content between this heading and the next heading.
  const matches: Array<{ start: number; end: number; text: string }> = [];
  HEADING_TAG.lastIndex = 0;
  let m: RegExpExecArray | null;
  while ((m = HEADING_TAG.exec(safe)) !== null) {
    matches.push({
      start: m.index,
      end: m.index + m[0].length,
      text: (m[2] ?? "").replaceAll(/<[^>]+>/g, "").trim(),
    });
  }
  if (matches.length === 0) return "";

  const blocks: string[] = [];
  let totalWords = 0;
  for (let i = 0; i < matches.length; i++) {
    const current = matches[i];
    if (!current) continue;
    const { text, start } = current;
    const isAllowed = ALLOWED_HEADINGS.some((re) => re.test(text));
    if (!isAllowed) continue;
    const nextStart =
      i + 1 < matches.length
        ? (matches[i + 1]?.start ?? safe.length)
        : safe.length;
    let chunk = safe.slice(start, nextStart);
    // Strip risky / styling attributes — keep semantic tags only.
    chunk = chunk.replaceAll(STRIP_ATTRS, "");
    blocks.push(chunk);
    totalWords += wordCount(chunk);
    if (totalWords >= maxWords) break;
  }

  return blocks.join("\n").trim();
}
