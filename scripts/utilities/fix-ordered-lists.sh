#!/bin/bash

# Fix markdown ordered list numbering (MD029)
# Converts sequential numbering (1, 2, 3) to all 1s (1, 1, 1) which is markdown best practice

echo "🔧 Fixing ordered list numbering..."

# Files with MD029 errors
files=(
  "cloudflare-deployment.md"
  "contributing.md"
  "docs/development/troubleshooting.md"
  "docs/operations/build-optimization/build-optimization-results.md"
  "docs/operations/build-optimization/build-optimization-success.md"
  "docs/project/consistency-master-plan.md"
  "docs/technical/build-optimization.md"
)

for file in "${files[@]}"; do
  if [ -f "$file" ]; then
    echo "  Fixing: $file"
    # Replace numbered list items (2., 3., 4., 5., etc.) with 1.
    # But preserve indentation
    sed -i 's/^\([[:space:]]*\)[2-9]\. /\11. /' "$file"
    sed -i 's/^\([[:space:]]*\)[0-9][0-9]\. /\11. /' "$file"
  fi
done

echo "✅ List numbering fixes complete!"
echo ""
echo "Running markdown linter to verify..."
npm run lint:markdown
