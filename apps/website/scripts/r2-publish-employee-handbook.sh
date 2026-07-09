#!/usr/bin/env bash
# Upload the Employee Handbook PDF to FILE_ASSETS R2 for /docs/** delivery.
set -euo pipefail

BUCKET="mh-construction-assets"
SOURCE_PDF="documents/content/MH Employee Handbook 2026.pdf"
R2_KEY="docs/employee/employee-handbook-2026.pdf"

if [ ! -f "$SOURCE_PDF" ]; then
  echo "❌ Employee handbook PDF not found at: $SOURCE_PDF"
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
