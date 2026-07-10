#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(git rev-parse --show-toplevel)"
STALE_MIRROR_OUTPUT_DIR="$ROOT_DIR/apps/website/documents/output"

if [ ! -d "$STALE_MIRROR_OUTPUT_DIR" ]; then
  echo "PDF preflight passed: no stale mirror output directory found."
  exit 0
fi

if [ -n "$(find "$STALE_MIRROR_OUTPUT_DIR" -mindepth 1 -maxdepth 1 2>/dev/null)" ]; then
  echo "PDF preflight failed: stale mirror output directory is not empty." >&2
  echo "Path: $STALE_MIRROR_OUTPUT_DIR" >&2
  echo "Run: pnpm run docs:clean:legacy-output" >&2
  exit 1
fi

echo "PDF preflight passed: stale mirror output directory is clean."