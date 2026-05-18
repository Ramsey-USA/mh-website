import json
import os
import glob

def get_lighthouse_data(filepath):
    try:
        with open(filepath, 'r') as f:
            data = json.load(f)
            
        runtime_error = data.get('runtimeError')
        if runtime_error:
            return {'status': f"failed: {runtime_error.get('code', 'Error')}"}

        def get_score(category):
            cat = data.get('categories', {}).get(category, {})
            score = cat.get('score')
            return int(score * 100) if score is not None else 'N/A'

        def get_audit_val(audit_id):
            audit = data.get('audits', {}).get(audit_id, {})
            return audit.get('displayValue', audit.get('numericValue', 'N/A'))

        return {
            'Perf': get_score('performance'),
            'A11y': get_score('accessibility'),
            'BP': get_score('best-practices'),
            'SEO': get_score('seo'),
            'LCP': get_audit_val('largest-contentful-paint'),
            'CLS': get_audit_val('cumulative-layout-shift'),
            'TBT': get_audit_val('total-blocking-time'),
            'status': 'ok'
        }
    except Exception as e:
        return {'status': f'error: {str(e)}'}

def main():
    routes_file = 'concrete_routes.txt'
    reports_dir = 'lighthouse-results/retest-2026-05-17-all'
    
    if not os.path.exists(routes_file):
        print(f"Error: {routes_file} not found.")
        return

    with open(routes_file, 'r') as f:
        routes = [line.strip() for line in f if line.strip()]

    header = f"{'Route':<50} | {'Perf':<4} | {'A11y':<4} | {'BP':<4} | {'SEO':<4} | {'LCP':<10} | {'CLS':<10} | {'TBT':<10} | {'Status'}"
    print(header)
    print("-" * len(header))

    attempted = len(routes)
    succeeded = 0
    failed_summary = []

    report_files = glob.glob(os.path.join(reports_dir, '*.json'))
    report_map = {os.path.splitext(os.path.basename(f))[0]: f for f in report_files}

    for route in routes:
        filename_key = route.strip('/').replace('/', '_')
        if filename_key == '': filename_key = 'home'
        
        if filename_key in report_map:
            data = get_lighthouse_data(report_map[filename_key])
            if data['status'] == 'ok':
                succeeded += 1
                print(f"{route:<50} | {data['Perf']:<4} | {data['A11y']:<4} | {data['BP']:<4} | {data['SEO']:<4} | {str(data['LCP'])[:10]:<10} | {str(data['CLS'])[:10]:<10} | {str(data['TBT'])[:10]:<10} | ok")
            else:
                reason = data['status']
                failed_summary.append((route, reason))
                print(f"{route:<50} | {'-':<4} | {'-':<4} | {'-':<4} | {'-':<4} | {'-':<10} | {'-':<10} | {'-':<10} | {reason}")
        else:
            reason = 'no report generated'
            failed_summary.append((route, reason))
            print(f"{route:<50} | {'-':<4} | {'-':<4} | {'-':<4} | {'-':<4} | {'-':<10} | {'-':<10} | {'-':<10} | {reason}")

    print("\n" + "="*50)
    print(f"Totals:")
    print(f"Attempted: {attempted}")
    print(f"Succeeded: {succeeded}")
    print(f"Failed:    {len(failed_summary)}")
    
    if failed_summary:
        print("\nFailed Routes Detail:")
        for r, reason in failed_summary:
            print(f"- {r}: {reason}")

if __name__ == "__main__":
    main()
