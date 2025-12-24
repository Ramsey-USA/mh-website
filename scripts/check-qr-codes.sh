#!/bin/bash

# QR Code Health Check Script
# Quick verification that all QR code files exist and have reasonable sizes

echo "🔍 MH Construction - QR Code Health Check"
echo "=========================================="
echo ""

QR_DIR="public/images/qr-codes"
TOTAL=0
FOUND=0
MISSING=0
SMALL=0

# Expected QR codes (36 unique × 2 variants)
QR_CODES=(
  "homepage" "about" "services" "projects" "team" "careers" "contact" "booking"
  "estimator" "case-studies" "allies" "trade-partners" "veteran-benefits"
  "phone" "email" "linkedin" "facebook" "instagram" "youtube" "twitter" "location"
  "team-jeremy-thamert" "team-mike-holstein" "team-todd-schoeff" "team-brooks-morris"
  "team-matt-ramsey" "team-porter-cline" "team-derek-parks" "team-ben-woodall"
  "team-steve-mcclary" "team-arnold-garcia" "team-trigger" "team-lisa-kandle"
  "team-reagan-massey" "team-brittney-holstein" "team-jennifer-tene"
)

VARIANTS=("color" "bw")

echo "📊 Checking ${#QR_CODES[@]} QR codes × ${#VARIANTS[@]} variants = $((${#QR_CODES[@]} * ${#VARIANTS[@]})) files"
echo ""

for code in "${QR_CODES[@]}"; do
  for variant in "${VARIANTS[@]}"; do
    TOTAL=$((TOTAL + 1))
    FILE="$QR_DIR/qr-${code}-${variant}.png"
    
    if [ -f "$FILE" ]; then
      FOUND=$((FOUND + 1))
      SIZE=$(du -h "$FILE" | cut -f1)
      SIZE_BYTES=$(stat -f%z "$FILE" 2>/dev/null || stat -c%s "$FILE" 2>/dev/null)
      
      # Check if file is too small (less than 5 KB might indicate corruption)
      if [ "$SIZE_BYTES" -lt 5120 ]; then
        SMALL=$((SMALL + 1))
        echo "  ⚠️  $FILE - TOO SMALL ($SIZE)"
      fi
    else
      MISSING=$((MISSING + 1))
      echo "  ❌ MISSING: $FILE"
    fi
  done
done

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
