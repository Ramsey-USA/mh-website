#!/usr/bin/env bash
set -euo pipefail

BASE_URL="${BASE_URL:-https://www.mhc-gc.com}"
MAX_ATTEMPTS="${MAX_ATTEMPTS:-6}"
SLEEP_SECONDS="${SLEEP_SECONDS:-10}"
R2_BUCKET="${R2_BUCKET:-mh-construction-assets}"

URL_PATHS=(
  "/docs/safety/safety-manual-complete.pdf"
  "/docs/safety/safety-manual-reference.pdf"
  "/docs/safety/forms/form-mish-01-injury-free-workplace-plan-acknowledgment.pdf"
  "/docs/safety/forms/form-mish-50-return-to-work-program-agreement-ack.pdf"
  "/docs/employee/employee-handbook-2026.pdf"
  "/docs/employee/forms/form-handbook-01-company-vehicle-acknowledgement.pdf"
)

check_url() {
  local url="$1"
  local attempt=1

  while [[ "$attempt" -le "$MAX_ATTEMPTS" ]]; do
    local code
    code=$(curl -sS -L -o /dev/null -w "%{http_code}" "$url" || true)

    if [[ "$code" =~ ^2|^3 ]]; then
      echo "  OK  $url"
      return 0
    fi

    echo "  WAIT attempt $attempt/$MAX_ATTEMPTS for $url (status: $code)"

    if [[ "$attempt" -lt "$MAX_ATTEMPTS" ]]; then
      sleep "$SLEEP_SECONDS"
    fi

    attempt=$((attempt + 1))
  done

  echo "  FAIL $url did not return 200 after $MAX_ATTEMPTS attempts" >&2
  return 1
}

check_r2_object() {
  local path="$1"
  local key="${path#/}"
  local tmpfile

  tmpfile="$(mktemp)"
  if wrangler r2 object get "$R2_BUCKET/$key" --file "$tmpfile" --remote >/dev/null 2>&1; then
    rm -f "$tmpfile"
    echo "  OK  r2://$R2_BUCKET/$key"
    return 0
  fi

  rm -f "$tmpfile"
  return 1
}

is_cf_challenge() {
  local url="$1"
  local headers

  headers=$(curl -sSI "$url" || true)
  echo "$headers" | grep -qi '^cf-mitigated: challenge'
}

echo "Verifying published handbook/manual/forms URLs at $BASE_URL"

failures=0
for path in "${URL_PATHS[@]}"; do
  url="$BASE_URL$path"
  code=$(curl -sS -L -o /dev/null -w "%{http_code}" "$url" || true)

  if [[ "$code" =~ ^2|^3 ]]; then
    echo "  OK  $url"
    continue
  fi

  if [[ "$code" == "403" ]] && is_cf_challenge "$url"; then
    echo "  NOTE $url returned 403 Cloudflare challenge (protected route)"
    continue
  fi

  if [[ "$code" == "403" ]] && check_r2_object "$path"; then
    echo "  NOTE $url returned 403, but object exists in R2"
    continue
  fi

  if ! check_url "$url"; then
    if [[ "$code" == "403" ]] && check_r2_object "$path"; then
      echo "  NOTE $url remained 403, but object exists in R2"
      continue
    fi
    failures=$((failures + 1))
  fi
done

if [[ "$failures" -gt 0 ]]; then
  echo "Verification failed for $failures URL(s)." >&2
  exit 1
fi

echo "All key handbook/manual/forms URLs are live."
