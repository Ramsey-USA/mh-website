import subprocess
import json
import os
import time
import urllib.request

def wait_for_server(url, timeout=300):
    start_time = time.time()
    while time.time() - start_time < timeout:
        try:
            with urllib.request.urlopen(url) as response:
                if response.getcode() == 200:
                    print(f"Server is up at {url}")
                    return True
        except Exception:
            pass
        time.sleep(5)
    return False

def run_lighthouse(route, output_dir):
    sanitized_route = route.replace("/", "ROOT" if route == "/" else "").replace("/", "_")
    if sanitized_route.startswith("_"): sanitized_route = sanitized_route[1:]
    if not sanitized_route: sanitized_route = "index"
    
    output_path = f"{output_dir}/{sanitized_route}.json"
    os.makedirs(output_dir, exist_ok=True)
    
    url = f"http://localhost:3000{route}"
    cmd = [
        "npx", "lighthouse", url,
        "--output=json",
        f"--output-path={output_path}",
        "--only-categories=performance,accessibility,best-practices,seo",
        "--chrome-flags=--headless --no-sandbox --disable-gpu",
        "--skip-audits=full-page-screenshot"
    ]
    
    env = os.environ.copy()
    env["CHROME_PATH"] = "/usr/bin/chromium"
    
    try:
        result = subprocess.run(cmd, env=env, capture_output=True, text=True)
        if result.returncode == 0:
            with open(output_path, 'r') as f:
                data = json.load(f)
                return {
                    "route": route,
                    "perf": data['categories']['performance']['score'] * 100,
                    "a11y": data['categories']['accessibility']['score'] * 100,
                    "bp": data['categories']['best-practices']['score'] * 100,
                    "seo": data['categories']['seo']['score'] * 100,
                    "lcp": data['audits']['largest-contentful-paint'].get('displayValue', 'N/A'),
                    "cls": data['audits']['cumulative-layout-shift'].get('displayValue', 'N/A'),
                    "tbt": data['audits']['total-blocking-time'].get('displayValue', 'N/A'),
                    "status": "Success"
                }
        return {"route": route, "status": f"Failed (Code {result.returncode})", "reason": result.stderr[:100]}
    except Exception as e:
        return {"route": route, "status": "Error", "reason": str(e)}

if __name__ == "__main__":
    if not wait_for_server("http://localhost:3000"):
        print("Server timed out")
        exit(1)
        
    with open("concrete_routes.txt", "r") as f:
        routes = [line.strip() for line in f if line.strip()]
    
    results = []
    output_dir = "lighthouse-results/retest-2026-05-17-all"
    
    for route in routes:
        print(f"Auditing {route}...")
        results.append(run_lighthouse(route, output_dir))
        
    print("\nLighthouse Audit Summary")
    print("========================")
    attempted = len(results)
    succeeded = len([r for r in results if r['status'] == 'Success'])
    failed = attempted - succeeded
    print(f"Attempted: {attempted}, Succeeded: {succeeded}, Failed: {failed}\n")
    
    print(f"{'Route':<40} | {'Perf':<4} | {'A11y':<4} | {'BP':<4} | {'SEO':<4} | {'LCP':<8} | {'CLS':<8} | {'TBT':<8} | {'Status'}")
    print("-" * 120)
    for r in results:
        if r['status'] == 'Success':
            print(f"{r['route']:<40} | {r['perf']:>4.0f} | {r['a11y']:>4.0f} | {r['bp']:>4.0f} | {r['seo']:>4.0f} | {r['lcp']:<8} | {r['cls']:<8} | {r['tbt']:<8} | {r['status']}")
        else:
            print(f"{r['route']:<40} | {'-':>4} | {'-':>4} | {'-':>4} | {'-':>4} | {'-':<8} | {'-':<8} | {'-':<8} | {r['status']}")

    if failed > 0:
        print("\nFailed Routes:")
        for r in results:
            if r['status'] != 'Success':
                print(f"- {r['route']}: {r.get('reason', 'Unknown error')}")
