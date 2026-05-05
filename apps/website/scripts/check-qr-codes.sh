#!/bin/bash

# QR Code Health Check Script
# Quick verification that all QR code files exist and have reasonable sizes

echo "🔍 MH Construction - QR Code Health Check"
echo "=========================================="
echo ""

QR_DIR="public/images/qr-codes"
MANIFEST="$QR_DIR/qr-codes-manifest.json"
TOTAL=0
FOUND=0
MISSING=0
SMALL=0

if [ ! -f "$MANIFEST" ]; then
  echo "❌ Missing manifest: $MANIFEST"
  exit 1
fi

echo "📊 Checking manifest-defined QR files"
echo ""

# Read manifest entries as tab-separated lines: name, variant, relativePath
while IFS=$'\t' read -r NAME VARIANT REL_PATH; do
  TOTAL=$((TOTAL + 1))
  FILE="$QR_DIR/$REL_PATH"

  if [ -f "$FILE" ]; then
    FOUND=$((FOUND + 1))
    SIZE=$(du -h "$FILE" | cut -f1)
    SIZE_BYTES=$(stat -f%z "$FILE" 2>/dev/null || stat -c%s "$FILE" 2>/dev/null)

    # Check if file is too small (less than 5 KB might indicate corruption)
    if [ "$SIZE_BYTES" -lt 5120 ]; then
      SMALL=$((SMALL + 1))
      echo "  ⚠️  $REL_PATH - TOO SMALL ($SIZE)"
    fi
  else
    MISSING=$((MISSING + 1))
    echo "  ❌ MISSING: $REL_PATH ($NAME / $VARIANT)"
  fi
done < <(node -e '
const fs = require("fs");
const manifest = JSON.parse(fs.readFileSync(process.argv[1], "utf8"));
for (const qr of manifest.qrCodes || []) {
  const rel = qr.relativePath || qr.filename;
  process.stdout.write(`${qr.name}\t${qr.variant}\t${rel}\n`);
}
' "$MANIFEST")

echo ""
echo "=========================================="
echo "Summary:"
echo "  Total expected: $TOTAL"
echo "  ✅ Found: $FOUND"
echo "  ❌ Missing: $MISSING"
echo "  ⚠️  Too small: $SMALL"
echo ""

if [ $MISSING -eq 0 ] && [ $SMALL -eq 0 ]; then
  echo "✅ All QR code files are present and appear healthy!"
  exit 0
else
  echo "⚠️  Some issues found. Please review above."
  exit 1
fi
