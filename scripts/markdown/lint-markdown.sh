#!/bin/bash

# Markdown Linting Script
# Run this to check all markdown files for errors

echo "🔍 Checking markdown files for linting errors..."

# Run markdownlint
if npx markdownlint-cli2 --config .markdownlint-cli2.jsonc "**/*.md"; then
    echo "✅ All markdown files pass linting!"
else
    echo "❌ Markdown linting errors found. Fix these before committing."
    exit 1
fi