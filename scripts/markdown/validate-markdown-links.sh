#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(git rev-parse --show-toplevel)"
exec bash "$ROOT_DIR/apps/website/scripts/markdown/validate-markdown-links.sh" "$@"
