#!/usr/bin/env bash
# ──────────────────────────────────────────────────────────────────────────────
# scripts/r2-publish-forms.sh
#
# Upload locally generated Safety Program form package PDFs to the FILE_ASSETS R2 bucket
# (mh-construction-assets) under the "docs/safety/forms/" key prefix.
#
# Run AFTER:
#   npm run docs:generate:forms   (creates documents/output/form-packages/*.pdf)
#
# Resulting R2 keys (served via /docs/** Workers proxy):
#   docs/safety/forms/form-02-a-toolbox-talk-sign-in-log.pdf
#   docs/safety/forms/form-02-b-job-hazard-analysis.pdf
#   docs/safety/forms/form-02-c-incident-accident-report.pdf
#   ...remaining packaged forms from the manifest
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
R2_PREFIX="docs/safety/forms"
FORMS_DIR="documents/output/form-packages"

echo "🔍  Checking for generated form package PDFs in $FORMS_DIR …"

if [ ! -d "$FORMS_DIR" ]; then
  echo "❌  $FORMS_DIR not found. Run 'npm run docs:generate:forms' first."
  exit 1
fi

PDF_COUNT=$(find "$FORMS_DIR" -name "*.pdf" -type f | wc -l | tr -d ' ')

if [ "$PDF_COUNT" -eq 0 ]; then
  echo "⚠️   No PDFs found in $FORMS_DIR"
  exit 1
fi

echo ""
echo "📤  Uploading $PDF_COUNT form package PDFs to R2 ($R2_PREFIX/) …"

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
echo "✅  Form package PDFs published to R2."
echo "    Bucket  : $BUCKET"
echo "    Prefix  : $R2_PREFIX/"
echo ""
echo "    Live URLs (via /docs/** proxy):"
echo "    https://www.mhc-gc.com/docs/safety/forms/form-02-a-toolbox-talk-sign-in-log.pdf"
echo "    https://www.mhc-gc.com/docs/safety/forms/form-02-b-job-hazard-analysis.pdf"
echo "    https://www.mhc-gc.com/docs/safety/forms/form-02-c-incident-accident-report.pdf"
