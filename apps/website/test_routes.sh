#!/bin/bash
BASE_URL="http://localhost:3000"
ROUTES=(
  "/"
  "/about"
  "/services"
  "/careers"
  "/contact"
  "/team"
  "/projects"
  "/faq"
  "/public-sector"
  "/allies"
  "/veterans"
  "/cool-desert-nights"
)

TOTAL=0
FAILED=0

echo "Testing routes..."
for route in "${ROUTES[@]}"; do
  ((TOTAL++))
  # Follow redirects to get final status but catch the first one
  RESPONSE=$(curl -s -o /dev/null -w "%{http_code} %{redirect_url}" "$BASE_URL$route")
  STATUS=$(echo $RESPONSE | cut -d' ' -f1)
  REDIR=$(echo $RESPONSE | cut -d' ' -f2)

  if [[ "$STATUS" =~ ^30[78]$ ]]; then
    echo "REDIRECT $STATUS: $route -> $REDIR"
  elif [[ "$STATUS" -ge 400 ]]; then
    echo "FAILED $STATUS: $route"
    ((FAILED++))
  else
    echo "SUCCESS $STATUS: $route"
  fi
done

echo "---"
echo "Total: $TOTAL"
echo "Failed: $FAILED"
