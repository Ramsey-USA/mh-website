# Appendix E - KPI Dictionary (Draft)

Status: Draft v0.1
Purpose: Standardize KPI definitions, ownership, evidence sources, and review cadence.

## 1. Safety and Compliance KPIs

| KPI                             | Definition                                 | Owner    | Source                     | Cadence          |
| ------------------------------- | ------------------------------------------ | -------- | -------------------------- | ---------------- |
| Incident Count                  | Number of recordable incidents in period   | CHENG    | Safety logs                | Weekly/Quarterly |
| Near-Miss Count                 | Number of documented near-miss events      | CHENG    | Safety logs                | Weekly/Quarterly |
| Corrective Action Closure Rate  | Closed actions divided by assigned actions | CHENG/XO | Corrective action register | Weekly/Quarterly |
| Time-to-Close Critical Findings | Average days to close critical findings    | CHENG    | Audit reports              | Quarterly        |

## 2. Schedule and Execution KPIs

| KPI                   | Definition                                        | Owner           | Source                    | Cadence          |
| --------------------- | ------------------------------------------------- | --------------- | ------------------------- | ---------------- |
| Milestone Reliability | Planned milestones met on planned date percentage | PM              | Procore schedule reports  | Weekly/Quarterly |
| RFI Aging             | Count of open RFIs by aging bucket                | PE/PM           | Procore RFI log           | Weekly           |
| Submittal Aging       | Count of open submittals by aging bucket          | PE/PM           | Procore submittal log     | Weekly           |
| Punchlist Aging       | Open punchlist items by aging bucket              | Master Chief/PM | Procore punchlist records | Weekly           |

## 3. Cost and Financial Control KPIs

| KPI                         | Definition                                               | Owner   | Source                        | Cadence           |
| --------------------------- | -------------------------------------------------------- | ------- | ----------------------------- | ----------------- |
| Change-Order Cycle Time     | Average days from intake to approval                     | PM/XO   | Procore change logs           | Weekly/Quarterly  |
| Threshold Compliance Rate   | Percentage of changes approved in correct threshold lane | XO      | Approval matrix evidence      | Quarterly         |
| Estimate-to-Actual Variance | Difference between estimate and realized cost            | CPCO/PM | SAGE100 + estimate package    | Monthly/Quarterly |
| Posting Accuracy            | Correct SAGE100 postings without rework                  | XO      | SAGE100 reconciliation packet | Monthly/Quarterly |

## 4. Closeout and Turnover KPIs

| KPI                            | Definition                                                     | Owner | Source                         | Cadence          |
| ------------------------------ | -------------------------------------------------------------- | ----- | ------------------------------ | ---------------- |
| Closeout Completeness Rate     | Percentage of projects with complete required closeout package | PM/PE | Closeout checklist and records | Weekly/Quarterly |
| Pending Digital Sign-Off Count | Number of projects pending Procore digital sign-off            | PM    | Procore closeout log           | Weekly           |
| Closeout Cycle Time            | Days from substantial completion to package release            | PM    | Closeout transmittal history   | Quarterly        |

## 5. Continuity and Systems KPIs

| KPI                    | Definition                                      | Owner | Source               | Cadence           |
| ---------------------- | ----------------------------------------------- | ----- | -------------------- | ----------------- |
| Backup Success Rate    | Successful backups divided by scheduled backups | IT    | Backup logs          | Weekly/Monthly    |
| Restore-Test Pass Rate | Passed restore tests divided by scheduled tests | IT    | Restore test reports | Monthly/Quarterly |
| Critical Incident MTTR | Mean time to resolve high-severity incidents    | IT/XO | Incident records     | Monthly/Quarterly |

## 6. Data Quality Rules

- KPI submissions must reference source evidence.
- Missing data points require owner note and correction deadline.
- KPI definition changes require XO approval.

## 7. Escalation Rules

- Persistent KPI degradation across two cycles triggers command review.
- CHENG and CPCO retain direct-to-CO exception escalation rights within their domain exposure areas.
