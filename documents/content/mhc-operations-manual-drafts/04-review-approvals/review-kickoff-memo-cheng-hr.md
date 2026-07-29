# Review Kickoff Memo - CHENG and HR

Status: Active
Purpose: Start the first coordinated review cycle and close the six blocking decisions with minimal rework.

## 1. Review objective

Complete CHENG and HR first-pass reviews for Packet 0001 and Packet 0002 and return actionable comments that can be integrated into v0.2 for chapters 04-08.

## 2. Required review sequence

1. CHENG review Packet 0001 and Packet 0002.
2. HR review Packet 0001 and Packet 0002.
3. XO consolidates decision outcomes.
4. CO validates final decision set when escalation is required.

## 3. Decision closure order (required)

Resolve in this order to reduce downstream rewrites:

1. D-0001: Procore setup SLA target (24h vs 48h)
2. D-0003: Weekly exception summary cadence (always vs only when open)
3. D-0002: Change-order lane SLA targets
4. D-0101: Closeout deficiency escalation threshold (7-day vs 10-day)
5. D-0102: SAGE100 exception carry policy (waiver vs hard close)
6. D-0103: Critical continuity-incident notification timer (30 min vs 60 min)

## 4. Reviewer file checklist

Packet 0001:

- packet-0001-procore-change-controls/08-cheng-review-sheet.md
- packet-0001-procore-change-controls/09-hr-review-sheet.md
- packet-0001-procore-change-controls/06-review-outcome-log.md
- packet-0001-procore-change-controls/07-routing-status.md

Packet 0002:

- packet-0002-closeout-sage100-server/08-cheng-review-sheet.md
- packet-0002-closeout-sage100-server/09-hr-review-sheet.md
- packet-0002-closeout-sage100-server/06-review-outcome-log.md
- packet-0002-closeout-sage100-server/07-routing-status.md

## 5. Return format requirements

- Every change request must include chapter, section, severity, and owner.
- Every decision item must include a single selected option and rationale.
- Routing status must be updated with date sent and date returned.
- Outcome logs must move from Pending to one final outcome per reviewer.

## 6. Output expected for v0.2 integration

- Fully populated CHENG and HR review sheets for both packets.
- All six decisions marked resolved.
- Outcome logs updated for both packets.
- Routing status updated through at least HR-complete state.
