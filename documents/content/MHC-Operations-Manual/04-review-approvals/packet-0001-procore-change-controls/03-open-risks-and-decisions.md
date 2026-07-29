# Open Risks and Decision Requests - Packet 0001

## Open risks

1. Role-capacity risk

- Risk: PM and PE review/approval load may bottleneck if project volume increases.
- Proposed mitigation: Add approval SLA targets in v0.2.

2. Exception-consistency risk

- Risk: Elevated-access and threshold exceptions may drift without a single exception log format.
- Proposed mitigation: Add a standard exception register template in appendices.

3. Financial-posting timing risk

- Risk: SAGE100 synchronization lag may affect weekly dashboard reliability.
- Proposed mitigation: Set weekly posting cutoff and reconcile schedule by policy.

## Decision requests

1. Decision: Procore setup SLA target

- Options:
  - 24-hour setup completion target
  - 48-hour setup completion target
- Recommended: 48-hour initial target, tighten after 2 cycles.

2. Decision: Change-order approval SLA by threshold lane

- Options:
  - PM lane: 2 business days, XO lane: 3 business days, CO lane: 5 business days
  - PM lane: 1 business day, XO lane: 2 business days, CO lane: 3 business days
- Recommended: first option for v0.1 stability.

3. Decision: Mandatory weekly exception summary

- Options:
  - Required in every Monday meeting
  - Required only when open exceptions exist
- Recommended: required only when open exceptions exist.
