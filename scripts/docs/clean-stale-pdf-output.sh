#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(git rev-parse --show-toplevel)"
CANONICAL_OUTPUT_DIR="$ROOT_DIR/documents/generated-pdfs"
STALE_MIRROR_OUTPUT_DIR="$ROOT_DIR/apps/website/documents/generated-pdfs"

if [ ! -d "$STALE_MIRROR_OUTPUT_DIR" ]; then
  echo "No stale mirror output directory found at $STALE_MIRROR_OUTPUT_DIR"
  exit 0
fi

if [ ! -d "$CANONICAL_OUTPUT_DIR" ]; then
  echo "Canonical output directory missing at $CANONICAL_OUTPUT_DIR"
  echo "Run docs generation from the @mhc/website package first."
  exit 1
fi

if [ -z "$(find "$STALE_MIRROR_OUTPUT_DIR" -mindepth 1 -maxdepth 1 2>/dev/null)" ]; then
  echo "Stale mirror output directory is already clean: $STALE_MIRROR_OUTPUT_DIR"
  exit 0
fi

echo "Removing stale mirror PDF artifacts from: $STALE_MIRROR_OUTPUT_DIR"
find "$STALE_MIRROR_OUTPUT_DIR" -mindepth 1 -maxdepth 1 -exec rm -rf {} +
echo "Stale mirror output cleanup complete."
