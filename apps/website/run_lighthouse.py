import subprocess
import os
import json
import time

CHROME_PATH = "/usr/bin/chromium"
os.environ["CHROME_PATH"] = CHROME_PATH
BASE_URL = "http://localhost:3000"
OUTPUT_DIR = "lighthouse-results/retest-2026-05-17-all"
os.makedirs(OUTPUT_DIR, exist_ok=True)

with open("concrete_routes.txt", "r") as f:
    routes = [line.strip() for line in f if line.strip()]

results = []

for route in routes:
    sanitized_route = route.replace("/", "_").strip("_") or "home"
    output_file = os.path.join(OUTPUT_DIR, f"{sanitized_route}.json")
    url = f"{BASE_URL}{route}"
    
    print(f"Auditing {url}...")
    
    cmd = [
        "npx", "lighthouse", url,
        "--output=json",
        f"--output-path={output_file}",
        "--chrome-flags=--headless --no-sandbox --disable-gpu",
        "--only-categories=performance,accessibility,best-practices,seo",
    ]
    
    try:
        subprocess.run(cmd, check=True, capture_output=True)
        with open(output_file, "r") as f:
            data = json.load(f)
            
        perf = data["categories"]["performance"]["score"] * 100
        a11y = data["categories"]["accessibility"]["score"] * 100
        bp = data["categories"]["best-practices"]["score"] * 100
        seo = data["categories"]["seo"]["score"] * 100
        
        lcp = data["audits"]["largest-contentful-paint"]["displayValue"]
        cls = data["audits"]["cumulative-layout-shift"]["displayValue"]
        tbt = data["audits"]["total-blocking-time"]["displayValue"]
        
        results.append({
            "route": route,
            "Perf": perf,
            "A11y": a11y,
            "BP": bp,
            "SEO": seo,
            "LCP": lcp,
            "CLS": cls,
            "TBT": tbt,
            "status": "PASS"
        })
    except Exception as e:
        print(f"Error auditing {route}: {e}")
        results.append({
            "route": route,
            "Perf": "-", "A11y": "-", "BP": "-", "SEO": "-", 
            "LCP": "-", "CLS": "-", "TBT": "-",
            "status": f"FAIL: {str(e)[:50]}"
        })

# Print Table
print(f"\n{'Route':<40} | {'Perf':<4} | {'A11y':<4} | {'BP':<4} | {'SEO':<4} | {'LCP':<8} | {'CLS':<8} | {'TBT':<8} | {'Status'}")
print("-" * 110)
for r in results:
    print(f"{r['route']:<40} | {r['Perf']:<4} | {r['A11y']:<4} | {r['BP']:<4} | {r['SEO']:<4} | {r['LCP']:<8} | {r['CLS']:<8} | {r['TBT']:<8} | {r['status']}")

# Print Totals
total = len(results)
failed = [r['route'] for r in results if "FAIL" in r['status']]
succeeded = total - len(failed)

print(f"\nTotal: {total}, Succeeded: {succeeded}, Failed: {len(failed)}")
if failed:
    print(f"Failed routes: {', '.join(failed)}")

