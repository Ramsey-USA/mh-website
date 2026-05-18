# Performance Triage Template

Use this template for release-level performance triage with both Google Analytics and Lighthouse.

## 1) Release Context

- Release/PR:
- Date:
- Owner:
- Environment (prod/staging):
- Notes:

## 2) Priority Pages

List only pages that matter for lead flow, trust, and critical navigation.

| Priority | Route     | Business Role     | Target Audience        |
| -------- | --------- | ----------------- | ---------------------- |
| P0       | /         | Entry and trust   | All visitors           |
| P0       | /services | Service discovery | Qualified leads        |
| P0       | /contact  | Conversion        | Ready-to-contact users |
| P1       | /projects | Proof and trust   | Mid-funnel users       |
| P1       | /careers  | Recruiting        | Applicants             |

## 3) Baseline Snapshot (Before Changes)

Record GA and Lighthouse for the same pages and timeframe.

| Route     | GA Users | GA Conversions | GA Conversion Rate | Lighthouse Perf | LCP (s) | CLS | TBT (ms) |
| --------- | -------- | -------------- | ------------------ | --------------- | ------- | --- | -------- |
| /         |          |                |                    |                 |         |     |          |
| /services |          |                |                    |                 |         |     |          |
| /contact  |          |                |                    |                 |         |     |          |
| /projects |          |                |                    |                 |         |     |          |
| /careers  |          |                |                    |                 |         |     |          |

## 4) Changes Shipped

Describe only measurable changes.

| Change | Route(s) | Expected Effect | Risk |
| ------ | -------- | --------------- | ---- |
|        |          |                 |      |

## 5) Validation Snapshot (After Changes)

Use same collection method as baseline.

| Route     | GA Users | GA Conversions | GA Conversion Rate | Lighthouse Perf | LCP (s) | CLS | TBT (ms) |
| --------- | -------- | -------------- | ------------------ | --------------- | ------- | --- | -------- |
| /         |          |                |                    |                 |         |     |          |
| /services |          |                |                    |                 |         |     |          |
| /contact  |          |                |                    |                 |         |     |          |
| /projects |          |                |                    |                 |         |     |          |
| /careers  |          |                |                    |                 |         |     |          |

## 6) Decision Matrix

Use this matrix to prioritize follow-up work.

- High GA traffic + low Lighthouse score: urgent technical fix.
- High GA conversion route + low Lighthouse score: protect conversion path first.
- Low GA traffic + low Lighthouse score: defer unless strategic.
- Good Lighthouse + falling GA conversion: investigate message, UX clarity, or intent mismatch.

## 7) Triage Outcomes

### Must Fix Next

1.
2.
3.

### Monitor

1.
2.

### Defer

1.
2.

## 8) Acceptance Checklist

- [ ] P0 routes measured in GA and Lighthouse before/after.
- [ ] No regression on /contact conversion path.
- [ ] Lighthouse retest run under comparable conditions.
- [ ] Change notes added for next release handoff.
- [ ] Stakeholders notified with summary and next actions.

## 9) Summary for Stakeholders

### What Improved

-

### What Regressed

-

### Next Actions

1.
2.
3.
