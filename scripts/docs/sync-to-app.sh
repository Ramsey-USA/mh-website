#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(git rev-parse --show-toplevel)"
SOURCE_DIR="$ROOT_DIR/docs/"
TARGET_DIR="$ROOT_DIR/apps/website/docs/"

if [[ ! -d "$SOURCE_DIR" ]]; then
  echo "Missing source docs directory: $SOURCE_DIR" >&2
  exit 1
fi

mkdir -p "$TARGET_DIR"
rsync -a --delete "$SOURCE_DIR" "$TARGET_DIR"

echo "Synced docs from $SOURCE_DIR to $TARGET_DIR"
