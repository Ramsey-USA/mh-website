#!/bin/bash
# scripts/brand-lint.sh
# Brand consistency lint with optional changed-files mode for CI.
#
# Modes:
# - Full scan (default): scans tracked text files in repo.
# - Changed-only scan: set BRAND_LINT_CHANGED_ONLY=true and BRAND_LINT_BASE_SHA=<sha>.
#
# Exclusions:
# - docs/project/* (planning/audit history)
# - docs/branding/* (guidelines include intentional "incorrect" examples)
# - lines containing LINT-EXEMPT
set -euo pipefail

FAIL=0

is_text_target() {
  local file="$1"
  [[ "$file" =~ \.(md|json|js|jsx|ts|tsx)$ ]]
}

is_excluded_file() {
  local file="$1"
  [[ "$file" == docs/project/* ]] || [[ "$file" == docs/branding/* ]]
}

collect_files() {
  local files=()

  if [[ "${BRAND_LINT_CHANGED_ONLY:-false}" == "true" ]] && [[ -n "${BRAND_LINT_BASE_SHA:-}" ]]; then
    local base_sha="${BRAND_LINT_BASE_SHA}"

    # Ignore invalid all-zero SHAs from first push events.
    if [[ "$base_sha" =~ ^0+$ ]]; then
      base_sha=""
    fi

    if [[ -n "$base_sha" ]]; then
      while IFS= read -r path; do
        [[ -z "$path" ]] && continue
        [[ -f "$path" ]] || continue
        is_text_target "$path" || continue
        is_excluded_file "$path" && continue
        files+=("$path")
      done < <(git diff --name-only "$base_sha"...HEAD)
    fi
  fi

  if [[ ${#files[@]} -eq 0 ]]; then
    while IFS= read -r path; do
      [[ -z "$path" ]] && continue
      [[ -f "$path" ]] || continue
      is_text_target "$path" || continue
      is_excluded_file "$path" && continue
      files+=("$path")
    done < <(git ls-files)
  fi

  printf '%s\n' "${files[@]}"
}

check_pattern() {
  local pattern="$1"
  local label="$2"
  local files=("${@:3}")

  local results=""
  for file in "${files[@]}"; do
    local file_hits
    file_hits=$(grep -nE "$pattern" "$file" 2>/dev/null || true)
    [[ -z "$file_hits" ]] && continue

    # Remove exempted lines.
    file_hits=$(printf '%s\n' "$file_hits" | grep -v "LINT-EXEMPT" || true)
    [[ -z "$file_hits" ]] && continue

    results+="$file:$file_hits"$'\n'
  done

  if [[ -n "$results" ]]; then
    echo "❌ $label"
    printf '%s\n' "$results"
    FAIL=1
  fi
}

echo "Running brand consistency lint..."

mapfile -t SCAN_FILES < <(collect_files)

if [[ ${#SCAN_FILES[@]} -eq 0 ]]; then
  echo "No target files found for brand lint."
  exit 0
fi

echo "Scanning ${#SCAN_FILES[@]} files"
if [[ "${BRAND_LINT_CHANGED_ONLY:-false}" == "true" ]] && [[ -n "${BRAND_LINT_BASE_SHA:-}" ]]; then
  echo "Mode: changed-only (base: ${BRAND_LINT_BASE_SHA})"
else
  echo "Mode: full"
fi
echo

# ─── Helper: check pattern only in Hub-scoped files ──────────────────────────
# Scans src/app/hub/**, messages/*.json, src/app/api/auth/hub-login/**, etc.
check_pattern_hub() {
  local pattern="$1"
  local label="$2"
  local files=("${@:3}")

  local hub_files=()
  for f in "${files[@]}"; do
    [[ "$f" == src/app/hub/* ]] && hub_files+=("$f") && continue
    [[ "$f" == messages/*.json ]] && hub_files+=("$f") && continue
    [[ "$f" == src/app/api/auth/hub-login* ]] && hub_files+=("$f") && continue
    [[ "$f" == src/app/api/safety/* ]] && hub_files+=("$f") && continue
  done

  [[ ${#hub_files[@]} -eq 0 ]] && return
  check_pattern "$pattern" "$label (Hub files)" "${hub_files[@]}"
}

# ─── Emoji detection for source code files (tsx/ts/jsx/js only) ──────────────
# Uses Node.js (guaranteed in CI) to match wide emoji ranges reliably.
check_emoji_in_source() {
  local source_files=()
  for f in "${@}"; do
    [[ "$f" =~ \.(tsx|ts|jsx|js)$ ]] && source_files+=("$f")
  done

  [[ ${#source_files[@]} -eq 0 ]] && return

  local emoji_hits
  emoji_hits=$(node --input-type=module <<'EOF'
import { readFileSync } from 'fs';
// Broad emoji range: Emoticons, Misc Symbols & Pictographs, Supplemental Symbols, Flags, etc.
const emojiRe = /[\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{27BF}]|[\u{1FA00}-\u{1FA9F}]|[\u{1F1E0}-\u{1F1FF}]/u;
const files = process.argv.slice(1);
const hits = [];
for (const f of files) {
  const lines = readFileSync(f, 'utf8').split('\n');
  lines.forEach((line, i) => {
    if (emojiRe.test(line) && !line.includes('LINT-EXEMPT')) {
      hits.push(`${f}:${i + 1}: ${line.trim()}`);
    }
  });
}
if (hits.length) { process.stdout.write(hits.join('\n') + '\n'); process.exit(1); }
EOF
    -- "${source_files[@]}" 2>/dev/null || true)

  if [[ -n "$emoji_hits" ]]; then
    echo "❌ EMOJI IN SOURCE CODE: use Material Icons in .tsx/.ts/.jsx/.js files (emojis allowed only in .md)"
    printf '%s\n' "$emoji_hits"
    echo
    FAIL=1
  fi
}

# ─── Core canonical phrase checks ────────────────────────────────────────────
check_pattern "for the client, not the" "BANNED SLOGAN VARIANT" "${SCAN_FILES[@]}"
check_pattern "N\\. Capitol Ave\\." "BANNED ADDRESS VARIANT" "${SCAN_FILES[@]}"
check_pattern "Veteran-[Oo]wned since [0-9]" "BANNED VETERAN-OWNED DATE FORMAT" "${SCAN_FILES[@]}"
check_pattern "veteran-owned since" "BANNED LOWERCASE VETERAN-OWNED PHRASE" "${SCAN_FILES[@]}"

# ─── Terminology guardrails ───────────────────────────────────────────────────
check_pattern "\\bcustomers\\b|\\bcustomer\\b" "BANNED TERM: use 'Client Partner(s)' instead of customer(s)" "${SCAN_FILES[@]}"
check_pattern_hub "\\bclients\\b" "BANNED TERM: use 'Client Partner(s)' instead of 'clients'" "${SCAN_FILES[@]}"
check_pattern "\\bsubs\\b" "BANNED TERM: use 'Trade Partner(s)' instead of subs" "${SCAN_FILES[@]}"
check_pattern_hub "\\bvendors\\b" "BANNED TERM: use 'Trade Partners' or 'Allies' instead of vendors" "${SCAN_FILES[@]}"
check_pattern "\\bwork FOR you\\b" "BANNED PHRASE: use collaborative 'work WITH you' wording" "${SCAN_FILES[@]}"

# ─── Emoji check (source files only) ─────────────────────────────────────────
check_emoji_in_source "${SCAN_FILES[@]}"

if [[ $FAIL -eq 0 ]]; then
  echo "✅ Brand lint passed — no banned patterns found."
fi

exit $FAIL