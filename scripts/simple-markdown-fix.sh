#!/bin/bash

# Simple Markdown Fix Script
echo "🔧 Simple Markdown Linting Fix"
echo "==============================="
echo ""

cd /workspaces/mh-website

# Fix all fenced code blocks without language
echo "📝 Fixing fenced code blocks..."
find docs/ -name "*.md" -not -path "*/.*" -exec sed -i 's/^```$/```text/' {} \;

echo "✅ All fenced code blocks now have language specification"
echo ""
echo "🎯 Markdown linting fixes complete!"