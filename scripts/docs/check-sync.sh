#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(git rev-parse --show-toplevel)"
SOURCE_DIR="$ROOT_DIR/docs"
TARGET_DIR="$ROOT_DIR/apps/website/docs"

if [[ ! -d "$SOURCE_DIR" ]]; then
  echo "Missing source docs directory: $SOURCE_DIR" >&2
  exit 1
fi

if [[ ! -d "$TARGET_DIR" ]]; then
  echo "Missing target docs directory: $TARGET_DIR" >&2
  echo "Run: pnpm docs:sync" >&2
  exit 1
fi

if diff -qr "$SOURCE_DIR" "$TARGET_DIR" > /dev/null; then
  echo "Docs are in sync: $SOURCE_DIR == $TARGET_DIR"
  exit 0
fi

echo "Docs are out of sync between $SOURCE_DIR and $TARGET_DIR" >&2
echo "Run: pnpm docs:sync" >&2

diff -qr "$SOURCE_DIR" "$TARGET_DIR" | head -n 50 >&2
exit 1
