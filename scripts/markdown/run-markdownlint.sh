#!/usr/bin/env bash

set -euo pipefail

MODE="check"
if [[ "${1:-}" == "--fix" ]]; then
  MODE="fix"
fi

ROOT="$(git rev-parse --show-toplevel)"
cd "$ROOT"

# Keep docs/messages/documents mirrors aligned before linting markdown.
bash scripts/docs/check-sync.sh

# Root lint workflow includes branding docs contract checks.
if [[ "${INCLUDE_DOC_GUARDRAILS:-0}" == "1" ]]; then
  bash scripts/validation/check-branding-doc-contracts.sh
fi

MARKDOWN_ARGS=(
  --config .markdownlint-cli2.jsonc
  --ignore-path .markdownlintignore
  --no-globs
)

if [[ "$MODE" == "fix" ]]; then
  MARKDOWN_ARGS=(--fix "${MARKDOWN_ARGS[@]}")
fi

git ls-files '*.md' \
  ':!:.github/agents/**' \
  ':!:apps/website/public/images/qr-codes/README.md' \
  ':!:apps/website/docs/**' \
  | xargs -r pnpm exec markdownlint-cli2 "${MARKDOWN_ARGS[@]}"
