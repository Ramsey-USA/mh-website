#!/usr/bin/env bash
set -euo pipefail

find_repo_root() {
  local dir="${1:-$PWD}"
  while [[ "$dir" != "/" ]]; do
    if [[ -f "$dir/package.json" && -f "$dir/pnpm-workspace.yaml" ]]; then
      printf '%s\n' "$dir"
      return 0
    fi
    dir="$(dirname "$dir")"
  done
  return 1
}

ROOT_DIR="$(find_repo_root "$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)")"
if [[ -z "${ROOT_DIR:-}" ]]; then
  echo "Unable to locate repository root." >&2
  exit 1
fi

collect_image_files() {
  if [[ -d "$ROOT_DIR/.git" ]] && command -v git >/dev/null 2>&1; then
    git -C "$ROOT_DIR" diff --cached --name-only --diff-filter=AR | grep -E '\.(jpg|jpeg|png|webp|avif|gif)$' || true
    return 0
  fi

  find "$ROOT_DIR" -type f \( -iname '*.jpg' -o -iname '*.jpeg' -o -iname '*.png' -o -iname '*.webp' -o -iname '*.avif' -o -iname '*.gif' \) \
    ! -path "*/node_modules/*" \
    ! -path "*/.git/*" \
    ! -path "*/.next/*" \
    ! -path "*/coverage/*" \
    | sed "s#^$ROOT_DIR/##" | sort -u
}

staged_images="$(collect_image_files)"

if [[ -z "$staged_images" ]]; then
  echo "✅ Image filename check: no image files detected for validation."
  exit 0
fi

invalid_files=()
while IFS= read -r file; do
  [[ -z "$file" ]] && continue
  filename="${file##*/}"

  if [[ ! "$filename" =~ ^[a-z0-9]+(-[a-z0-9]+)*\.(jpg|jpeg|png|webp|avif|gif)$ ]]; then
    invalid_files+=("$file")
  fi
done <<< "$staged_images"

if [[ ${#invalid_files[@]} -gt 0 ]]; then
  echo "❌ Image filename check failed. Use lowercase kebab-case for uploaded image names."
  echo ""
  echo "Invalid image file(s):"
  printf ' - %s\n' "${invalid_files[@]}"
  echo ""
  echo "Expected format examples:"
  echo " - team-group-photo-2025.webp"
  echo " - project-site-aerial-01.jpg"
  echo ""
  echo "Tip: rename the file(s) and rerun the check."
  exit 1
fi

echo "✅ Image filename check passed."
