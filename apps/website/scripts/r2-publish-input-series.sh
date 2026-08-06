#!/usr/bin/env bash
# Publish generated one-to-one input-series PDFs to FILE_ASSETS R2 under docs/series/.
# Usage:
#   npm run docs:publish:input-series
#   bash scripts/r2-publish-input-series.sh
set -euo pipefail

source "$(dirname "${BASH_SOURCE[0]}")/lib/load-cloudflare-r2-env.sh"
require_cloudflare_r2_env

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
while [[ "$ROOT" != "/" ]]; do
  if [[ -f "$ROOT/package.json" && -f "$ROOT/pnpm-workspace.yaml" ]]; then
    break
  fi
  ROOT="$(dirname "$ROOT")"
done

BUCKET="mh-construction-assets"
R2_PREFIX="docs/series"
SOURCE_DIR="$ROOT/documents/generated-pdfs/input-series"

echo "🔍 Checking for generated one-to-one series PDFs in $SOURCE_DIR ..."

if [[ ! -d "$SOURCE_DIR" ]]; then
  echo "❌ $SOURCE_DIR not found. Run 'npm run docs:generate:input-series' first."
  exit 1
fi

PDF_COUNT=$(find "$SOURCE_DIR" -type f -name "*.pdf" | wc -l | tr -d ' ')
if [[ "$PDF_COUNT" -eq 0 ]]; then
  echo "❌ No PDFs found under $SOURCE_DIR. Run 'npm run docs:generate:input-series' first."
  exit 1
fi

echo ""
echo "📤 Uploading $PDF_COUNT input-series PDF(s) to R2 ($R2_PREFIX/) ..."

find "$SOURCE_DIR" -type f -name "*.pdf" | sort | while read -r pdf_path; do
  relative_path="${pdf_path#"$SOURCE_DIR/"}"
  key="$R2_PREFIX/$relative_path"
  echo "  ↑ $key"
  wrangler r2 object put "$BUCKET/$key" \
    --remote \
    --file "$pdf_path" \
    --content-type "application/pdf"
done

echo ""
echo "✅ Input-series PDFs published to R2."
echo "   Bucket : $BUCKET"
echo "   Prefix : $R2_PREFIX/"
echo ""
echo "   Sample URL:"
echo "   https://www.mhc-gc.com/docs/series/01-core-doctrine/mh-company-bible-v1-0-draft.pdf"
