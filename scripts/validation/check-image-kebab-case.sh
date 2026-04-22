#!/usr/bin/env bash
set -euo pipefail

# Validate staged image uploads use lowercase kebab-case filenames.
# Scope: added/renamed files only, to avoid blocking legacy tracked assets.

staged_images="$(git diff --cached --name-only --diff-filter=AR | grep -E '\.(jpg|jpeg|png|webp|avif|gif)$' || true)"

if [[ -z "$staged_images" ]]; then
  echo "✅ Image filename check: no added/renamed image files in this commit."
  exit 0
fi

invalid_files=()
while IFS= read -r file; do
  [[ -z "$file" ]] && continue
  filename="${file##*/}"

  # Require lowercase kebab-case stem and lowercase extension.
  if [[ ! "$filename" =~ ^[a-z0-9]+(-[a-z0-9]+)*\.(jpg|jpeg|png|webp|avif|gif)$ ]]; then
    invalid_files+=("$file")
  fi
done <<< "$staged_images"

if [[ ${#invalid_files[@]} -gt 0 ]]; then
  echo "❌ Image filename check failed. Use lowercase kebab-case for uploaded image names."
  echo ""
  echo "Invalid staged image file(s):"
  printf ' - %s\n' "${invalid_files[@]}"
  echo ""
  echo "Expected format examples:"
  echo " - team-group-photo-2025.webp"
  echo " - project-site-aerial-01.jpg"
  echo ""
  echo "Tip: rename and restage the file(s), then commit again."
  exit 1
fi

echo "✅ Image filename check passed."
