#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(git rev-parse --show-toplevel)"
DOCS_SOURCE_DIR="$ROOT_DIR/docs"
DOCS_TARGET_DIR="$ROOT_DIR/apps/website/docs"
MESSAGES_SOURCE_DIR="$ROOT_DIR/messages"
MESSAGES_TARGET_DIR="$ROOT_DIR/apps/website/messages"
DOCUMENTS_SOURCE_DIR="$ROOT_DIR/documents"
DOCUMENTS_TARGET_DIR="$ROOT_DIR/apps/website/documents"

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

if [[ ! -d "$DOCS_TARGET_DIR" ]]; then
  echo "Missing target docs directory: $DOCS_TARGET_DIR" >&2
  echo "Run: pnpm docs:sync" >&2
  exit 1
fi

if [[ ! -d "$MESSAGES_TARGET_DIR" ]]; then
  echo "Missing target messages directory: $MESSAGES_TARGET_DIR" >&2
  echo "Run: pnpm docs:sync" >&2
  exit 1
fi

if [[ ! -d "$DOCUMENTS_TARGET_DIR" ]]; then
  echo "Missing target documents directory: $DOCUMENTS_TARGET_DIR" >&2
  echo "Run: pnpm docs:sync" >&2
  exit 1
fi

if ! diff -qr "$DOCS_SOURCE_DIR" "$DOCS_TARGET_DIR" > /dev/null; then
  echo "Docs are out of sync between $DOCS_SOURCE_DIR and $DOCS_TARGET_DIR" >&2
  echo "Run: pnpm docs:sync" >&2
  diff -qr "$DOCS_SOURCE_DIR" "$DOCS_TARGET_DIR" | head -n 50 >&2
  exit 1
fi

if ! diff -qr "$MESSAGES_SOURCE_DIR" "$MESSAGES_TARGET_DIR" > /dev/null; then
  echo "Messages are out of sync between $MESSAGES_SOURCE_DIR and $MESSAGES_TARGET_DIR" >&2
  echo "Run: pnpm docs:sync" >&2
  diff -qr "$MESSAGES_SOURCE_DIR" "$MESSAGES_TARGET_DIR" | head -n 50 >&2
  exit 1
fi

if ! diff -qr \
  --exclude='output' \
  --exclude='_tmp_*' \
  --exclude='safety-manual-public.json' \
  "$DOCUMENTS_SOURCE_DIR" "$DOCUMENTS_TARGET_DIR" > /dev/null; then
  echo "Documents are out of sync between $DOCUMENTS_SOURCE_DIR and $DOCUMENTS_TARGET_DIR" >&2
  echo "Run: pnpm docs:sync" >&2
  diff -qr \
    --exclude='output' \
    --exclude='_tmp_*' \
    --exclude='safety-manual-public.json' \
    "$DOCUMENTS_SOURCE_DIR" "$DOCUMENTS_TARGET_DIR" | head -n 50 >&2
  exit 1
fi

echo "Docs, messages, and documents are in sync"
