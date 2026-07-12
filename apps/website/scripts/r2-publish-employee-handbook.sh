#!/usr/bin/env bash
# Upload the Employee Handbook PDF to FILE_ASSETS R2 for /docs/** delivery.
set -euo pipefail

source "$(dirname "${BASH_SOURCE[0]}")/lib/load-cloudflare-r2-env.sh"
require_cloudflare_r2_env

ROOT="$(git rev-parse --show-toplevel)"
BUCKET="mh-construction-assets"
SOURCE_FULL_PDF="$ROOT/documents/generated-pdfs/employee-handbook-complete.pdf"
SOURCE_TOC_PDF="$ROOT/documents/generated-pdfs/employee-handbook-toc.pdf"
R2_KEY_FULL="docs/employee/employee-handbook-2026.pdf"
R2_KEY_TOC="docs/employee/employee-handbook-toc.pdf"

if [ ! -f "$SOURCE_FULL_PDF" ]; then
  echo "❌ Employee handbook PDF not found at: $SOURCE_FULL_PDF"
  echo "   Run 'npm run docs:generate:handbook' and 'npm run docs:merge:handbook' first."
  exit 1
fi

if [ ! -f "$SOURCE_TOC_PDF" ]; then
  echo "❌ Employee handbook TOC PDF not found at: $SOURCE_TOC_PDF"
  echo "   Run 'npm run docs:generate:handbook' first."
  exit 1
fi

echo "📤 Uploading Employee Handbook assets to R2..."
echo "  ↑ $R2_KEY_FULL"
wrangler r2 object put "$BUCKET/$R2_KEY_FULL" \
  --remote \
  --file "$SOURCE_FULL_PDF" \
  --content-type "application/pdf"

echo "  ↑ $R2_KEY_TOC"
wrangler r2 object put "$BUCKET/$R2_KEY_TOC" \
  --remote \
  --file "$SOURCE_TOC_PDF" \
  --content-type "application/pdf"

echo ""
echo "✅ Employee Handbook assets published to R2."
echo "    Bucket: $BUCKET"
echo "    Full  : https://www.mhc-gc.com/$R2_KEY_FULL"
echo "    TOC   : https://www.mhc-gc.com/$R2_KEY_TOC"
