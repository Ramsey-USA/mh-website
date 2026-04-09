#!/usr/bin/env bash
# ──────────────────────────────────────────────────────────────────────────────
# scripts/r2-publish-safety-pdfs.sh
#
# Upload locally generated Safety Program PDFs to the FILE_ASSETS R2 bucket
# (mh-construction-assets) under the "docs/safety/" key prefix.
#
# Run AFTER:
#   npm run docs:generate   (creates documents/output/sections/*.pdf)
#   npm run docs:merge      (creates documents/output/safety-manual-complete.pdf)
#
# Resulting R2 keys (served via /docs/** Workers proxy):
#   docs/safety/safety-manual-complete.pdf
#   docs/safety/safety-manual-digital.pdf  (if present)
#   docs/safety/sections/00-table-of-contents.pdf
#   docs/safety/sections/01-injury-free-workplace-plan.pdf
#   … (all 44+ section PDFs)
#
# Prerequisites:
#   wrangler CLI installed and authenticated:
#     npm install -g wrangler && wrangler login
#
# Usage:
#   npm run docs:publish:safety
#   bash scripts/r2-publish-safety-pdfs.sh
# ──────────────────────────────────────────────────────────────────────────────
set -euo pipefail

BUCKET="mh-construction-assets"
R2_PREFIX="docs/safety"
OUTPUT_DIR="documents/output"
SECTIONS_DIR="$OUTPUT_DIR/sections"

echo "🔍  Checking for generated Safety PDFs in $OUTPUT_DIR …"

if [ ! -d "$OUTPUT_DIR" ]; then
  echo "❌  $OUTPUT_DIR not found. Run 'npm run docs:generate' first."
  exit 1
fi

TOTAL=0

# ── 1. Complete + digital merged manuals ────────────────────────────────────
for pdf_name in "safety-manual-complete.pdf" "safety-manual-digital.pdf"; do
  pdf_path="$OUTPUT_DIR/$pdf_name"
  if [ -f "$pdf_path" ]; then
    KEY="$R2_PREFIX/$pdf_name"
    echo "  ↑ $KEY"
    wrangler r2 object put "$BUCKET/$KEY" \
      --file "$pdf_path" \
      --content-type "application/pdf"
    TOTAL=$((TOTAL + 1))
  fi
done

# ── 2. Section PDFs ──────────────────────────────────────────────────────────
if [ -d "$SECTIONS_DIR" ]; then
  PDF_COUNT=$(find "$SECTIONS_DIR" -name "*.pdf" -type f | wc -l | tr -d ' ')
  echo ""
  echo "📤  Uploading $PDF_COUNT section PDFs to R2 ($R2_PREFIX/sections/) …"
  find "$SECTIONS_DIR" -name "*.pdf" -type f | sort | while read -r pdf_path; do
    pdf_name="$(basename "$pdf_path")"
    KEY="$R2_PREFIX/sections/$pdf_name"
    echo "  ↑ $KEY"
    wrangler r2 object put "$BUCKET/$KEY" \
      --file "$pdf_path" \
      --content-type "application/pdf"
    TOTAL=$((TOTAL + 1))
  done
else
  echo "⚠️   No sections/ directory found. Run 'npm run docs:generate:sections' first."
fi

echo ""
echo "✅  Safety PDFs published to R2."
echo "    Bucket  : $BUCKET"
echo "    Prefix  : $R2_PREFIX/"
echo ""
echo "    Verify:"
echo "    wrangler r2 object list $BUCKET --prefix $R2_PREFIX/ | head -60"
