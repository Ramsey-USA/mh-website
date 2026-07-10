#!/usr/bin/env bash

set -euo pipefail

MODE="check"
if [[ "${1:-}" == "--fix" ]]; then
  MODE="fix"
fi

ROOT="$(git rev-parse --show-toplevel)"
cd "$ROOT"

# Enforce canonical docs/messages/documents layout before linting markdown.
bash scripts/docs/check-sync.sh

# Enforce discoverability for newly added docs markdown files.
bash scripts/docs/check-new-doc-index-links.sh

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

md_files=()
while IFS= read -r -d '' file; do
  if [[ -f "$file" ]]; then
    md_files+=("$file")
  fi
done < <(
  git ls-files -z '*.md' \
    ':!:.github/agents/**' \
    ':!:apps/website/public/images/qr-codes/README.md'
)

if [[ ${#md_files[@]} -gt 0 ]]; then
  pnpm exec markdownlint-cli2 "${MARKDOWN_ARGS[@]}" "${md_files[@]}"
fi
