# MH QR Document Control Governance

**Lifecycle:** Rough Draft | Governance Development  
**Control mode:** ENFORCED_FAIL_CLOSED  
**Production routes:** Not approved or deployed

## Command intent

The MH QR system provides a stable route from permanent document identity to the current Enterprise Document Register record. It supports verification and retrieval; it does not create document authority.

## Architecture

`Governed source -> controlled build -> QR-enabled PDF -> controlled publication -> permanent resolver -> current document control record`

The governed `01-10` taxonomy and the controlled `Batch 01-08` build architecture are separate. Batch changes never alter source location, Document ID, family, baseline package, or resolver.

## Class rules

| Document class | Default rule | Control treatment |
|---|---|---|
| Enterprise governance | Conditional | Required when issued-status verification provides material value. |
| Management control | Conditional | Used for controlled packets and decisions requiring version verification. |
| Operational control | Strongly preferred | Required when field access to current control information has operational value. |
| Blank controlled form | Required unless excepted | Resolver leads to the current template record; printed revision remains visible. |
| Completed record | No automatic template QR | Preserve originating template identity and revision as record evidence. |
| External document / SDS | MH wrapper or index | Do not alter publisher content or imply MH authority. |

## Resolver requirements

The future route shall be MH-controlled, stable, revision-independent, build-independent, unique, and free of secrets or expiring destinations. The final route pattern remains pending technical and management approval under `A-QR-001`.

## Supersession behavior

When the physical revision can be identified, the resolver record should display the printed revision, current revision, lifecycle status, current/superseded indicator, and authorized publication link subject to access controls. Old printed QR payloads remain historically stable.

## Visual control

Use `VERIFY CURRENT DOCUMENT` or `DOCUMENT CONTROL`. Marketing labels are prohibited. The physical revision must remain visually dominant over the QR, and the QR must remain subordinate to Document ID, title, revision, and control status.

## Exception and failure control

Required QR omissions require a controlled exception. Missing targets, invalid targets, decode failure, identity mismatch, resolver failure during validation, collisions, or missing required metadata block publication eligibility.

## Ownership

Document Control governs identity and publication; QR Generator governs rendering and scan QA; Web/Infrastructure governs route reliability; Document Owner governs content accuracy. All assignments are positional.
