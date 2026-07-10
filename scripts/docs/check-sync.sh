#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(git rev-parse --show-toplevel)"
DOCS_SOURCE_DIR="$ROOT_DIR/docs"
MESSAGES_SOURCE_DIR="$ROOT_DIR/messages"
DOCUMENTS_SOURCE_DIR="$ROOT_DIR/documents"

find_mirror_files() {
  local base="$1"
  local root_base="$ROOT_DIR/$base"
  local app_base="$ROOT_DIR/apps/website/$base"

  [[ -d "$root_base" && -d "$app_base" ]] || return 0

  while IFS= read -r source_file; do
    local rel="${source_file#${root_base}/}"
    local mirror_file="$app_base/$rel"
    if [[ -f "$mirror_file" ]]; then
      echo "$mirror_file"
    fi
  done < <(find "$root_base" -type f)
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

mapfile -t docs_mirror_files < <(find_mirror_files "docs")
mapfile -t messages_mirror_files < <(find_mirror_files "messages")
mapfile -t documents_mirror_files < <(find_mirror_files "documents")

total_mirror_files=$((
  ${#docs_mirror_files[@]} + ${#messages_mirror_files[@]} + ${#documents_mirror_files[@]}
))

if [[ "$total_mirror_files" -gt 0 ]]; then
  echo "Mirror files detected under apps/website; keep canonical docs/messages/documents at root only." >&2
  printf '%s\n' "${docs_mirror_files[@]}" "${messages_mirror_files[@]}" "${documents_mirror_files[@]}" \
    | sed '/^$/d' \
    | head -n 50 >&2
  exit 1
fi

echo "Canonical docs/messages/documents layout is valid (no app mirror duplicates)."
