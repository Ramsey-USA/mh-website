# Review Automation Runbook

**Category:** Marketing - Operations
**Last Updated:** July 23, 2026

This runbook covers the command-line workflow for review outreach generation, weekly reward audits, and dashboard-ready exports.

## Prerequisites

1. Use the canonical templates in [templates](./templates/).
2. Keep review language compliant with [Review Recognition Program](./review-recognition-program.md).

## 1) Generate Outreach Files from Closeout Data

Input template:

- [review-closeout-input-template.csv](./templates/review-closeout-input-template.csv)

Validation command (recommended before outreach generation):

```bash
pnpm run reviews:closeout:validate -- --input docs/marketing/templates/review-closeout-input-template.csv
```

Command:

```bash
pnpm run reviews:outreach:generate -- --input docs/marketing/templates/review-closeout-input-template.csv --output-dir tmp/review-outreach
```

Output files:

- tmp/review-outreach/review-outreach-email.csv
- tmp/review-outreach/review-outreach-sms.csv

## 2) Build Weekly Recognition Summary

Input tracker:

- [review-recognition-tracker-template.csv](./templates/review-recognition-tracker-template.csv)

Validation command (recommended before manual runs):

```bash
pnpm run reviews:tracker:validate -- --input docs/marketing/templates/review-recognition-tracker-template.csv
```

Command:

```bash
pnpm run reviews:summary:weekly -- --input docs/marketing/templates/review-recognition-tracker-template.csv --stale-days 7 --output tmp/review-outreach/review-weekly-summary.md
```

Summary includes:

- Pending gift cards above stale threshold.
- Potential duplicate reviewer/project keys.
- Estimated pending payout.

## 3) Export Dashboard-Friendly Import CSV

Command:

```bash
pnpm run reviews:dashboard:export -- --input docs/marketing/templates/review-recognition-tracker-template.csv --output tmp/review-outreach/review-recognition-dashboard-import.csv
```

Schema reference:

- [review-recognition-dashboard-import-schema.json](./templates/review-recognition-dashboard-import-schema.json)

## 4) Generate Monthly Leaderboard

Command:

```bash
pnpm run reviews:leaderboard:monthly -- --input docs/marketing/templates/review-recognition-tracker-template.csv --month 2026-07 --output tmp/review-outreach/review-monthly-leaderboard.md
```

## 5) Export Monthly KPI JSON

Command:

```bash
pnpm run reviews:kpi:monthly -- --input docs/marketing/templates/review-recognition-tracker-template.csv --month 2026-07 --output tmp/review-outreach/review-monthly-kpi.json
```

## 6) Run Weekly Ops in One Command

This command validates the tracker, generates the weekly summary, exports dashboard CSV, and writes the monthly leaderboard.

```bash
pnpm run reviews:weekly:run -- --closeout-input docs/marketing/templates/review-closeout-input-template.csv --input docs/marketing/templates/review-recognition-tracker-template.csv --stale-days 7 --output-dir tmp/review-outreach --month 2026-07
```

## Onboarding Samples

Use sample files for training or dry-run practice:

- [review-closeout-sample.csv](./templates/samples/review-closeout-sample.csv)
- [review-recognition-tracker-sample.csv](./templates/samples/review-recognition-tracker-sample.csv)

Expected generated outputs are provided in:

- [samples/expected-output](./templates/samples/expected-output/)

## CI Regression Check

Use this command to run the full sample workflow and compare generated artifacts with expected outputs:

```bash
pnpm run reviews:samples:check
```

## Operating Cadence

1. PM updates closeout input weekly.
2. Marketing generates outreach files and sends the sequence.
3. Admin updates tracker as reviews are verified and rewards fulfilled.
4. Leadership reviews weekly summary and payout queue.
5. Ops exports dashboard import file for reporting.

---

**MH Construction** - Built on Quality, Backed by Trust.
