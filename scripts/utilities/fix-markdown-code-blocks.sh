#!/bin/bash

# Fix markdown code blocks missing language tags
# This script adds 'text' as the default language for code blocks without a language specified

echo "🔧 Fixing markdown code blocks..."

# Find all markdown files and fix code blocks
find . -name "*.md" \
  -not -path "*/node_modules/*" \
  -not -path "*/.next/*" \
  -not -path "*/firebase/functions/node_modules/*" \
  -type f | while read -r file; do
  
  # Check if file has triple backticks without language
  if grep -q '^```$' "$file"; then
    echo "  Fixing: $file"
    
    # Replace ``` at start of line with ```text
    # Use perl for better multiline handling
    perl -i -pe 's/^```$/```text/g' "$file"
  fi
done

echo "✅ Code block fixes complete!"
echo ""
echo "Running markdown linter to verify..."
npm run lint:markdown
