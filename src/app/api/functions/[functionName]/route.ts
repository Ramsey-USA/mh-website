import { type NextRequest, NextResponse } from "next/server";
import { logger } from "@/lib/utils/logger";
import {
  verifyToken,
  extractTokenFromHeader,
  type JWTUser,
} from "@/lib/auth/jwt";
import { sendNotification } from "@/lib/notifications/notificationService";

export const runtime = "edge";
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

export async function POST(request: NextRequest, context: RouteParams) {
  try {
    const { functionName } = await context.params;
    const body = await request.json();
    const authHeader = request.headers.get("authorization");

    // JWT authentication
    let user: JWTUser | null = null;
    if (authHeader) {
      const token = extractTokenFromHeader(authHeader);
      if (token) {
        user = await verifyToken(token);
      }
    }

    // Route to specific functions
    switch (functionName) {
      case "sendNotification":
        return await handleSendNotification(body as NotificationData, user);
      case "getUserData":
        return await handleGetUserData(body as UserDataRequest, user);
      default:
        return NextResponse.json(
          { error: "Function not found" },
          { status: 404 },
        );
    }
  } catch (_error) {
    logger.error("API function error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

async function handleSendNotification(
  data: NotificationData,
  user: JWTUser | null,
) {
  if (!user) {
    return NextResponse.json(
      { error: "Authentication required" },
      { status: 401 },
    );
  }

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

function handleGetUserData(data: UserDataRequest, user: JWTUser | null) {
  if (!user) {
    return NextResponse.json(
      { error: "Authentication required" },
      { status: 401 },
    );
  }

  try {
    // User data retrieval from Cloudflare D1/KV
    // TODO: Connect to actual database when ready
    // Example D1 query:
    // const db = env.DB;
    // const result = await db.prepare(
    //   "SELECT id, email, name, role, created_at FROM users WHERE id = ?"
    // ).bind(data.userId || user.uid).first();

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
    logger.error("Error getting user data:", error);
    return NextResponse.json(
      { error: "Failed to get user data" },
      { status: 500 },
    );
  }
}
