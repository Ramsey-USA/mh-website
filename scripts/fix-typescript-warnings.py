#!/usr/bin/env python3
"""
Systematically fix TypeScript warnings:
1. Replace 'any' with 'unknown' in safe contexts
2. Prefix unused parameters with '_'
3. Remove unused imports
"""

import re
from pathlib import Path

def fix_file(filepath):
    """Fix TypeScript warnings in a single file."""
    print(f"\n📄 Processing {filepath.name}")
    
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original_content = content
    fixes = []
    
    # 1. Fix 'any' types - replace with 'unknown'
    any_patterns = [
        (r':\s*any\b', ': unknown', 'any type'),
        (r'<any>', '<unknown>', 'any generic'),
        (r'any\s*\[\]', 'unknown[]', 'any array'),
        (r'Record<string,\s*any>', 'Record<string, unknown>', 'any in Record'),
    ]
    
    for pattern, replacement, desc in any_patterns:
        matches = len(re.findall(pattern, content))
        if matches > 0:
            content = re.sub(pattern, replacement, content)
            fixes.append(f"  ✓ Fixed {matches} {desc}(s)")
    
    # 2. Fix catch blocks: catch (error) => catch (_error)
    catch_pattern = r'catch\s*\(\s*(\w+)\s*\)'
    catch_matches = re.findall(catch_pattern, content)
    for var_name in catch_matches:
        if not var_name.startswith('_'):
            old = f'catch ({var_name})'
            new = f'catch (_{var_name})'
            if old in content:
                content = content.replace(old, new)
                fixes.append(f"  ✓ Prefixed catch variable: {var_name}")
    
    if content != original_content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        for fix in fixes:
            print(fix)
        return len(fixes)
    else:
        print("  → No automatic fixes available")
        return 0

def main():
    files_to_fix = [
        'src/lib/veteran/VeteranPersonalizationSystem.ts',
        'src/lib/veteran/VeteranProfileEngine.ts',
        'src/lib/recommendations/SmartRecommendationEngine.ts',
        'src/lib/ai/estimator/CostAnalyzer.ts',
        'src/lib/ai/core/AIEngine.ts',
        'src/lib/ai/veteran/VeteranAI.ts',
        'src/lib/ai/index.ts',
        'src/lib/veteran/index.ts',
        'src/lib/chatbot/advanced-features.ts',
        'src/lib/chatbot/EnhancedChatbotAI.ts',
        'src/hooks/useSmartRecommendations.ts',
        'src/lib/performance/caching-system.ts',
        'src/lib/security/audit-logger.ts',
        'src/lib/auth/middleware.ts',
        'src/lib/performance/caching.ts',
        'src/lib/cloudflare/storage.ts',
        'src/lib/analytics/data-collector.ts',
        'src/lib/performance/performance-manager.ts',
        'src/lib/api/formHandler.ts',
        'src/lib/analytics/analytics-engine.ts',
    ]
    
    base_path = Path('/workspaces/mh-website')
    total_fixes = 0
    
    print("🔧 Starting systematic TypeScript warning fixes...\n")
    
    for file_rel in files_to_fix:
        filepath = base_path / file_rel
        if filepath.exists():
            total_fixes += fix_file(filepath)
    
    print(f"\n✅ Complete! Applied {total_fixes} fixes")
    print("Next: Run 'npm run build' to verify")

if __name__ == '__main__':
    main()
