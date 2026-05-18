#!/bin/bash
runs_file="/tmp/mh-home-median-runs.jsonl"
report_file="lighthouse-results/home-latest.report.json"

for i in 1 2 3; do
  success=0
  for attempt in 1 2; do
    echo "Starting Run $i, Attempt $attempt..."
    CHROME_PATH=/usr/bin/chromium npm run lighthouse:home:local
    if [ $? -eq 0 ]; then
      success=1
      break
    else
      echo "Run $i, Attempt $attempt failed. Retrying..."
    fi
  done

  if [ $success -eq 0 ]; then
    echo "Run $i failed after 2 attempts. Exiting."
    exit 1
  fi

  # Parse results
  perf=$(jq -r '.categories.performance.score' "$report_file")
  acc=$(jq -r '.categories.accessibility.score' "$report_file")
  bp=$(jq -r '.categories["best-practices"].score' "$report_file")
  seo=$(jq -r '.categories.seo.score' "$report_file")
  lcp=$(jq -r '.audits["largest-contentful-paint"].numericValue' "$report_file")
  tbt=$(jq -r '.audits["total-blocking-time"].numericValue' "$report_file")
  cls=$(jq -r '.audits["layout-shift"].numericValue' "$report_file")

  echo "{\"run\": $i, \"performance\": $perf, \"accessibility\": $acc, \"bestPractices\": $bp, \"seo\": $seo, \"lcpMs\": $lcp, \"tbtMs\": $tbt, \"cls\": $cls}" >> "$runs_file"
done

# Compute median
cat << 'PY_EOF' > compute_median.py
import json
import statistics
import datetime

runs = []
with open('/tmp/mh-home-median-runs.jsonl', 'r') as f:
    for line in f:
        runs.append(json.loads(line))

metrics = ["performance", "accessibility", "bestPractices", "seo", "lcpMs", "tbtMs", "cls"]
median_results = {}
for metric in metrics:
    median_results[metric] = statistics.median([r[metric] for r in runs])

output = {
    "generatedAt": datetime.datetime.utcnow().isoformat() + "Z",
    "runs": runs,
    "median": median_results
}

with open('lighthouse-results/home-median-latest.json', 'w') as f:
    json.dump(output, f, indent=2)

print("Runs:")
for r in runs:
    print(json.dumps(r))
print("\nMedian:")
print(json.dumps(output['median'], indent=2))
PY_EOF

python3 compute_median.py
