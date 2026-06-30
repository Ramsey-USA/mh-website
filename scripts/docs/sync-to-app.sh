#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(git rev-parse --show-toplevel)"
DOCS_SOURCE_DIR="$ROOT_DIR/docs/"
DOCS_TARGET_DIR="$ROOT_DIR/apps/website/docs/"
MESSAGES_SOURCE_DIR="$ROOT_DIR/messages/"
MESSAGES_TARGET_DIR="$ROOT_DIR/apps/website/messages/"
DOCUMENTS_SOURCE_DIR="$ROOT_DIR/documents/"
DOCUMENTS_TARGET_DIR="$ROOT_DIR/apps/website/documents/"

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

rsync -a --delete "$DOCS_SOURCE_DIR" "$DOCS_TARGET_DIR"
rsync -a --delete "$MESSAGES_SOURCE_DIR" "$MESSAGES_TARGET_DIR"
rsync -a --delete \
  --exclude 'output/' \
  --exclude '_tmp_*' \
  --exclude 'content/safety-manual-public.json' \
  "$DOCUMENTS_SOURCE_DIR" "$DOCUMENTS_TARGET_DIR"

echo "Synced docs from $DOCS_SOURCE_DIR to $DOCS_TARGET_DIR"
echo "Synced messages from $MESSAGES_SOURCE_DIR to $MESSAGES_TARGET_DIR"
echo "Synced documents from $DOCUMENTS_SOURCE_DIR to $DOCUMENTS_TARGET_DIR"
