# Appendix D - Approval Authority Matrix (Draft)

Status: Draft v0.1
Purpose: Define approval authority lanes and signing rights for core operational controls.

Legend:

- AP = Approval authority
- PREP = Prepares package
- RVW = Reviews package
- ESC = Escalation authority

## 1. Command Roles

- CO: CEO
- XO: COO
- Master Chief: Chief Superintendent
- CHENG: Safety Officer/CMO
- CPCO: Chief Preconstruction Officer
- PM: Project Manager
- PE: Project Engineer
- HR: Human Resources
- IT: IT Specialist

## 2. Authority Matrix

| Control Item                                | PREP               | RVW                   | AP    | ESC   |
| ------------------------------------------- | ------------------ | --------------------- | ----- | ----- |
| Project setup activation in Procore         | PE                 | PM                    | XO    | CO    |
| External RFI/Submittal release              | PE                 | PM                    | PM    | XO/CO |
| Change order (<25,000)                      | PE                 | PM                    | PM    | XO    |
| Change order (25,000-49,999)                | PE                 | PM                    | XO    | CO    |
| Change order (50,000+)                      | PE                 | PM/XO                 | CO    | CO    |
| Procore digital closeout sign-off           | PE                 | PM                    | PM    | XO/CO |
| Manual chapter release                      | Author             | CHENG/HR              | XO    | CO    |
| Final manual publication approval           | XO                 | CHENG/HR              | CO    | CO    |
| Elevated Outlook access                     | IT/Admin Assistant | HR                    | XO    | CO    |
| Internal server elevated access             | IT                 | Website Developer/CMO | XO    | CO    |
| Internal server emergency continuity action | IT                 | XO                    | XO    | CO    |
| Safety stop-work order                      | Field Lead         | CHENG                 | CHENG | CO    |

## 3. Special Command Exceptions

- CHENG may escalate directly to CO on mission-critical safety/compliance exposure.
- CPCO may escalate directly to CO on mission-critical strategic preconstruction exposure.

## 4. Governance Notes

- Thresholds are evaluated per single change order.
- Approval authority cannot be delegated ad hoc without documented command authorization.
- All approvals must be traceable to system evidence or signed records.
