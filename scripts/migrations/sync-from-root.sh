#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(git rev-parse --show-toplevel)"
SOURCE_DIR="$ROOT_DIR/migrations"
TARGETS=()

MODE="sync"
if [[ "${1:-}" == "--check" ]]; then
  MODE="check"
fi

if [[ ! -d "$SOURCE_DIR" ]]; then
  echo "Missing source migrations directory: $SOURCE_DIR" >&2
  exit 1
fi

for target in "${TARGETS[@]}"; do
  if [[ ! -d "$target" ]]; then
    echo "Missing target migrations directory: $target" >&2
    exit 1
  fi
done

if [[ ${#TARGETS[@]} -eq 0 ]]; then
  if [[ "$MODE" == "check" ]]; then
    echo "Root migrations are canonical; no migration mirrors configured."
  else
    echo "Root migrations are canonical; nothing to synchronize."
  fi
  exit 0
fi

sync_target() {
  local target_dir="$1"

  if [[ "$MODE" == "check" ]]; then
    # Compare filename sets first for quick, clear drift diagnostics.
    if ! diff -u <(ls -1 "$SOURCE_DIR" | sort) <(ls -1 "$target_dir" | sort) >/tmp/migration-diff.$$ 2>&1; then
      echo "Migration filename drift detected for: $target_dir" >&2
      cat /tmp/migration-diff.$$ >&2
      rm -f /tmp/migration-diff.$$
      return 1
    fi
    rm -f /tmp/migration-diff.$$

    # Compare file contents for names present in source.
    while IFS= read -r migration_file; do
      if ! cmp -s "$SOURCE_DIR/$migration_file" "$target_dir/$migration_file"; then
        echo "Migration content drift detected: $migration_file in $target_dir" >&2
        return 1
      fi
    done < <(ls -1 "$SOURCE_DIR" | sort)
    return 0
  fi

  rsync -a --delete --include='*.sql' --exclude='*' "$SOURCE_DIR/" "$target_dir/"
}

for target in "${TARGETS[@]}"; do
  sync_target "$target"
done

if [[ "$MODE" == "check" ]]; then
  echo "Migration mirror is in sync with root migrations."
else
  echo "Synchronized migration mirror from root migrations."
fi
