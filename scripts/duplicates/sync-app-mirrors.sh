#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
while [[ "$ROOT_DIR" != "/" ]]; do
  if [[ -f "$ROOT_DIR/package.json" && -f "$ROOT_DIR/pnpm-workspace.yaml" ]]; then
    break
  fi
  ROOT_DIR="$(dirname "$ROOT_DIR")"
done

MODE="sync"
if [[ "${1:-}" == "--check" ]]; then
  MODE="check"
fi

if [[ "$MODE" == "check" ]]; then
  echo "No app mirror files configured; mirror check skipped."
else
  echo "No app mirror files configured; nothing to synchronize."
fi
