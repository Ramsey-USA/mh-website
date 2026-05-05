#!/bin/bash

# Batch update documentation dates to December 14, 2025
# This script finds all .md files with old dates and updates them

cd /workspaces/mh-website/docs

echo "Starting batch date update..."

# Update November 2025 dates
find . -name "*.md" -type f -exec sed -i 's/Last Updated.*: November [0-9]*, 2025/Last Updated: December 14, 2025/g' {} \;
find . -name "*.md" -type f -exec sed -i 's/\*\*Last Updated\*\*: November [0-9]*, 2025/**Last Updated**: December 14, 2025/g' {} \;
find . -name "*.md" -type f -exec sed -i 's/\*\*Last Updated:\*\* November [0-9]*, 2025/**Last Updated:** December 14, 2025/g' {} \;

# Update October 2025 dates
find . -name "*.md" -type f -exec sed -i 's/Last Updated.*: October [0-9]*, 2025/Last Updated: December 14, 2025/g' {} \;
find . -name "*.md" -type f -exec sed -i 's/\*\*Last Updated\*\*: October [0-9]*, 2025/**Last Updated**: December 14, 2025/g' {} \;
find . -name "*.md" -type f -exec sed -i 's/\*\*Last Updated:\*\* October [0-9]*, 2025/**Last Updated:** December 14, 2025/g' {} \;

# Update version-specific dates
find . -name "*.md" -type f -exec sed -i 's/\*\*Created:\*\* November [0-9]*, 2025/**Created:** November 2025/g' {} \;
find . -name "*.md" -type f -exec sed -i 's/\*\*Started:\*\* November [0-9]*, 2025/**Started:** November 2025/g' {} \;

echo "Date updates complete!"

# Show files that were updated
echo "\nFiles updated:"
grep -r "Last Updated: December 14, 2025" --include="*.md" -l | wc -l
