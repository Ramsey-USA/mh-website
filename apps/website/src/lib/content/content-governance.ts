export type ContentLifecycleState =
  | "draft"
  | "under-review"
  | "approved"
  | "published"
  | "archived"
  | "withdrawn";

export type ContentApprovalState = "pending" | "approved" | "rejected";

export type ContentPublishState = "public" | "internal";

export type ContentSourceReference = {
  sourceType: "document" | "route" | "media" | "internal-record";
  reference: string;
  note?: string;
};

export type ContentGovernanceRecord = {
  stableId: string;
  ownerRole: string;
  lifecycle: ContentLifecycleState;
  approvalState: ContentApprovalState;
  publishState: ContentPublishState;
  approvedAt?: string;
  approvalReference?: string;
  nextReviewAt: string;
  sourceReferences: ContentSourceReference[];
  archiveReason?: string;
  withdrawalReason?: string;
};

export function isPublicLifecycle(lifecycle: ContentLifecycleState): boolean {
  return lifecycle === "published" || lifecycle === "archived";
}

export function isPubliclyVisibleContent(
  governance: ContentGovernanceRecord,
): boolean {
  if (governance.publishState !== "public") {
    return false;
  }

  if (!isPublicLifecycle(governance.lifecycle)) {
    return false;
  }

  if (governance.lifecycle === "withdrawn") {
    return false;
  }

  return governance.approvalState === "approved";
}

export function isReviewOverdue(
  governance: ContentGovernanceRecord,
  now: Date = new Date(),
): boolean {
  const nextReviewDate = new Date(governance.nextReviewAt);
  return Number.isFinite(nextReviewDate.getTime()) && nextReviewDate < now;
}

export function hasSourceReferences(
  governance: ContentGovernanceRecord,
): boolean {
  return governance.sourceReferences.length > 0;
}
