#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
while [[ "$ROOT_DIR" != "/" ]]; do
  if [[ -f "$ROOT_DIR/package.json" && -f "$ROOT_DIR/pnpm-workspace.yaml" ]]; then
    break
  fi
  ROOT_DIR="$(dirname "$ROOT_DIR")"
done

exec bash "$ROOT_DIR/apps/website/scripts/validation/check-secrets.sh" "$@"
