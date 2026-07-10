#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(git rev-parse --show-toplevel)"
MODE="sync"
if [[ "${1:-}" == "--check" ]]; then
  MODE="check"
fi

# Canonical source is website app; dashboard mirrors these files intentionally.
MIRROR_FILES=(
)

if [[ ${#MIRROR_FILES[@]} -eq 0 ]]; then
  if [[ "$MODE" == "check" ]]; then
    echo "No dashboard mirror files configured; mirror check skipped."
  else
    echo "No dashboard mirror files configured; nothing to synchronize."
  fi
  exit 0
fi

for rel_path in "${MIRROR_FILES[@]}"; do
  source_file="$ROOT_DIR/apps/website/$rel_path"
  target_file="$ROOT_DIR/apps/dashboard/$rel_path"

  if [[ ! -f "$source_file" ]]; then
    echo "Missing canonical source mirror file: $source_file" >&2
    exit 1
  fi

  if [[ "$MODE" == "check" ]]; then
    if [[ ! -f "$target_file" ]]; then
      echo "Missing dashboard mirror file: $target_file" >&2
      exit 1
    fi

    if ! cmp -s "$source_file" "$target_file"; then
      echo "Dashboard mirror drift detected for: $rel_path" >&2
      diff -u "$target_file" "$source_file" || true
      exit 1
    fi
  else
    mkdir -p "$(dirname "$target_file")"
    cp "$source_file" "$target_file"
  fi
done

if [[ "$MODE" == "check" ]]; then
  echo "Dashboard mirror files are in sync with website canonical files."
else
  echo "Synchronized dashboard mirror files from website canonical files."
fi
