#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(git rev-parse --show-toplevel)"
DOCS_SOURCE_DIR="$ROOT_DIR/docs"
MESSAGES_SOURCE_DIR="$ROOT_DIR/messages"
DOCUMENTS_SOURCE_DIR="$ROOT_DIR/documents"

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

echo "[docs:sync] Canonical mode: docs/messages/documents are source-of-truth at repo root."
echo "[docs:sync] No mirror folders are created under apps/website."
