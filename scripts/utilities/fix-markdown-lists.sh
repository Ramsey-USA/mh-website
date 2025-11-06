#!/bin/bash

# Fix markdown ordered list numbering issues
# MD029 errors occur when lists don't start at 1 or skip numbers

echo "🔧 Fixing markdown ordered lists..."

# Fix lists that don't start at 1
find . -name "*.md" \
  -not -path "*/node_modules/*" \
  -not -path "*/.next/*" \
  -not -path "*/.git/*" \
  -type f | while read -r file; do
  
  # Use sed to renumber lists - more complex, so doing manually per file
  # This is better done manually for each file
  echo "  Checking: $file"
done

echo ""
echo "Note: Ordered list fixes need manual review for context."
echo "Running linter to show remaining issues..."
npm run lint:markdown
