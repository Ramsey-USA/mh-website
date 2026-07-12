import os
import re
import json
import subprocess

base_path = "apps/website/src/app"
exclude_dirs = ["api", "(internal)"]
evidence_patterns = [
    r"useLocale", r"isEs", r"locale", r"useTranslations", r"next-intl", 
    r"messages/en\.json", r"messages/es\.json"
]

def check_file_for_evidence(filepath):
    if not os.path.exists(filepath):
        return []
    with open(filepath, 'r') as f:
        content = f.read()
    found = []
    for pattern in evidence_patterns:
        if re.search(pattern, content):
            found.append(pattern)
    # Check for site-specific indirect evidence in comments
    if re.search(r"uses useLocale", content, re.IGNORECASE):
        found.append("comment:uses useLocale")
    return found

def get_routes():
    routes = []
    for root, dirs, files in os.walk(base_path):
        # Filter excludes
        parts = os.path.relpath(root, base_path).split(os.sep)
        if any(ex in parts for ex in exclude_dirs):
            continue
            
        if "page.tsx" in files:
            rel_path = os.path.relpath(root, base_path)
            route = "/" if rel_path == "." else "/" + rel_path.replace(os.sep, "/")
            page_path = os.path.join(root, "page.tsx")
            
            route_type = "DYNAMIC" if "[" in route else "STATIC"
            
            # 3) Direct Evidence
            file_evidence = check_file_for_evidence(page_path)
            
            # 4) Indirect Evidence
            indirect_evidence = []
            with open(page_path, 'r') as f:
                content = f.read()
                # Check for *PageClient imports
                client_match = re.search(r'import\s+.*PageClient\s+from\s+[\'"]\./(.*)[\'"]', content)
                if client_match:
                    client_file = client_match.group(1)
                    if not client_file.endswith(".tsx"): client_file += ".tsx"
                    client_path = os.path.join(root, client_file)
                    indirect_evidence.extend(check_file_for_evidence(client_path))
            
            # Re-check comment evidence as indirect if found in page.tsx but it was in evidence_patterns
            if "comment:uses useLocale" in file_evidence:
                file_evidence.remove("comment:uses useLocale")
                indirect_evidence.append("comment:uses useLocale")

            status = "PASS" if (file_evidence or indirect_evidence) else "NEEDS_REVIEW"
            
            routes.append({
                "route": route,
                "routeType": route_type,
                "fileEvidence": ",".join(file_evidence),
                "indirectEvidence": ",".join(indirect_evidence),
                "status": status
            })
    return routes

print(f"route | routeType | fileEvidence | indirectEvidence | status")
routes = get_routes()
for r in routes:
    print(f"{r['route']} | {r['routeType']} | {r['fileEvidence']} | {r['indirectEvidence']} | {r['status']}")

print("\n--- Summary ---")
pass_count = sum(1 for r in routes if r['status'] == "PASS")
needs_review_count = sum(1 for r in routes if r['status'] == "NEEDS_REVIEW")
print(f"PASS: {pass_count}")
print(f"NEEDS_REVIEW: {needs_review_count}")
if needs_review_count > 0:
    print("Routes needing review:")
    for r in routes:
        if r['status'] == "NEEDS_REVIEW":
            print(f"  - {r['route']}")

# 5) Global Check
print("\n--- Global Wiring ---")
nav_path = "apps/website/src/components/Navigation.tsx"
if not os.path.exists(nav_path):
    # Try alternate or search
    nav_path = subprocess.check_output("find apps/website/src -name Navigation.tsx", shell=True).decode().strip()

if nav_path:
    with open(nav_path, 'r') as f:
        content = f.read()
        print(f"Navigation uses LanguageToggle: {'LanguageToggle' in content}")

locale_lib = "apps/website/src/lib/i18n/locale.ts"
if os.path.exists(locale_lib):
    with open(locale_lib, 'r') as f:
        content = f.read()
        cookie_name = re.search(r"COOKIE_NAME\s*=\s*['\"](.*?)['\"]", content)
        locales = re.findall(r"['\"]([a-z]{2})['\"]", content)
        print(f"Locale cookie: {cookie_name.group(1) if cookie_name else 'Not found'}")
        print(f"Supported locales: {list(set(locales)) if locales else 'Not found'}")

# 6) Parity Check
print("\n--- Translation Parity (scripts/check-translations.js) ---")
try:
    result = subprocess.run(["node", "scripts/check-translations.js"], capture_output=True, text=True, cwd="apps/website")
    print(result.stdout.strip())
except Exception as e:
    print(f"Error running parity check: {e}")
