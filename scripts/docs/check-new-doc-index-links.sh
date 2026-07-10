#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(git rev-parse --show-toplevel)"
cd "$ROOT_DIR"

resolve_base_range() {
  if [[ -n "${BASE_SHA:-}" ]] && git rev-parse --verify "${BASE_SHA}^{commit}" >/dev/null 2>&1; then
    echo "${BASE_SHA}...HEAD"
    return 0
  fi

  if git rev-parse --verify "HEAD~1^{commit}" >/dev/null 2>&1; then
    echo "HEAD~1...HEAD"
    return 0
  fi

  return 1
}

find_index_owner() {
  local file_path="$1"
  local dir
  dir="$(dirname "$file_path")"

  while [[ "$dir" != "." && "$dir" != "/" ]]; do
    if [[ -f "$dir/index.md" ]]; then
      echo "$dir/index.md"
      return 0
    fi
    dir="$(dirname "$dir")"
  done

  return 1
}

has_link_in_index() {
  local index_file="$1"
  local target_file="$2"
  local rel

  rel="$(realpath --relative-to "$(dirname "$index_file")" "$target_file")"

  if grep -Fq "($rel)" "$index_file"; then
    return 0
  fi

  if grep -Fq "(./$rel)" "$index_file"; then
    return 0
  fi

  return 1
}

added_candidates=()

if diff_range="$(resolve_base_range)"; then
  while IFS= read -r file; do
    [[ -n "$file" ]] && added_candidates+=("$file")
  done < <(git diff --name-only --diff-filter=A "$diff_range" | grep -E '^docs/.+\.md$' || true)
fi

# Include staged and unstaged working-tree additions so local lint runs catch
# missing index links before commit.
while IFS= read -r line; do
  [[ -z "$line" ]] && continue
  status="${line:0:2}"
  file="${line:3}"
  if [[ "$status" == "A " || "$status" == "??" ]]; then
    if [[ "$file" =~ ^docs/.+\.md$ ]]; then
      added_candidates+=("$file")
    fi
  fi
done < <(git status --porcelain)

declare -A seen=()
added_md=()
for file in "${added_candidates[@]}"; do
  [[ -n "$file" ]] || continue
  if [[ -z "${seen[$file]+x}" ]]; then
    seen[$file]=1
    added_md+=("$file")
  fi
done

if [[ ${#added_md[@]} -eq 0 ]]; then
  echo "Docs index-link guard: no newly added docs markdown files detected."
  exit 0
fi

missing_links=()

for file in "${added_md[@]}"; do
  [[ -f "$file" ]] || continue

  # Index pages are owners, not link targets.
  if [[ "$(basename "$file")" == "index.md" ]]; then
    continue
  fi

  # Archive snapshots are intentionally path-stable historical artifacts.
  if [[ "$file" == docs/archive/* ]]; then
    continue
  fi

  if ! index_owner="$(find_index_owner "$file")"; then
    missing_links+=("$file|<no-index-owner>")
    continue
  fi

  if ! has_link_in_index "$index_owner" "$file"; then
    missing_links+=("$file|$index_owner")
  fi
done

if [[ ${#missing_links[@]} -gt 0 ]]; then
  echo "Docs index-link guard failed: newly added docs markdown files are missing index links." >&2
  echo "Update the owning index pages listed below:" >&2
  for item in "${missing_links[@]}"; do
    file="${item%%|*}"
    owner="${item##*|}"
    echo "- $file (owner index: $owner)" >&2
  done
  exit 1
fi

echo "Docs index-link guard passed."
