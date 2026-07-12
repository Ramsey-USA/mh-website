#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
APP_DIR="$ROOT_DIR/src/app"
BASE_URL="${BASE_URL:-http://127.0.0.1:3000}"

DEV_PID=""

cleanup() {
  if [[ -n "$DEV_PID" ]]; then
    kill "$DEV_PID" >/dev/null 2>&1 || true
    wait "$DEV_PID" 2>/dev/null || true
  fi
}

trap cleanup EXIT

if ! curl -s -I "$BASE_URL" >/dev/null 2>&1; then
  echo "Starting local dev server for sweep..."
  (
    cd "$ROOT_DIR"
    pnpm dev --webpack >/tmp/mh-spanish-sweep-dev.log 2>&1
  ) &
  DEV_PID="$!"

  for _ in {1..60}; do
    if curl -s -I "$BASE_URL" >/dev/null 2>&1; then
      break
    fi
    sleep 1
  done

  if ! curl -s -I "$BASE_URL" >/dev/null 2>&1; then
    echo "FAIL: Dev server did not become ready at $BASE_URL"
    exit 1
  fi
fi

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

fetch_status() {
  local url="$1"
  local out_file="$2"
  local header="$3"
  local status="000"

  for _ in {1..3}; do
    if status="$(curl -sS --max-time 30 -o "$out_file" -w "%{http_code}" -H "$header" "$url")"; then
      echo "$status"
      return 0
    fi
    sleep 1
  done

  : >"$out_file"
  echo "000"
  return 0
}

for route in "${ROUTES[@]}"; do
  if ! curl -s -I "$BASE_URL" >/dev/null 2>&1; then
    echo "| $route | ABORTED | n/a | n/a | Dev server became unavailable mid-run |"
    ABORTED=1
    break
  fi

  if [[ "$route" == "/" ]]; then
    es_path="/es"
  else
    es_path="/es$route"
  fi

  en_path="$route"

  es_html_file="$(mktemp)"
  en_html_file="$(mktemp)"

  es_status="$(fetch_status "$BASE_URL$es_path" "$es_html_file" "Cookie: locale=en")"
  en_status="$(fetch_status "$BASE_URL$en_path" "$en_html_file" "Cookie: locale=en")"

  lang_es="false"
  if rg -q '<html lang="es"' "$es_html_file"; then
    lang_es="true"
  fi

  note=""
  status="PASS"

  if [[ "$es_status" != "200" || "$en_status" != "200" ]]; then
    status="FAIL"
    note="HTTP en=$en_status es=$es_status"
    FAIL=$((FAIL + 1))
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

if [[ "$ABORTED" -gt 0 ]]; then
  echo "Result: INCONCLUSIVE (dev server instability during sweep)"
  exit 2
fi

if [[ "$FAIL" -gt 0 ]]; then
  exit 1
fi
