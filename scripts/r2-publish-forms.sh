#!/usr/bin/env bash
# ──────────────────────────────────────────────────────────────────────────────
# scripts/r2-publish-forms.sh
#
# Upload locally generated Safety Program form PDFs to the FILE_ASSETS R2 bucket
# (mh-construction-assets) under the "docs/forms/" key prefix.
#
# Run AFTER:
#   npm run docs:generate   (creates documents/output/forms/*.pdf)
#
# Resulting R2 keys (served via /docs/** Workers proxy):
#   docs/forms/toolbox-talk.pdf
#   docs/forms/jha.pdf
#   docs/forms/incident-report.pdf
#   docs/forms/site-inspection.pdf
#   docs/forms/equipment-checklist.pdf
#   docs/forms/signin-log.pdf
#
# Prerequisites:
#   wrangler CLI installed and authenticated:
#     npm install -g wrangler && wrangler login
#
# Usage:
#   npm run docs:publish:forms
#   bash scripts/r2-publish-forms.sh
# ──────────────────────────────────────────────────────────────────────────────
set -euo pipefail

BUCKET="mh-construction-assets"
R2_PREFIX="docs/forms"
FORMS_DIR="documents/output/forms"

echo "🔍  Checking for generated form PDFs in $FORMS_DIR …"

if [ ! -d "$FORMS_DIR" ]; then
  echo "❌  $FORMS_DIR not found. Run 'npm run docs:generate' first."
  exit 1
fi

PDF_COUNT=$(find "$FORMS_DIR" -name "*.pdf" -type f | wc -l | tr -d ' ')

if [ "$PDF_COUNT" -eq 0 ]; then
  echo "⚠️   No PDFs found in $FORMS_DIR"
  exit 1
fi

echo ""
echo "📤  Uploading $PDF_COUNT form PDFs to R2 ($R2_PREFIX/) …"

TOTAL=0
find "$FORMS_DIR" -name "*.pdf" -type f | sort | while read -r pdf_path; do
  pdf_name="$(basename "$pdf_path")"
  KEY="$R2_PREFIX/$pdf_name"
  echo "  ↑ $KEY"
  wrangler r2 object put "$BUCKET/$KEY" \
    --file "$pdf_path" \
    --content-type "application/pdf"
  TOTAL=$((TOTAL + 1))
done

echo ""
echo "✅  Form PDFs published to R2."
echo "    Bucket  : $BUCKET"
echo "    Prefix  : $R2_PREFIX/"
echo ""
echo "    Live URLs (via /docs/** proxy):"
echo "    https://www.mhc-gc.com/docs/forms/toolbox-talk.pdf"
echo "    https://www.mhc-gc.com/docs/forms/jha.pdf"
echo "    https://www.mhc-gc.com/docs/forms/incident-report.pdf"
echo "    https://www.mhc-gc.com/docs/forms/site-inspection.pdf"
echo "    https://www.mhc-gc.com/docs/forms/equipment-checklist.pdf"
echo "    https://www.mhc-gc.com/docs/forms/signin-log.pdf"
echo ""
echo "    Verify:"
echo "    wrangler r2 object list $BUCKET --prefix $R2_PREFIX/ | head -20"
