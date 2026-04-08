import { type NextRequest, NextResponse } from "next/server";
import { logger } from "@/lib/utils/logger";
import {
  verifyToken,
  extractTokenFromHeader,
  type JWTUser,
} from "@/lib/auth/jwt";
import { sendNotification } from "@/lib/notifications/notification-service";
import { rateLimit, rateLimitPresets } from "@/lib/security/rate-limiter";

export const dynamic = "force-dynamic";

// Cloudflare-based API routes
// This replaces Firebase Admin SDK functionality

interface RouteParams {
  params: Promise<{ functionName: string }>;
}

interface NotificationData {
  recipient: string;
  message: string;
  type?: "email" | "push" | "sms";
  metadata?: Record<string, unknown>;
}

interface UserDataRequest {
  userId?: string;
  fields?: string[];
}

type ValidationResult<T> =
  | { valid: true; data: T }
  | { valid: false; error: string };

interface FunctionPolicy {
  requiresAuth: boolean;
  allowedRoles?: string[];
}

const FUNCTION_POLICIES: Record<string, FunctionPolicy> = {
  sendNotification: {
    requiresAuth: true,
    allowedRoles: ["admin"],
  },
  getUserData: {
    requiresAuth: true,
    allowedRoles: ["admin", "superintendent"],
  },
};

const MAX_RECIPIENT_LENGTH = 254;
const MAX_MESSAGE_LENGTH = 2000;
const MAX_METADATA_KEYS = 20;
const MAX_FIELD_COUNT = 10;
const ALLOWED_USER_FIELDS = new Set(["uid", "email", "role", "name"]);

function sanitizeString(value: unknown, maxLen: number): string {
  if (typeof value !== "string") return "";
  return value
    .replace(/[\x00-\x1F\x7F]/g, "")
    .trim()
    .slice(0, maxLen);
}

function isPlainRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function validateNotificationData(
  body: unknown,
): ValidationResult<NotificationData> {
  if (!isPlainRecord(body)) {
    return { valid: false, error: "Invalid payload" };
  }

  const recipient = sanitizeString(body["recipient"], MAX_RECIPIENT_LENGTH);
  const message = sanitizeString(body["message"], MAX_MESSAGE_LENGTH);

  if (!recipient) {
    return { valid: false, error: "recipient is required" };
  }

  if (!message) {
    return { valid: false, error: "message is required" };
  }

  let type: NotificationData["type"];
  if (body["type"] !== undefined) {
    if (
      body["type"] !== "email" &&
      body["type"] !== "push" &&
      body["type"] !== "sms"
    ) {
      return { valid: false, error: "Invalid notification type" };
    }
    type = body["type"];
  }

  let metadata: Record<string, unknown> | undefined;
  if (body["metadata"] !== undefined) {
    if (!isPlainRecord(body["metadata"])) {
      return { valid: false, error: "metadata must be an object" };
    }
    const keys = Object.keys(body["metadata"]);
    if (keys.length > MAX_METADATA_KEYS) {
      return { valid: false, error: "metadata has too many keys" };
    }
    metadata = body["metadata"];
  }

  return {
    valid: true,
    data: {
      recipient,
      message,
      ...(type ? { type } : {}),
      ...(metadata ? { metadata } : {}),
    },
  };
}

function validateUserDataRequest(
  body: unknown,
): ValidationResult<UserDataRequest> {
  if (!isPlainRecord(body)) {
    return { valid: false, error: "Invalid payload" };
  }

  const userId =
    body["userId"] !== undefined
      ? sanitizeString(body["userId"], 128)
      : undefined;

  let fields: string[] | undefined;
  if (body["fields"] !== undefined) {
    if (!Array.isArray(body["fields"])) {
      return { valid: false, error: "fields must be an array" };
    }

    if (body["fields"].length > MAX_FIELD_COUNT) {
      return { valid: false, error: "too many fields requested" };
    }

    const sanitizedFields = body["fields"]
      .map((field) => sanitizeString(field, 32))
      .filter(Boolean);

    if (sanitizedFields.length !== body["fields"].length) {
      return { valid: false, error: "fields must be non-empty strings" };
    }

    const hasDisallowedField = sanitizedFields.some(
      (field) => !ALLOWED_USER_FIELDS.has(field),
    );

    if (hasDisallowedField) {
      return { valid: false, error: "Unsupported fields requested" };
    }

    fields = sanitizedFields;
  }

  return {
    valid: true,
    data: {
      ...(userId ? { userId } : {}),
      ...(fields ? { fields } : {}),
    },
  };
}

export const POST = rateLimit(rateLimitPresets.api)(async (
  request: NextRequest,
  context: unknown,
) => {
  const { params } = context as RouteParams;
  try {
    const { functionName } = await params;

    // Validate functionName format to prevent path traversal / unexpected routing
    if (!/^[a-zA-Z][a-zA-Z0-9]{0,50}$/.test(functionName)) {
      return NextResponse.json(
        { error: "Invalid function name" },
        { status: 400 },
      );
    }

    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: "Invalid JSON payload" },
        { status: 400 },
      );
    }

    const policy = FUNCTION_POLICIES[functionName];
    if (!policy) {
      return NextResponse.json(
        { error: "Function not found" },
        { status: 404 },
      );
    }

    const authHeader = request.headers.get("authorization");

    // JWT authentication
    let user: JWTUser | null = null;
    if (authHeader) {
      const token = extractTokenFromHeader(authHeader);
      if (token) {
        user = await verifyToken(token);
      }
    }

    if (policy.requiresAuth && !user) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 },
      );
    }

    if (
      policy.allowedRoles &&
      (!user?.role || !policy.allowedRoles.includes(user.role))
    ) {
      return NextResponse.json(
        { error: "Insufficient permissions" },
        { status: 403 },
      );
    }

    // Route to specific functions
    switch (functionName) {
      case "sendNotification": {
        const validation = validateNotificationData(body);
        if (!validation.valid) {
          return NextResponse.json(
            { error: validation.error },
            { status: 400 },
          );
        }
        return await handleSendNotification(validation.data, user!);
      }
      case "getUserData": {
        const validation = validateUserDataRequest(body);
        if (!validation.valid) {
          return NextResponse.json(
            { error: validation.error },
            { status: 400 },
          );
        }
        return await handleGetUserData(validation.data, user!);
      }
      default:
        return NextResponse.json(
          { error: "Function not found" },
          { status: 404 },
        );
    }
  } catch (error) {
    logger.error("API function error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
});

async function handleSendNotification(data: NotificationData, user: JWTUser) {
  // Send notification using notification service
  const result = await sendNotification({
    recipient: data.recipient,
    message: data.message,
    type: data.type || "email",
    metadata: {
      ...data.metadata,
      sentBy: user.uid,
      timestamp: new Date().toISOString(),
    },
  });

  if (!result.success) {
    logger.error("Failed to send notification", {
      error: result.error,
      recipient: data.recipient,
      type: data.type,
    });

    return NextResponse.json(
      { error: "Failed to send notification", details: result.error },
      { status: 500 },
    );
  }

  logger.info("Notification sent successfully", {
    userId: user.uid,
    recipient: data.recipient,
    messageId: result.messageId,
  });

  return NextResponse.json({
    success: true,
    message: "Notification sent successfully",
    data: {
      userId: user.uid,
      recipient: data.recipient,
      messageId: result.messageId,
    },
  });
}

function handleGetUserData(data: UserDataRequest, user: JWTUser) {
  try {
    // For now, return user data from JWT token
    const userData = {
      uid: user.uid,
      email: user.email,
      role: user.role,
      name: user.name,
      // Add additional fields as needed from database
    };

    // Filter fields if requested
    if (data.fields && data.fields.length > 0) {
      const filteredData: Record<string, unknown> = {};
      for (const field of data.fields) {
        if (field in userData) {
          filteredData[field] = userData[field as keyof typeof userData];
        }
      }
      return NextResponse.json({
        success: true,
        data: filteredData,
      });
    }

    return NextResponse.json({
      success: true,
      data: userData,
    });
  } catch (_error) {
    logger.error("Error getting user data:", _error);
    return NextResponse.json(
      { error: "Failed to get user data" },
      { status: 500 },
    );
  }
}
