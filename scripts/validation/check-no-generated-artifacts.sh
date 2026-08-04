#!/usr/bin/env bash
set -euo pipefail

# Guardrail: generated reports and legacy app mirror trees must never be committed.
ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
cd "$ROOT_DIR"

PATTERNS=(
  "apps/website/docs/**"
  "apps/website/messages/**"
  "apps/website/documents/**"
  "apps/website/public/docs/**"
  "all_md_files.txt"
  "all_pages.txt"
  "audit_results.txt"
  "results.csv"
  "apps/website/report_old.json"
  "apps/website/report_new.json"
  "routes_list.txt"
  "sitemap_urls.txt"
  "files_with_marker.txt"
  "files_without_marker.txt"
  "pages_with_hero.txt"
  "pages_missing_hero.txt"
)

violations=()

for pattern in "${PATTERNS[@]}"; do
  while IFS= read -r path; do
    [[ -z "$path" ]] && continue
    violations+=("$path")
  done < <(find . -path "./.git" -prune -o -path "./node_modules" -prune -o -type f \( -path "$pattern" \) -print | sed 's#^./##')
done

if [[ ${#violations[@]} -gt 0 ]]; then
  echo "Generated artifacts or legacy app mirror trees are tracked in git:" >&2
  printf ' - %s\n' "${violations[@]}" >&2
  echo >&2
  echo "Fix:" >&2
  echo "  1) Ensure these paths remain in .gitignore" >&2
  echo "  2) Remove from index with: git rm -r --cached <path>" >&2
  exit 1
fi

echo "Generated artifact guard passed."
