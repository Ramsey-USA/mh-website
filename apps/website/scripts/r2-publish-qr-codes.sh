#!/usr/bin/env bash
# Publish generated QR code assets to FILE_ASSETS R2 under media/qr-codes/.
set -euo pipefail

source "$(dirname "${BASH_SOURCE[0]}")/lib/load-cloudflare-r2-env.sh"
require_cloudflare_r2_env

ROOT="$(git rev-parse --show-toplevel)"
BUCKET="mh-construction-assets"
SOURCE_DIR="$ROOT/apps/website/public/images/qr-codes"
R2_PREFIX="media/qr-codes"

if [[ ! -d "$SOURCE_DIR" ]]; then
  echo "❌ QR code source directory not found: $SOURCE_DIR"
  echo "   Run 'npm run qr:generate' first."
  exit 1
fi

echo "📤 Uploading QR code assets to R2..."
echo "    Source: $SOURCE_DIR"
echo "    Prefix: $R2_PREFIX/"

find "$SOURCE_DIR" -type f \( -name '*.png' -o -name '*.json' \) | sort | while read -r file; do
  rel="${file#$SOURCE_DIR/}"
  key="$R2_PREFIX/$rel"

  case "$file" in
    *.png) mime="image/png" ;;
    *.json) mime="application/json" ;;
    *) mime="application/octet-stream" ;;
  esac

  echo "  ↑ $key"
  wrangler r2 object put "$BUCKET/$key" \
    --remote \
    --file "$file" \
    --content-type "$mime"
done

echo ""
echo "✅ QR code assets published to R2."
echo "    Bucket: $BUCKET"
echo "    Prefix: $R2_PREFIX/"