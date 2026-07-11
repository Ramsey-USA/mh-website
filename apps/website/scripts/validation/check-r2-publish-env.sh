#!/usr/bin/env bash
set -euo pipefail

ROOT="$(git rev-parse --show-toplevel)"
cd "$ROOT"

ENV_FILE="${1:-$ROOT/.env.r2.local}"

echo "Checking R2 publish auth setup..."

if [[ ! -f "$ENV_FILE" ]]; then
  echo "❌ Missing $ENV_FILE"
  echo "   Create it from .env.r2.local.example"
  exit 1
fi

if git ls-files --error-unmatch "$ENV_FILE" >/dev/null 2>&1; then
  echo "❌ $ENV_FILE is tracked by git"
  echo "   Remove it from git immediately"
  exit 1
fi

set -a
# shellcheck disable=SC1090
source "$ENV_FILE"
set +a

source "$ROOT/apps/website/scripts/lib/load-cloudflare-r2-env.sh"

if ! validate_cloudflare_r2_env; then
  exit 1
fi

echo "✅ R2 publish auth file looks valid and is not tracked by git"