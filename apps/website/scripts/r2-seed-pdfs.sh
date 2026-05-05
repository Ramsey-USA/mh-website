#!/usr/bin/env bash
# ──────────────────────────────────────────────────────────────────────────────
# scripts/r2-seed-pdfs.sh
#
# Migrate PDFs from public/docs/ to the FILE_ASSETS R2 bucket
# (mh-construction-assets) under the "docs/" key prefix.
#
# This script:
#   1. Uploads all PDFs from public/docs/ to R2
#   2. Updates the CI workflow to upload to R2 instead of committing
#   3. Adds public/docs/ to .gitignore
#   4. Removes public/docs/ from git tracking
#
# Prerequisites:
#   - wrangler CLI installed and authenticated
#     (npm install -g wrangler && wrangler login)
#
# Usage:
#   bash scripts/r2-seed-pdfs.sh           # Upload only (safe, no git changes)
#   bash scripts/r2-seed-pdfs.sh --full    # Upload + remove from git
# ──────────────────────────────────────────────────────────────────────────────
set -euo pipefail

BUCKET="mh-construction-assets"
SRC="public/docs"
FULL_MIGRATION="${1:-}"

if [ ! -d "$SRC" ]; then
  echo "❌ Directory $SRC not found. Nothing to upload."
  exit 1
fi

# ── Step 1: Upload to R2 ────────────────────────────────────────────────────
COUNT=$(find "$SRC" -type f | wc -l | tr -d ' ')
echo "📤 Uploading $COUNT files from $SRC to R2 bucket: $BUCKET (prefix: docs/)"

find "$SRC" -type f | while read -r file; do
  REL="${file#$SRC/}"
  KEY="docs/$REL"

  case "$file" in
    *.pdf) MIME="application/pdf" ;;
    *)     MIME="application/octet-stream" ;;
  esac

  echo "  ↑ $KEY ($MIME)"
  wrangler r2 object put "$BUCKET/$KEY" \
    --file "$file" \
    --content-type "$MIME"
done

echo ""
echo "✅ Upload complete — $COUNT files in R2."

# ── Step 2: Verify ──────────────────────────────────────────────────────────
echo ""
echo "🔍 Verifying R2 contents..."
wrangler r2 object list "$BUCKET" --prefix docs/ | head -20
echo ""

if [ "$FULL_MIGRATION" != "--full" ]; then
  echo "Upload done. Run with --full to also remove PDFs from git."
  echo "  bash scripts/r2-seed-pdfs.sh --full"
  exit 0
fi

# ── Step 3: Remove from git ─────────────────────────────────────────────────
echo "🗑️  Removing public/docs/ from git tracking..."

# Add to .gitignore if not already there
if ! grep -q "^public/docs/" .gitignore 2>/dev/null; then
  echo "" >> .gitignore
  echo "# PDFs served from R2 — no longer committed to the repo" >> .gitignore
  echo "public/docs/" >> .gitignore
fi

git rm -r --cached public/docs/ 2>/dev/null || true
echo ""
echo "✅ Migration complete."
echo ""
echo "Next steps:"
echo "  1. git commit -m 'chore: migrate PDFs to R2, remove from build bundle'"
echo "  2. Deploy: npm run deploy"
echo "  3. Verify: curl -I https://www.mhc-gc.com/docs/safety-manual-complete.pdf"
