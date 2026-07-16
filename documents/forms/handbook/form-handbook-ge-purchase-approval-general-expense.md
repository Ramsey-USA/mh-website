# HANDBOOK-FORM-08 (FORM GE) — Purchase Approval General Expense

- **Schema:** `form-handbook-ge-purchase-approval-general-expense.json`
- **TOC Code:** FORM GE
- **Chapter:** 3 — Compensation & Benefits
- **Owner:** Human Resources
- **Purpose:** Routes handbook-related purchases and general expense approvals.

## Fields

### Page 1 — Request

| Section                          | Type      | Fields                                                                                                                                            |
| -------------------------------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| Requestor & purchase information | fieldGrid | Date Submitted, Date Needed By, Requestor Name, Phone / Email, Expense Category, Account / GL Code, Vendor / Supplier, Vendor Contact / Quote No. |
| Payment Type                     | checkGrid | Checking, Chase, Cabela's, Lowe's, Home Depot                                                                                                     |
| Itemized Purchase Detail         | dataTable | Description, Qty, Unit Price, Line Total, Notes (4 rows)                                                                                          |
| Summary Totals                   | fieldGrid | Subtotal, Tax / Freight, Total Estimate                                                                                                           |
| Justification / Notes            | narrative | Free-text justification                                                                                                                           |

### Page 2 — Approval Review

| Section           | Type                | Fields                                            |
| ----------------- | ------------------- | ------------------------------------------------- |
| Approval Decision | checkGrid           | Approved, Denied, More Info Needed                |
| Approval Summary  | fieldGrid           | Approved Amount, Approval Date, Reference / Notes |
| Sign-Off          | signatures (manual) | Requestor, Approver                               |
| Approver Comments | narrative           | Free-text comments                                |

## Notes

- Two-page form: request on page 1, approval review on page 2.
