#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(git rev-parse --show-toplevel)"
DOCS_SOURCE_DIR="$ROOT_DIR/docs/"
DOCS_TARGET_DIR="$ROOT_DIR/apps/website/docs/"
MESSAGES_SOURCE_DIR="$ROOT_DIR/messages/"
MESSAGES_TARGET_DIR="$ROOT_DIR/apps/website/messages/"
DOCUMENTS_SOURCE_DIR="$ROOT_DIR/documents/"
DOCUMENTS_TARGET_DIR="$ROOT_DIR/apps/website/documents/"
RSYNC_FALLBACK_REPORTED=0

sync_tree() {
  local source_dir="$1"
  local target_dir="$2"
  shift 2
  local excludes=("$@")

  if command -v rsync >/dev/null 2>&1; then
    local rsync_excludes=()
    local exclude
    for exclude in "${excludes[@]}"; do
      rsync_excludes+=("--exclude" "$exclude")
    done

    rsync -a --delete "${rsync_excludes[@]}" "$source_dir" "$target_dir"
    return
  fi

  if [[ "$RSYNC_FALLBACK_REPORTED" -eq 0 ]]; then
    echo "[docs:sync] rsync not found, using tar fallback sync mode" >&2
    RSYNC_FALLBACK_REPORTED=1
  fi

  rm -rf "$target_dir"
  mkdir -p "$target_dir"

  local tar_excludes=()
  for exclude in "${excludes[@]}"; do
    tar_excludes+=("--exclude=$exclude")
  done

  (
    cd "$source_dir"
    tar -cf - "${tar_excludes[@]}" .
  ) | (
    cd "$target_dir"
    tar -xf -
  )
}

if [[ ! -d "$DOCS_SOURCE_DIR" ]]; then
  echo "Missing source docs directory: $DOCS_SOURCE_DIR" >&2
  exit 1
fi

if [[ ! -d "$MESSAGES_SOURCE_DIR" ]]; then
  echo "Missing source messages directory: $MESSAGES_SOURCE_DIR" >&2
  exit 1
fi

if [[ ! -d "$DOCUMENTS_SOURCE_DIR" ]]; then
  echo "Missing source documents directory: $DOCUMENTS_SOURCE_DIR" >&2
  exit 1
fi

mkdir -p "$DOCS_TARGET_DIR"
mkdir -p "$MESSAGES_TARGET_DIR"
mkdir -p "$DOCUMENTS_TARGET_DIR"

sync_tree "$DOCS_SOURCE_DIR" "$DOCS_TARGET_DIR"
sync_tree "$MESSAGES_SOURCE_DIR" "$MESSAGES_TARGET_DIR"
sync_tree \
  "$DOCUMENTS_SOURCE_DIR" \
  "$DOCUMENTS_TARGET_DIR" \
  'output/' \
  '_tmp_*'

echo "Synced docs from $DOCS_SOURCE_DIR to $DOCS_TARGET_DIR"
echo "Synced messages from $MESSAGES_SOURCE_DIR to $MESSAGES_TARGET_DIR"
echo "Synced documents from $DOCUMENTS_SOURCE_DIR to $DOCUMENTS_TARGET_DIR"
