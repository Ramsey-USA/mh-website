# Appendix B - Controls, Retention, and Continuity Baseline

Status: Draft v0.1
Policy Type: Internal control baseline for Operations Manual v1

## 1. Meeting and Review Cadence

- Weekly operations control meeting: Monday 9:00 AM (mandatory)
- Quarterly controls and compliance audit: Safety Officer/CHENG and/or XO

## 2. Records Retention Baseline (Conservative)

| Record Type                                         | Minimum Retention         |
| --------------------------------------------------- | ------------------------- |
| Project communication records                       | 7 years                   |
| Contracts, change orders, warranty records          | 10 years                  |
| Safety incidents, corrective actions, audit records | 10 years                  |
| Financial and accounting records (SAGE100 outputs)  | 7 years                   |
| Payroll and timekeeping records (HH2 related)       | 7 years                   |
| HR personnel records after separation               | 7 years                   |
| Training and certification records                  | Employment term + 5 years |
| Manual revision history                             | Permanent archive         |

## 3. Internal Server Continuity Baseline

- Scope: Internal operations systems only.
- Mission-critical priority: Current projects and active operations data.

Backup cadence:

- Nightly incremental backup for active operations data.
- Weekly full backup.
- Daily encrypted offsite replication.

Recovery testing cadence:

- Monthly restore test (sample file and system check).
- Quarterly recovery drill (end-to-end scenario).

Initial recovery objectives:

- RPO target: 24 hours.
- RTO target: 8 business hours.

Ownership:

- Primary operator: IT Specialist.
- Secondary escalation: Website developer/CMO.
- Command accountability: XO.

## 4. Access and Escalation Baseline

- Access is role-based and least-privilege.
- Elevated access requests require XO approval.
- Security or compliance incidents escalate through CHENG; CHENG may escalate directly to CO when severity requires.

## 5. Change Control Baseline

- All operational policy changes are versioned.
- Draft changes route for review in this order: CHENG -> HR -> XO -> CO.
- Emergency policy patches may be issued by XO with immediate CO notification and post-implementation review at next control meeting.
