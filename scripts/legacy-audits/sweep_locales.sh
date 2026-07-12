#!/bin/bash

# 1) Start dev server if needed
if [[ -z $(lsof -tiTCP:3000 -sTCP:LISTEN) ]]; then
  npm run dev > /tmp/mh-dev.log 2>&1 &
  COUNT=0
  until curl -s -I http://localhost:3000 > /dev/null; do
    sleep 2
    COUNT=$((COUNT+2))
    [[ $COUNT -gt 60 ]] && exit 1
  done
fi

# 2) Find Static Routes
APP_DIR="apps/website/src/app"
STATIC_ROUTES=()
DYNAMIC_ROUTES=()

while IFS= read -r file; do
  route=$(echo "$file" | sed "s|$APP_DIR||" | sed 's|/page.tsx||' | sed 's|/page.js||')
  [[ -z "$route" ]] && route="/"
  if [[ "$route" == *"["* ]]; then
    DYNAMIC_ROUTES+=("$route")
  else
    STATIC_ROUTES+=("$route")
  fi
done < <(find "$APP_DIR" -maxdepth 4 -name "page.tsx" -o -name "page.js")

# 3) Process Routes
echo "| Route | Toggle Marker | EN/ES Diff | Status |"
echo "| :--- | :--- | :--- | :--- |"

PASS=0; REVIEW=0; FAIL=0

for route in "${STATIC_ROUTES[@]}"; do
  url="http://localhost:3000${route}"
  
  # Check Toggle Marker (Check for span with text "English" or "Español")
  CONTENT=$(curl -s "$url")
  HAS_TOGGLE=$(echo "$CONTENT" | grep -Ei "English|Español" > /dev/null && echo "true" || echo "false")
  
  # EN vs ES Diff check
  EN_TEXT=$(curl -s "$url" | sed 's/<[^>]*>//g' | tr -d '[:space:]' | cut -c 1-500)
  ES_TEXT=$(curl -s -H "Accept-Language: es" "$url" | sed 's/<[^>]*>//g' | tr -d '[:space:]' | cut -c 1-500)
  
  DIFF_TRUE="false"
  [[ "$EN_TEXT" != "$ES_TEXT" ]] && DIFF_TRUE="true"

  # Status Logic
  if [[ "$HAS_TOGGLE" == "true" && "$DIFF_TRUE" == "true" ]]; then
    STATUS="PASS"; ((PASS++))
  elif [[ "$HAS_TOGGLE" == "true" ]]; then
    STATUS="REVIEW"; ((REVIEW++))
  else
    STATUS="FAIL"; ((FAIL++))
  fi

  echo "| $route | $HAS_TOGGLE | $DIFF_TRUE | $STATUS |"
done

echo -e "\n**Summary**"
echo "- PASS: $PASS"
echo "- REVIEW: $REVIEW"
echo "- FAIL: $FAIL"
echo -e "\n**Skipped Dynamic Routes**"
for d in "${DYNAMIC_ROUTES[@]}"; do echo "- $d"; done
