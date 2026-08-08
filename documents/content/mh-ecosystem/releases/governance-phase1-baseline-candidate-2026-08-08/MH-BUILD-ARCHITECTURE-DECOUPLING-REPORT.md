# MH Build Architecture Decoupling Report

**Scope:** HISTORICAL LINEAGE. Schema 2.2-development records the earlier build event; Schema 2.3-development governs the current Phase 1 Baseline Candidate.

**Control Status:** DRAFT | NOT CONTROLLED

A. Eight-batch schema coupling removed: PASS. No schema enumeration or pattern fixes governance to eight batches.  
B. New build identifier rule: `lastBuildUnit` accepts topology-neutral Build Manifest identifiers; deprecated `lastBuildBatch` remains as a compatibility alias.  
C. Schema version: 2.2-development, advanced from 2.1-development.  
D. Backward compatibility: Existing `lastBuildBatch` records remain valid. New records use `lastBuildUnit`; `lastBuildId` and `lastBuildDate` migrate to `buildId` and `buildDate`.  
E. Package-membership/source review: PASS. `source.governedPath` identifies one canonical governed source while `packageMemberships` records approved distribution memberships. Membership does not create another authoritative source.  
F. Build-history authority: The register retains the current or last verified build reference; Build Manifests and audit history retain complete execution history.  
G. QR independence validation: PASS. Resolver ID and target remain outside build metadata and unchanged by build-unit reassignment.  
H. Identity regression QA: PASS. Batch 01, Batch 08, Batch 09, Batch 12, and Worker 03 are accepted without identity changes.  
I. Accessibility-governance review: A narrow clarification was added for tagged PDFs, reading order, language, accessible tables and links, non-visual QR access, Generator QA proof, and controlled exceptions. No technical compliance is claimed.  
J. Files modified: Enterprise Register schema, field-authority CSV, and Document Control Standard Markdown.  
K. Files created: This report, regression QA report, checksum manifest, and sealed package.  
L. The 01-10 taxonomy is unchanged.  
M. Permanent IDs changed: 0.  
N. QR resolvers changed: 0.  
O. Ecosystem documents regenerated: 0.  
P. Documents issued: 0.  
Q. Documents superseded: 0.
