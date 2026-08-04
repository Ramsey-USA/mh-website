#!/usr/bin/env bash
# Upload a generated manual family (cover/spine/tabs/toc/complete/digital) to FILE_ASSETS R2.
# Usage: bash scripts/r2-publish-manual-family.sh <manual-slug> <r2-prefix>
# Example: bash scripts/r2-publish-manual-family.sh operations-manual docs/operations
set -euo pipefail

source "$(dirname "${BASH_SOURCE[0]}")/lib/load-cloudflare-r2-env.sh"
require_cloudflare_r2_env

if [ "$#" -ne 2 ]; then
  echo "Usage: $0 <manual-slug> <r2-prefix>"
  echo "Example: $0 operations-manual docs/operations"
  exit 1
fi

MANUAL_SLUG="$1"
R2_PREFIX="$2"
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
while [[ "$ROOT" != "/" ]]; do
  if [[ -f "$ROOT/package.json" && -f "$ROOT/pnpm-workspace.yaml" ]]; then
    break
  fi
  ROOT="$(dirname "$ROOT")"
done

BUCKET="mh-construction-assets"
OUTPUT_DIR="$ROOT/documents/generated-pdfs"
SECTIONS_DIR="$OUTPUT_DIR/sections"

FILES=(
  "$MANUAL_SLUG-complete.pdf"
  "$MANUAL_SLUG-digital.pdf"
  "$MANUAL_SLUG-cover.pdf"
  "$MANUAL_SLUG-spine.pdf"
  "$MANUAL_SLUG-tabs.pdf"
  "$MANUAL_SLUG-toc.pdf"
)

for file_name in "${FILES[@]}"; do
  source_path="$OUTPUT_DIR/$file_name"
  if [ ! -f "$source_path" ]; then
    echo "❌ Missing generated PDF: $source_path"
    echo "   Run docs:all (or docs:generate + docs:merge for this manual) first."
    exit 1
  fi
done

echo "📤 Uploading $MANUAL_SLUG assets to R2 ($R2_PREFIX/)"
for file_name in "${FILES[@]}"; do
  source_path="$OUTPUT_DIR/$file_name"
  key="$R2_PREFIX/$file_name"
  echo "  ↑ $key"
  wrangler r2 object put "$BUCKET/$key" \
    --remote \
    --file "$source_path" \
    --content-type "application/pdf"
done

if [ -d "$SECTIONS_DIR" ]; then
  SECTION_COUNT=$(find "$SECTIONS_DIR" -name "*.pdf" -type f | wc -l | tr -d ' ')
  echo "📤 Uploading $SECTION_COUNT section PDF(s) to R2 ($R2_PREFIX/sections/)"
  find "$SECTIONS_DIR" -name "*.pdf" -type f | sort | while read -r section_path; do
    section_name="$(basename "$section_path")"
    section_key="$R2_PREFIX/sections/$section_name"
    echo "  ↑ $section_key"
    wrangler r2 object put "$BUCKET/$section_key" \
      --remote \
      --file "$section_path" \
      --content-type "application/pdf"
  done
else
  echo "⚠️  No sections directory found at $SECTIONS_DIR."
  echo "   Run docs:generate for $MANUAL_SLUG before publishing if chapter QR links are required."
fi

echo "✅ $MANUAL_SLUG assets published to R2."
echo "   Bucket: $BUCKET"
echo "   Prefix: $R2_PREFIX/"