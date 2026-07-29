# Open Risks and Decision Requests - Packet 0002

## Open risks

1. Closeout completeness risk

- Risk: Missing or delayed closeout artifacts can hold release windows.
- Proposed mitigation: Set mandatory checklist due-date milestones by project phase.

2. Financial reconciliation lag risk

- Risk: SAGE100 reconciliation delays may distort monthly control visibility.
- Proposed mitigation: Set monthly reconciliation cutoff and exception-aging threshold.

3. Continuity-response inconsistency risk

- Risk: Incident severity interpretation may vary across operators.
- Proposed mitigation: Attach one severity rubric and escalation timer table in v0.2.

## Decision requests

1. Decision: Closeout deficiency aging threshold

- Options:
  - 7-day escalation threshold
  - 10-day escalation threshold
- Recommended: 7-day threshold for v0.1 discipline.

2. Decision: SAGE100 month-close exception carry policy

- Options:
  - Allow carry with XO documented waiver
  - Require full closure before month-close
- Recommended: allow carry only with XO waiver and CO visibility for material items.

3. Decision: Continuity incident critical-severity timer

- Options:
  - 30-minute command notification target
  - 60-minute command notification target
- Recommended: 30-minute target for critical incidents.
