#!/usr/bin/env bash
set -euo pipefail

is_git_tracked() {
  local path="$1"
  local repo_root

  repo_root="$(git -C "$(dirname "$path")" rev-parse --show-toplevel 2>/dev/null || true)"
  [[ -n "$repo_root" ]] || return 1
  git -C "$repo_root" ls-files --error-unmatch "$path" >/dev/null 2>&1
}

validate_cloudflare_r2_env() {
  local issues=0

  if [[ -z "${CLOUDFLARE_ACCOUNT_ID:-}" ]]; then
    echo "❌ CLOUDFLARE_ACCOUNT_ID is missing." >&2
    issues=1
  elif [[ ! "${CLOUDFLARE_ACCOUNT_ID}" =~ ^[a-f0-9]{32}$ ]]; then
    echo "❌ CLOUDFLARE_ACCOUNT_ID must be a 32-character lowercase hex string." >&2
    issues=1
  fi

  if [[ -z "${CLOUDFLARE_API_TOKEN:-}" ]]; then
    echo "❌ CLOUDFLARE_API_TOKEN is missing." >&2
    issues=1
  elif [[ "${CLOUDFLARE_API_TOKEN}" =~ [[:space:]] ]]; then
    echo "❌ CLOUDFLARE_API_TOKEN contains whitespace; check for pasted or malformed values." >&2
    issues=1
  elif [[ "${CLOUDFLARE_API_TOKEN}" =~ replace_with|test-token|your_cloudflare_api_token ]]; then
    echo "❌ CLOUDFLARE_API_TOKEN still contains a placeholder or test value." >&2
    issues=1
  elif [[ ${#CLOUDFLARE_API_TOKEN} -lt 20 ]]; then
    echo "❌ CLOUDFLARE_API_TOKEN is unexpectedly short." >&2
    issues=1
  fi

  if [[ -n "${CLOUDFLARE_ENV_SOURCE:-}" && -f "${CLOUDFLARE_ENV_SOURCE}" ]] && is_git_tracked "${CLOUDFLARE_ENV_SOURCE}"; then
    echo "❌ ${CLOUDFLARE_ENV_SOURCE} is tracked by git. Remove it from git immediately." >&2
    issues=1
  fi

  return "$issues"
}

load_cloudflare_r2_env() {
  local helper_dir app_root repo_root candidate

  helper_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
  app_root="$(cd "$helper_dir/../.." && pwd)"
  repo_root="$(git -C "$app_root" rev-parse --show-toplevel 2>/dev/null || true)"

  local -a candidates=(
    "$app_root/.env.r2.local"
    "$app_root/.env.local"
  )

  if [[ -n "$repo_root" ]]; then
    candidates+=(
      "$repo_root/.env.r2.local"
      "$repo_root/.env.local"
    )
  fi

  for candidate in "${candidates[@]}"; do
    if [[ -f "$candidate" ]]; then
      set -a
      # shellcheck disable=SC1090
      source "$candidate"
      set +a
      export CLOUDFLARE_ENV_SOURCE="$candidate"
      return 0
    fi
  done

  return 0
}

require_cloudflare_r2_env() {
  load_cloudflare_r2_env

  if [[ -z "${CLOUDFLARE_API_TOKEN:-}" && -n "${CF_API_TOKEN:-}" ]]; then
    export CLOUDFLARE_API_TOKEN="$CF_API_TOKEN"
  fi

  if [[ -n "${CLOUDFLARE_API_TOKEN:-}" && -n "${CLOUDFLARE_ACCOUNT_ID:-}" ]]; then
    validate_cloudflare_r2_env || return 1
    export WRANGLER_SEND_METRICS="false"
    return 0
  fi

  cat >&2 <<'EOF'
❌ Missing Cloudflare R2 publish credentials.

Set these environment variables before running publish commands:
  CLOUDFLARE_API_TOKEN
  CLOUDFLARE_ACCOUNT_ID

Recommended local setup:
  cp .env.r2.local.example .env.r2.local
  # then fill in your real Cloudflare values

The publish scripts automatically load credentials from:
  apps/website/.env.r2.local
  apps/website/.env.local
  .env.r2.local
  .env.local
EOF
  return 1
}