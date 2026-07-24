#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
APP_DIR="$ROOT_DIR/src/app"
BASE_URL="${BASE_URL:-http://127.0.0.1:3000}"
SWEEP_USER_AGENT="${SWEEP_USER_AGENT:-Chrome-Lighthouse}"
LOCALE_MODE="${LOCALE_MODE:-auto}"
MANAGED_DEV="${SWEEP_MANAGED_DEV:-0}"

declare -A INVARIANT_REDIRECT_NOTES=(
  ["/cool-desert-nights"]="Redirect-only route; locale-invariant by policy"
  ["/resources/safety-manual"]="Redirect-only route; locale-invariant by policy"
  ["/resources/safety-program"]="Redirect-only route; locale-invariant by policy"
  ["/safety/intake"]="Redirect-only route; locale-invariant by policy"
)

DEV_PID=""
MAX_RECOVERIES="${MAX_RECOVERIES:-3}"

declare -a BASE_URL_CANDIDATES=()
if [[ -n "${BASE_URL:-}" ]]; then
  BASE_URL_CANDIDATES+=("$BASE_URL")
fi
BASE_URL_CANDIDATES+=(
  "http://127.0.0.1:3000"
  "http://localhost:3000"
  "http://127.0.0.1:3001"
  "http://localhost:3001"
)

url_available() {
  local url="$1"
  curl -sS --max-time 15 -I -H "User-Agent: $SWEEP_USER_AGENT" "$url" >/dev/null 2>&1
}

wait_for_base_url() {
  local attempts="${1:-24}"
  local delay_secs="${2:-1}"

  for _ in $(seq 1 "$attempts"); do
    if url_available "$BASE_URL"; then
      return 0
    fi
    sleep "$delay_secs"
  done

  return 1
}

resolve_base_url() {
  local candidate
  for candidate in "${BASE_URL_CANDIDATES[@]}"; do
    if url_available "$candidate"; then
      BASE_URL="$candidate"
      return 0
    fi
  done
  return 1
}

cleanup() {
  if [[ -n "$DEV_PID" ]]; then
    kill "$DEV_PID" >/dev/null 2>&1 || true
    wait "$DEV_PID" 2>/dev/null || true
  fi
}

trap cleanup EXIT

start_dev_server() {
  if [[ -n "$DEV_PID" ]]; then
    kill "$DEV_PID" >/dev/null 2>&1 || true
    wait "$DEV_PID" 2>/dev/null || true
    DEV_PID=""
  fi

  echo "Starting local dev server for sweep..."
  (
    cd "$ROOT_DIR"
    pnpm dev --webpack >/tmp/mh-spanish-sweep-dev.log 2>&1
  ) &
  DEV_PID="$!"

  for _ in {1..90}; do
    if resolve_base_url; then
      return 0
    fi
    sleep 1
  done

  return 1
}

if ! resolve_base_url; then
  if [[ "$MANAGED_DEV" == "1" ]]; then
    if ! start_dev_server; then
      echo "FAIL: Dev server did not become ready at $BASE_URL"
      echo "Hint: check /tmp/mh-spanish-sweep-dev.log for startup conflicts"
      exit 1
    fi
  else
    echo "FAIL: No reachable server for sweep at $BASE_URL"
    echo "Run your app first, then rerun this script, or set SWEEP_MANAGED_DEV=1 to allow auto-start."
    exit 1
  fi
fi

detect_locale_mode() {
  if [[ "$LOCALE_MODE" == "prefix" || "$LOCALE_MODE" == "cookie" ]]; then
    echo "$LOCALE_MODE"
    return 0
  fi

  local probe_file
  probe_file="$(mktemp)"
  local status
  status="$(fetch_status "$BASE_URL/es" "$probe_file" "Cookie: locale=en")"

  if [[ "$status" == "200" ]] && rg -q '<html lang="es"' "$probe_file"; then
    rm -f "$probe_file"
    echo "prefix"
    return 0
  fi

  rm -f "$probe_file"
  echo "cookie"
}

mapfile -t ROUTES < <(
  find "$APP_DIR" -type f -name "page.tsx" | sort | while read -r file; do
    rel="${file#"$APP_DIR"}"
    route="${rel%/page.tsx}"
    route="${route:-/}"
    [[ "$route" == /api* ]] && continue
    [[ "$route" == *"["* ]] && continue
    echo "$route"
  done
)

echo "| Route | Status | HTTP(en/es) | HTML lang=es | Notes |"
echo "| :--- | :--- | :--- | :--- | :--- |"

PASS=0
REVIEW=0
FAIL=0
ABORTED=0
RECOVERY_COUNT=0

fetch_status() {
  local url="$1"
  local out_file="$2"
  local header="$3"
  local status="000"

  for _ in {1..3}; do
    if status="$(curl -sS --max-time 30 -o "$out_file" -w "%{http_code}" -H "$header" -H "User-Agent: $SWEEP_USER_AGENT" "$url")"; then
      echo "$status"
      return 0
    fi
    sleep 1
  done

  : >"$out_file"
  echo "000"
  return 0
}

ACTIVE_LOCALE_MODE="$(detect_locale_mode)"
echo "Locale mode: $ACTIVE_LOCALE_MODE"

attempt_recovery() {
  if [[ "$RECOVERY_COUNT" -ge "$MAX_RECOVERIES" ]]; then
    return 1
  fi

  # Next.js dev can temporarily refuse connections while compiling a heavy route.
  # Treat this as transient first before restarting the server process.
  if wait_for_base_url 30 1; then
    return 0
  fi

  if [[ "$MANAGED_DEV" != "1" ]]; then
    return 1
  fi

  RECOVERY_COUNT=$((RECOVERY_COUNT + 1))
  if start_dev_server; then
    ACTIVE_LOCALE_MODE="$(detect_locale_mode)"
    return 0
  fi

  return 1
}

for route in "${ROUTES[@]}"; do
  if [[ "$ACTIVE_LOCALE_MODE" == "prefix" ]]; then
    if [[ "$route" == "/" ]]; then
      es_path="/es"
    else
      es_path="/es$route"
    fi
  else
    es_path="$route"
  fi

  en_path="$route"

  es_html_file="$(mktemp)"
  en_html_file="$(mktemp)"

  if [[ "$ACTIVE_LOCALE_MODE" == "prefix" ]]; then
    es_status="$(fetch_status "$BASE_URL$es_path" "$es_html_file" "Cookie: locale=en")"
  else
    es_status="$(fetch_status "$BASE_URL$es_path" "$es_html_file" "Cookie: locale=es")"
  fi
  en_status="$(fetch_status "$BASE_URL$en_path" "$en_html_file" "Cookie: locale=en")"

  if [[ "$en_status" == "000" || "$es_status" == "000" ]]; then
    if attempt_recovery; then
      if [[ "$ACTIVE_LOCALE_MODE" == "prefix" ]]; then
        es_status="$(fetch_status "$BASE_URL$es_path" "$es_html_file" "Cookie: locale=en")"
      else
        es_status="$(fetch_status "$BASE_URL$es_path" "$es_html_file" "Cookie: locale=es")"
      fi
      en_status="$(fetch_status "$BASE_URL$en_path" "$en_html_file" "Cookie: locale=en")"
    fi
  fi

  if [[ "$en_status" == "000" || "$es_status" == "000" ]]; then
    echo "| $route | ABORTED | n/a | n/a | Dev server unavailable after retry/recovery |"
    ABORTED=1
    rm -f "$es_html_file" "$en_html_file"
    break
  fi

  lang_es="false"
  if rg -q '<html lang="es"' "$es_html_file"; then
    lang_es="true"
  fi

  note=""
  status="PASS"

  if [[ "$es_status" != "200" || "$en_status" != "200" ]]; then
    if [[ -n "${INVARIANT_REDIRECT_NOTES[$route]:-}" ]] && [[ "$es_status" =~ ^30[78]$ ]] && [[ "$en_status" =~ ^30[78]$ ]]; then
      status="REVIEW"
      note="${INVARIANT_REDIRECT_NOTES[$route]}"
      REVIEW=$((REVIEW + 1))
    else
    status="FAIL"
    note="HTTP en=$en_status es=$es_status"
    FAIL=$((FAIL + 1))
    fi
  elif [[ "$lang_es" != "true" ]]; then
    status="FAIL"
    note="Missing html lang=es"
    FAIL=$((FAIL + 1))
  elif [[ "$route" == "/accessibility" || "$route" == "/offline" ]]; then
    status="REVIEW"
    note="Route is expected to be largely language-invariant"
    REVIEW=$((REVIEW + 1))
  else
    PASS=$((PASS + 1))
  fi

  echo "| $route | $status | $en_status/$es_status | $lang_es | $note |"

  rm -f "$es_html_file" "$en_html_file"
done

echo
echo "Summary: PASS=$PASS REVIEW=$REVIEW FAIL=$FAIL"
echo "Mode: $ACTIVE_LOCALE_MODE BASE_URL=$BASE_URL"
echo "Recoveries used: $RECOVERY_COUNT/$MAX_RECOVERIES"

if [[ "$ABORTED" -gt 0 ]]; then
  echo "Result: INCONCLUSIVE (dev server instability during sweep)"
  exit 2
fi

if [[ "$FAIL" -gt 0 ]]; then
  exit 1
fi
