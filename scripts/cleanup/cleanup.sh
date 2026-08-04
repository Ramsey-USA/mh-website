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

ROOT_DIR="$(find_repo_root "$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)")"
if [[ -z "${ROOT_DIR:-}" ]]; then
  echo "Unable to locate repository root." >&2
  exit 1
fi

exec bash "$ROOT_DIR/apps/website/scripts/cleanup/cleanup.sh" "$@"
