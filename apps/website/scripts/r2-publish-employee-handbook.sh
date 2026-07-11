#!/usr/bin/env bash
# Upload the Employee Handbook PDF to FILE_ASSETS R2 for /docs/** delivery.
set -euo pipefail

source "$(dirname "${BASH_SOURCE[0]}")/lib/load-cloudflare-r2-env.sh"
require_cloudflare_r2_env

ROOT="$(git rev-parse --show-toplevel)"
BUCKET="mh-construction-assets"
SOURCE_PDF="$ROOT/documents/generated-pdfs/employee-handbook-complete.pdf"
R2_KEY="docs/employee/employee-handbook-2026.pdf"

if [ ! -f "$SOURCE_PDF" ]; then
  echo "❌ Employee handbook PDF not found at: $SOURCE_PDF"
  echo "   Run 'npm run docs:generate:handbook' and 'npm run docs:merge:handbook' first."
  exit 1
fi

echo "📤 Uploading Employee Handbook to R2..."
echo "  ↑ $R2_KEY"
wrangler r2 object put "$BUCKET/$R2_KEY" \
  --remote \
  --file "$SOURCE_PDF" \
  --content-type "application/pdf"

echo ""
echo "✅ Employee Handbook published to R2."
echo "    Bucket: $BUCKET"
echo "    Key   : $R2_KEY"
echo "    URL   : https://www.mhc-gc.com/$R2_KEY"
