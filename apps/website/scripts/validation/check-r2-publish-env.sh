#!/usr/bin/env bash
set -euo pipefail

find_repo_root() {
  local dir="${1:-$PWD}"
  while [[ "$dir" != "/" ]]; do
    if [[ -f "$dir/package.json" && -f "$dir/pnpm-workspace.yaml" ]]; then
      printf '%s\n' "$dir"
      return 0
    fi
    dir="$(dirname "$dir")"
  done
  return 1
}

ROOT="$(find_repo_root "$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)")"
if [[ -z "${ROOT:-}" ]]; then
  echo "Unable to locate repository root." >&2
  exit 1
fi

cd "$ROOT"

ENV_FILE="${1:-$ROOT/.env.r2.local}"

echo "Checking R2 publish auth setup..."

if [[ ! -f "$ENV_FILE" ]]; then
  echo "❌ Missing $ENV_FILE"
  echo "   Create it from .env.r2.local.example"
  exit 1
fi

if [[ -f "$ROOT/.gitignore" ]] && grep -Eq '(^|[[:space:]])\.env\.r2\.local($|[[:space:]])' "$ROOT/.gitignore"; then
  echo "✅ $ENV_FILE is covered by local ignore rules"
else
  echo "ℹ️ $ENV_FILE is not explicitly ignored by .gitignore"
fi

set -a
# shellcheck disable=SC1090
source "$ENV_FILE"
set +a

source "$ROOT/apps/website/scripts/lib/load-cloudflare-r2-env.sh"

if ! validate_cloudflare_r2_env; then
  exit 1
fi

echo "✅ R2 publish auth file looks valid"