function hasText(value) {
  return String(value ?? "").trim().length > 0;
}

export const REQUIRED_CLOSEOUT_HEADERS = [
  "stakeholder_name",
  "stakeholder_email",
  "stakeholder_phone",
  "project_name",
  "project_slug",
  "sender_name",
];

export function validateCloseoutRows(headers, rows) {
  const errors = [];

  const missingHeaders = REQUIRED_CLOSEOUT_HEADERS.filter(
    (header) => !headers.includes(header),
  );
  if (missingHeaders.length > 0) {
    errors.push(`Missing required headers: ${missingHeaders.join(", ")}`);
  }

  rows.forEach((row, index) => {
    const rowNumber = index + 2;

    if (!hasText(row["stakeholder_name"])) {
      errors.push(`Row ${rowNumber}: missing stakeholder_name`);
    }

    if (!hasText(row["project_name"])) {
      errors.push(`Row ${rowNumber}: missing project_name`);
    }

    if (!hasText(row["sender_name"])) {
      errors.push(`Row ${rowNumber}: missing sender_name`);
    }

    const hasEmail = hasText(row["stakeholder_email"]);
    const hasPhone = hasText(row["stakeholder_phone"]);
    if (!hasEmail && !hasPhone) {
      errors.push(
        `Row ${rowNumber}: requires stakeholder_email or stakeholder_phone`,
      );
    }
  });

  return {
    isValid: errors.length === 0,
    errors,
  };
}

export function assertValidCloseout(headers, rows, sourceLabel) {
  const result = validateCloseoutRows(headers, rows);
  if (!result.isValid) {
    const detail = result.errors.map((error) => `- ${error}`).join("\n");
    throw new Error(
      `Closeout input validation failed for ${sourceLabel}:\n${detail}`,
    );
  }
}
