function isYes(value) {
  return (
    String(value ?? "")
      .trim()
      .toLowerCase() === "yes"
  );
}

function hasText(value) {
  return String(value ?? "").trim().length > 0;
}

export const REQUIRED_HEADERS = [
  "review_date",
  "review_url",
  "reviewer_name",
  "project_name",
  "named_employee",
  "qualified_yes_no",
  "duplicate_check_key",
  "verified_by",
  "verification_date",
  "gift_card_vendor",
  "gift_card_amount_usd",
  "fulfilled_yes_no",
];

export function validateTrackerRows(headers, rows) {
  const errors = [];

  const missingHeaders = REQUIRED_HEADERS.filter(
    (header) => !headers.includes(header),
  );
  if (missingHeaders.length > 0) {
    errors.push(`Missing required headers: ${missingHeaders.join(", ")}`);
  }

  const seenKeys = new Map();

  rows.forEach((row, index) => {
    const rowNumber = index + 2;

    if (isYes(row["qualified_yes_no"])) {
      const requiredForQualified = [
        "reviewer_name",
        "project_name",
        "named_employee",
        "review_url",
        "verification_date",
        "duplicate_check_key",
      ];

      for (const field of requiredForQualified) {
        if (!hasText(row[field])) {
          errors.push(`Row ${rowNumber}: qualified review is missing ${field}`);
        }
      }

      const dedupeKey = String(row["duplicate_check_key"] ?? "").trim();
      if (dedupeKey) {
        const previous = seenKeys.get(dedupeKey);
        if (previous) {
          errors.push(
            `Row ${rowNumber}: duplicate_check_key '${dedupeKey}' already used on row ${previous}`,
          );
        } else {
          seenKeys.set(dedupeKey, rowNumber);
        }
      }
    }

    if (isYes(row["fulfilled_yes_no"])) {
      const requiredForFulfilled = [
        "fulfillment_date",
        "gift_card_reference_id",
        "gift_card_amount_usd",
      ];

      for (const field of requiredForFulfilled) {
        if (!hasText(row[field])) {
          errors.push(`Row ${rowNumber}: fulfilled reward is missing ${field}`);
        }
      }
    }
  });

  return {
    isValid: errors.length === 0,
    errors,
  };
}

export function assertValidTracker(headers, rows, sourceLabel) {
  const result = validateTrackerRows(headers, rows);
  if (!result.isValid) {
    const detail = result.errors.map((error) => `- ${error}`).join("\n");
    throw new Error(`Tracker validation failed for ${sourceLabel}:\n${detail}`);
  }
}
