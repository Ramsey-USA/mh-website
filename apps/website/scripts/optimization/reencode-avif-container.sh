#!/usr/bin/env bash

set -euo pipefail

if ! command -v docker >/dev/null 2>&1; then
  echo "Docker is required to run AVIF re-encoding in a container." >&2
  exit 1
fi

ROOT_DIR="$(git rev-parse --show-toplevel)"
IMAGE_TAG="mhc-avif-reencode:local"
DOCKERFILE_PATH="$ROOT_DIR/apps/website/scripts/optimization/avif-reencode.Dockerfile"

QUALITY_MIN="${AVIF_MIN_Q:-18}"
QUALITY_MAX="${AVIF_MAX_Q:-32}"
SPEED="${AVIF_SPEED:-6}"

if [[ $# -lt 1 ]]; then
  cat >&2 <<'USAGE'
Usage:
  bash apps/website/scripts/optimization/reencode-avif-container.sh <file-or-dir> [more paths...]

Examples:
  bash apps/website/scripts/optimization/reencode-avif-container.sh apps/website/public/images/vendors
  bash apps/website/scripts/optimization/reencode-avif-container.sh apps/website/public/images/vendors/frontier_fencing_logo.avif

Optional tuning via environment variables:
  AVIF_MIN_Q (default: 18)
  AVIF_MAX_Q (default: 32)
  AVIF_SPEED (default: 6)
USAGE
  exit 1
fi

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

  if [[ -f "$abs" ]]; then
    if [[ "$rel" == *.avif ]]; then
      echo "$rel"
    fi
    return
  fi
}

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

echo "Building AVIF encoder container image..."
docker build -f "$DOCKERFILE_PATH" -t "$IMAGE_TAG" "$ROOT_DIR/apps/website/scripts/optimization" >/dev/null

echo "Re-encoding ${#TARGETS[@]} AVIF file(s) with minQ=$QUALITY_MIN maxQ=$QUALITY_MAX speed=$SPEED"

docker run --rm \
  -u "$(id -u):$(id -g)" \
  -v "$ROOT_DIR:/work" \
  -e QUALITY_MIN="$QUALITY_MIN" \
  -e QUALITY_MAX="$QUALITY_MAX" \
  -e SPEED="$SPEED" \
  "$IMAGE_TAG" \
  '
    set -euo pipefail
    for rel in "$@"; do
      in="/work/$rel"
      tmp_png="${in}.tmp.png"
      tmp_avif="${in}.tmp.avif"

      if [[ ! -f "$in" ]]; then
        echo "missing: $rel"
        continue
      fi

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
  ' _ "${TARGETS[@]}"
