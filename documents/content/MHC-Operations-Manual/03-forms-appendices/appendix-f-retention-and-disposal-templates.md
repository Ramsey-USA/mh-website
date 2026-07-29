# Appendix F - Retention and Disposal Templates (Draft)

Status: Draft v0.1
Purpose: Provide standardized templates for retention scheduling, legal hold tracking, and approved disposal logging.

## 1. Retention Schedule Template

Template fields:

- Record category
- Description
- System of record
- Owner role
- Minimum retention period
- Archive location
- Disposal approval role
- Legal hold eligible (yes/no)

Example row:

| Record category          | Description            | System of record          | Owner role | Minimum retention | Archive location      | Disposal approval role | Legal hold eligible |
| ------------------------ | ---------------------- | ------------------------- | ---------- | ----------------- | --------------------- | ---------------------- | ------------------- |
| Project closeout package | Final turnover records | Procore + archive storage | PM/PE      | 10 years          | Project archive vault | XO                     | Yes                 |

## 2. Legal Hold Register Template

Template fields:

- Hold ID
- Trigger date
- Trigger source
- Scope of records
- Hold owner
- Command reviewer
- Release date
- Notes

Example row:

| Hold ID | Trigger date | Trigger source | Scope of records                       | Hold owner | Command reviewer | Release date | Notes       |
| ------- | ------------ | -------------- | -------------------------------------- | ---------- | ---------------- | ------------ | ----------- |
| LH-0001 | YYYY-MM-DD   | Legal request  | Project communications + change orders | HR         | XO               | Pending      | Active hold |

## 3. Disposal Log Template

Template fields:

- Disposal event ID
- Record category
- Retention satisfied date
- Disposal method
- Owner
- Approver
- Disposal completion date
- Verification reference

Example row:

| Disposal event ID | Record category         | Retention satisfied date | Disposal method | Owner | Approver | Disposal completion date | Verification reference |
| ----------------- | ----------------------- | ------------------------ | --------------- | ----- | -------- | ------------------------ | ---------------------- |
| DISP-0001         | Payroll support records | YYYY-MM-DD               | Secure deletion | HR    | XO       | YYYY-MM-DD               | Audit ref ID           |

## 4. Template Control Rules

- No disposal action without retention eligibility verification.
- No disposal action on records under active legal hold.
- Disposal logs must be retained as permanent governance evidence.
- Template revisions follow CHENG -> HR -> XO -> CO workflow.
