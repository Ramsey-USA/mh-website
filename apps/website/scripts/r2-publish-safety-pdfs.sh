#!/usr/bin/env bash
# ──────────────────────────────────────────────────────────────────────────────
# scripts/r2-publish-safety-pdfs.sh
#
# Upload locally generated Safety Program PDFs to the FILE_ASSETS R2 bucket
# (mh-construction-assets) under the "docs/safety/" key prefix.
#
# Run AFTER:
#   npm run docs:generate   (creates documents/generated-pdfs/sections/*.pdf)
#   npm run docs:merge      (creates documents/generated-pdfs/safety-manual-complete.pdf)
#
# Resulting R2 keys (served via /docs/** Workers proxy):
#   docs/safety/safety-manual-complete.pdf
#   docs/safety/safety-manual-digital.pdf  (if present)
#   docs/safety/safety-manual-contents.pdf (published from *_contents.pdf or *_toc.pdf)
#   docs/safety/safety-manual-reference.pdf (if present)
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
OUTPUT_DIR="documents/generated-pdfs"
SECTIONS_DIR="$OUTPUT_DIR/sections"

echo "🔍  Checking for generated Safety PDFs in $OUTPUT_DIR …"

if [ ! -d "$OUTPUT_DIR" ]; then
  echo "❌  $OUTPUT_DIR not found. Run 'npm run docs:generate' first."
  exit 1
fi

TOTAL=0

# ── 1. Complete + digital merged manuals ────────────────────────────────────
for pdf_name in "safety-manual-complete.pdf" "safety-manual-digital.pdf" "safety-manual-contents.pdf" "safety-manual-reference.pdf"; do
  pdf_path="$OUTPUT_DIR/$pdf_name"
  if [ -f "$pdf_path" ]; then
    KEY="$R2_PREFIX/$pdf_name"
    echo "  ↑ $KEY"
    wrangler r2 object put "$BUCKET/$KEY" \
      --remote \
      --file "$pdf_path" \
      --content-type "application/pdf"
    TOTAL=$((TOTAL + 1))
  fi
done

# Backward-compatibility: generator emits safety-manual-toc.pdf, but the site
# expects safety-manual-contents.pdf. If contents is missing and toc exists,
# publish toc bytes to the contents key.
if [ ! -f "$OUTPUT_DIR/safety-manual-contents.pdf" ] && [ -f "$OUTPUT_DIR/safety-manual-toc.pdf" ]; then
  KEY="$R2_PREFIX/safety-manual-contents.pdf"
  echo "  ↑ $KEY (from safety-manual-toc.pdf)"
  wrangler r2 object put "$BUCKET/$KEY" \
    --file "$OUTPUT_DIR/safety-manual-toc.pdf" \
    --content-type "application/pdf"
  TOTAL=$((TOTAL + 1))
fi

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
      --remote \
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
echo "    Verify with sample URLs:"
echo "    https://www.mhc-gc.com/docs/safety/safety-manual-complete.pdf"
echo "    https://www.mhc-gc.com/docs/safety/sections/11-accident-reporting-investigation.pdf"
