#!/usr/bin/env bash
# ──────────────────────────────────────────────────────────────────────────────
# scripts/r2-publish-forms.sh
#
# Upload locally generated current-form package PDFs to the FILE_ASSETS R2 bucket
# (mh-construction-assets) under the canonical safety and employee handbook
# key prefixes.
#
# Run AFTER:
#   npm run docs:generate:forms   (creates documents/generated-pdfs/form-packages/*.pdf)
#
# Resulting R2 keys (served via /docs/** Workers proxy):
#   docs/safety/forms/form-mish-01-injury-free-workplace-plan-acknowledgment.pdf
#   docs/safety/forms/form-mish-50-return-to-work-program-agreement-ack.pdf
#   docs/safety/forms/safety-manual-forms-package.pdf
#   docs/employee/forms/form-handbook-01-company-vehicle-acknowledgement.pdf
#   docs/employee/forms/form-handbook-07-client-photo-release-form.pdf
#   docs/employee/forms/form-handbook-company-letterhead.pdf
#   docs/employee/forms/employee-handbook-forms-package.pdf
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

source "$(dirname "${BASH_SOURCE[0]}")/lib/load-cloudflare-r2-env.sh"
require_cloudflare_r2_env

ROOT="$(git rev-parse --show-toplevel)"
BUCKET="mh-construction-assets"
SAFETY_PREFIX="docs/safety/forms"
EMPLOYEE_PREFIX="docs/employee/forms"
FORMS_DIR="$ROOT/documents/generated-pdfs/form-packages"

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
echo "📤  Uploading $PDF_COUNT current safety and handbook form package PDFs to R2 …"

TOTAL=0
find "$FORMS_DIR" -name "*.pdf" -type f | sort | while read -r pdf_path; do
  pdf_name="$(basename "$pdf_path")"
  case "$pdf_name" in
    form-mish-51-*)
      echo "  ↷ skip $pdf_name (not part of website inventory)"
      continue
      ;;
    safety-manual-forms-package.pdf)
      KEY="$SAFETY_PREFIX/$pdf_name"
      ;;
    employee-handbook-forms-package.pdf)
      KEY="$EMPLOYEE_PREFIX/$pdf_name"
      ;;
    form-mish-*)
      KEY="$SAFETY_PREFIX/$pdf_name"
      ;;
    form-handbook-*)
      KEY="$EMPLOYEE_PREFIX/$pdf_name"
      ;;
    *)
      echo "  ↷ skip $pdf_name (unknown form family)"
      continue
      ;;
  esac
  echo "  ↑ $KEY"
  wrangler r2 object put "$BUCKET/$KEY" \
    --remote \
    --file "$pdf_path" \
    --content-type "application/pdf"
  TOTAL=$((TOTAL + 1))
done

echo ""
echo "✅  Form package PDFs published to R2."
echo "    Bucket  : $BUCKET"
echo "    Prefixes: $SAFETY_PREFIX/ and $EMPLOYEE_PREFIX/"
echo ""
echo "    Live URLs (via /docs/** proxy):"
echo "    https://www.mhc-gc.com/docs/safety/forms/form-mish-01-injury-free-workplace-plan-acknowledgment.pdf"
echo "    https://www.mhc-gc.com/docs/safety/forms/form-mish-50-return-to-work-program-agreement-ack.pdf"
echo "    https://www.mhc-gc.com/docs/safety/forms/safety-manual-forms-package.pdf"
echo "    https://www.mhc-gc.com/docs/employee/forms/form-handbook-01-company-vehicle-acknowledgement.pdf"
echo "    https://www.mhc-gc.com/docs/employee/forms/form-handbook-07-client-photo-release-form.pdf"
echo "    https://www.mhc-gc.com/docs/employee/forms/form-handbook-company-letterhead.pdf"
echo "    https://www.mhc-gc.com/docs/employee/forms/employee-handbook-forms-package.pdf"
