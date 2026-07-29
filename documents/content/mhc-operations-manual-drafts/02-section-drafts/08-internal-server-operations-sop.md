# MHC Operations Manual - Internal Server Operations SOP

Status: Draft v0.1
Command Owner: COO (XO)
Backup Owner: Website Developer/CMO
Primary Reviewer: IT Specialist
Final Approver: CEO (CO)

## 1. Mission Purpose

Maintain internal server operational readiness for current projects and active business operations through controlled access, reliable backups, and defined recovery and escalation procedures.

## 2. Scope and Systems

Scope:

- Internal operations systems only.

Mission-critical priority:

- Current projects and active operations data.

Known operations platforms:

- Internal server services supporting operations workflows
- Monitoring and automation tooling currently used by operations and leadership

## 3. Command Ownership and Authority

- Primary operations owner: IT Specialist
- Secondary escalation owner: Website Developer/CMO
- Command accountability: XO
- Final command escalation: CO

Role note:

- CHENG may escalate directly to CO for mission-critical compliance or safety-adjacent systems risk.

## 4. Required Inputs

- Approved access roster by role
- Backup schedule and retention map
- Recovery runbook and contact tree
- Service inventory and dependency map
- Incident severity matrix

## 5. Required Outputs

- Verified backup completion logs
- Monthly restore-test evidence
- Quarterly full recovery-drill evidence
- Access review and change records
- Incident reports with corrective actions

## 6. SOP Steps

### Step 1 - Access Control Administration

- Enforce role-based, least-privilege access.
- Require XO approval for elevated-access requests.
- Remove or downgrade access immediately when role changes occur.

### Step 2 - Backup Operations

- Run nightly incremental backups for active operations data.
- Run weekly full backups.
- Run daily encrypted offsite replication.
- Validate backup success logs and flag failures same day.

### Step 3 - Recovery Testing

- Execute monthly restore tests for sample file and service validation.
- Execute quarterly end-to-end recovery drills.
- Record findings and corrective actions with deadlines.

### Step 4 - Monitoring and Incident Response

- Monitor service availability and backup job health.
- Classify incidents by severity and operational impact.
- Trigger escalation based on severity threshold and mission risk.

### Step 5 - Reporting and Governance

- Report incident and continuity posture at Monday 9:00 AM operations meeting when active risks exist.
- Include continuity controls in quarterly compliance audit package.

## 7. Controls and Thresholds

- Access changes must be logged and approved by authority.
- Backup failures require same-day investigation.
- Restore-test failures require corrective plan with owner and due date.
- Any incident threatening current project operations requires XO visibility.

Initial continuity objectives:

- RPO target: 24 hours
- RTO target: 8 business hours

## 8. KPI and Review Cadence

Weekly:

- Backup success rate
- Open server incidents and aging
- Open access-review exceptions

Monthly:

- Restore-test pass rate
- Mean time to resolve critical incidents

Quarterly:

- Recovery drill pass rate
- Recurrence rate of high-severity incidents

## 9. Evidence and Record Location

Primary evidence:

- Backup logs, restore-test records, and incident tickets

Supporting evidence:

- Access approval records
- Monitoring alerts and response logs
- Quarterly audit artifacts

## 10. Escalation Path

Standard path:

- IT Specialist -> Website Developer/CMO -> XO -> CO

Exception path:

- CHENG may escalate directly to CO for urgent compliance/safety systems exposure.

## 11. Non-Compliance Response

- First breach: documented correction and owner assignment.
- Repeat breach: XO-led continuity controls review.
- Critical breach: immediate CO notification and emergency command response.
