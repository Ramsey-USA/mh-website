import re

def update_contact_route():
    path = '/workspaces/mh-website/apps/website/src/app/api/contact/route.ts'
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Match the block from line 142 approximately
    # Escaping any backslashes in the replacement string to avoid re.sub interpreting them
    pattern = r'// Store submission in D1 database \(best-effort pattern\).*?// Continue even if DB fails \(best-effort pattern\)\s+\}\s+\}'
    
    replacement = r'''// Store submission in D1 database (fail-fast)
    const submissionId = crypto.randomUUID();

    // For general contact forms, store in contact_submissions table
    if (data.type === "contact" || data.type === "general" || !data.type) {
      try {
        const DB = getD1Database();
        if (!DB) {
          logger.error("D1 database not available");
          return internalServerError("Database connection not available");
        }

        const db = createDbClient({ DB });

        // Parse name into first and last name (simple split)
        const nameParts = data.name.trim().split(/\\s+/);
        const firstName = nameParts[0] || data.name;
        const lastName = nameParts.slice(1).join(" ") || "";

        // Extract metadata with proper type handling
        const metadata = data.metadata as Record<string, unknown> | undefined;
        const projectType = metadata?.["projectType"];
        const location = metadata?.["location"];
        const budget = metadata?.["budget"];
        const timeline = metadata?.["timeline"];

        const contactSubmission: Omit<
          ContactSubmission,
          "created_at" | "updated_at"
        > = {
          id: submissionId,
          first_name: firstName,
          last_name: lastName,
          email: data.email,
          phone: data.phone || "",
          project_type:
            (typeof projectType === "string" ? projectType : undefined) || "",
          project_location:
            (typeof location === "string" ? location : undefined) || "",
          budget: budget?.toString() || "",
          timeline:
            (typeof timeline === "string" ? timeline : undefined) || "",
          message: data.message,
          urgency: "medium",
          preferred_contact: "either",
          status: emailSent ? "new" : "in_progress",
          metadata: JSON.stringify({
            subject: data.subject,
            emailSent,
            emailError: emailSent ? undefined : emailResult.error,
            submittedAt: new Date().toISOString(),
          }),
        };

        await db.insert("contact_submissions", contactSubmission);
        logger.info("Contact submission stored in database", {
          id: submissionId,
        });
      } catch (dbError) {
        logger.error("Failed to store contact submission in database:", dbError);
        return internalServerError("Failed to store submission in database");
      }
    }'''

    new_content = re.sub(pattern, replacement, content, flags=re.DOTALL)
    if new_content == content:
        print("Warning: contact_route content did not change!")
    with open(path, 'w', encoding='utf-8') as f:
        f.write(new_content)

def update_form_handler():
    path = '/workspaces/mh-website/packages/shared/src/lib/api/form-handler.ts'
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()

    pattern = r'// Store in D1 database \(best-effort\).*?// Continue to send email even if DB fails \(best-effort pattern\)\s+\}'
    
    replacement = r'''// Store in D1 database (fail-fast)
    let dbStored = false;
    try {
      const DB = getD1Database();
      if (!DB) {
        logger.error("D1 database not available");
        return createResponse(
          {
            success: false,
            error: {
              code: "SERVICE_UNAVAILABLE",
              message: "Database connection not available",
            },
          },
          503,
        );
      }

      // Database client is now properly typed
      const db = createDbClient({ DB });
      await db.insert(config.tableName, dbRecord as Record<string, unknown>);
      logger.info(`${config.submissionType} stored in database`, {
        id: submissionId,
        table: config.tableName,
      });
      dbStored = true;
    } catch (error: unknown) {
      const normalizedError =
        error instanceof Error ? error : new Error(String(error));
      logger.error(
        `Failed to store ${config.submissionType} in database:`,
        normalizedError,
      );
      
      return createResponse(
        {
          success: false,
          error: {
            code: "DATABASE_ERROR",
            message: "Failed to store submission in database",
          },
        },
        503,
      );
    }'''

    new_content = re.sub(pattern, replacement, content, flags=re.DOTALL)
    if new_content == content:
        print("Warning: form_handler content did not change!")
    with open(path, 'w', encoding='utf-8') as f:
        f.write(new_content)

if __name__ == "__main__":
    update_contact_route()
    update_form_handler()
