#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(git rev-parse --show-toplevel)"
CONTAINER_SCRIPT="$ROOT_DIR/apps/website/scripts/optimization/reencode-avif-container.sh"

QUALITY_MIN="${AVIF_MIN_Q:-18}"
QUALITY_MAX="${AVIF_MAX_Q:-32}"
SPEED="${AVIF_SPEED:-6}"

usage() {
  cat <<'USAGE'
Usage:
  bash apps/website/scripts/optimization/reencode-avif.sh <file-or-dir> [more paths...]

Behavior:
  1) Uses local avifenc/avifdec when available.
  2) Falls back to the container workflow when local tools are missing.

Examples:
  bash apps/website/scripts/optimization/reencode-avif.sh apps/website/public/images/vendors
  bash apps/website/scripts/optimization/reencode-avif.sh apps/website/public/images/vendors/frontier_fencing_logo.avif

Optional tuning via environment variables:
  AVIF_MIN_Q (default: 18)
  AVIF_MAX_Q (default: 32)
  AVIF_SPEED (default: 6)
USAGE
}

normalize_path() {
  local p="$1"

  if [[ "$p" = /* ]]; then
    case "$p" in
      "$ROOT_DIR"/*)
        echo "${p#"$ROOT_DIR"/}"
        ;;
      *)
        echo ""
        ;;
    esac
    return
  fi

  echo "$p"
}

collect_targets() {
  local rel="$1"
  local abs="$ROOT_DIR/$rel"

  if [[ -d "$abs" ]]; then
    find "$rel" -type f -name '*.avif'
    return
  fi

  if [[ -f "$abs" && "$rel" == *.avif ]]; then
    echo "$rel"
  fi
}

if [[ $# -lt 1 ]]; then
  usage >&2
  exit 1
fi

if [[ "${1:-}" == "-h" || "${1:-}" == "--help" ]]; then
  usage
  exit 0
fi

declare -a TARGETS=()
for raw in "$@"; do
  rel="$(normalize_path "$raw")"
  if [[ -z "$rel" ]]; then
    echo "Skipping path outside repository: $raw" >&2
    continue
  fi

  while IFS= read -r file; do
    [[ -n "$file" ]] && TARGETS+=("$file")
  done < <(collect_targets "$rel")
done

if [[ ${#TARGETS[@]} -eq 0 ]]; then
  echo "No AVIF files found for the provided path(s)."
  exit 0
fi

if ! command -v avifenc >/dev/null 2>&1 || ! command -v avifdec >/dev/null 2>&1; then
  echo "Local avifenc/avifdec not found. Falling back to container workflow..."
  exec bash "$CONTAINER_SCRIPT" "${TARGETS[@]}"
fi

echo "Using local avifenc/avifdec for ${#TARGETS[@]} AVIF file(s) with minQ=$QUALITY_MIN maxQ=$QUALITY_MAX speed=$SPEED"

for rel in "${TARGETS[@]}"; do
  in="$ROOT_DIR/$rel"
  tmp_png="${in}.tmp.png"
  tmp_avif="${in}.tmp.avif"

  old_size=$(stat -c%s "$in")
  avifdec "$in" "$tmp_png" >/dev/null
  avifenc \
    --min "$QUALITY_MIN" \
    --max "$QUALITY_MAX" \
    --speed "$SPEED" \
    "$tmp_png" "$tmp_avif" >/dev/null

  new_size=$(stat -c%s "$tmp_avif")
  if [[ "$new_size" -lt "$old_size" ]]; then
    mv "$tmp_avif" "$in"
    echo "optimized: $rel ($old_size -> $new_size)"
  else
    rm -f "$tmp_avif"
    echo "kept: $rel ($old_size -> $new_size)"
  fi

  rm -f "$tmp_png"
done
