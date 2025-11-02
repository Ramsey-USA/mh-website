import { NextRequest, NextResponse } from "next/server";

// Enable Edge Runtime for Cloudflare Pages
export const runtime = "edge";

export interface SubscriptionData {
  subscription: PushSubscription;
  userAgent: string;
  timestamp: number;
  id: string;
}

// Reference to subscription store
declare global {
  var subscriptionsStore: Map<string, SubscriptionData>;
}

if (!global.subscriptionsStore) {
  global.subscriptionsStore = new Map();
}

export async function POST(request: NextRequest) {
  try {
    const {
      title,
      body,
      type = "general",
      targetAll = true,
      targetIds = [],
    } = await request.json();

    if (!title || !body) {
      return NextResponse.json(
        { error: "Title and body are required" },
        { status: 400 },
      );
    }

    const payload = JSON.stringify({
      title,
      body,
      type,
      icon: "/icons/icon-96x96.png",
      badge: "/icons/icon-96x96.png",
      data: {
        type,
        timestamp: Date.now(),
        url: "/",
      },
    });

    const subscriptionsToNotify = targetAll
      ? Array.from(global.subscriptionsStore.values())
      : (targetIds as string[])
          .map((id: string) => global.subscriptionsStore.get(id))
          .filter(Boolean);

    // For demo purposes, we'll simulate successful sending
    // In production, you would use actual push notification service
    const results = subscriptionsToNotify.map(
      (sub: SubscriptionData | undefined) => {
        if (!sub)
          return {
            success: false,
            id: "unknown",
            error: "Invalid subscription",
          };

        try {
          // Simulate sending notification
          console.log(
            `Simulating notification to ${sub.id}: ${title} - ${body}`,
          );
          return { success: true, id: sub.id };
        } catch (error) {
          console.error(`Failed to send notification to ${sub.id}:`, error);
          return {
            success: false,
            id: sub.id,
            error: error instanceof Error ? error.message : "Unknown error",
          };
        }
      },
    );

    const successful = results.filter((r) => r.success).length;
    const failed = results.length - successful;

    return NextResponse.json({
      message: `Notifications sent successfully (demo mode)`,
      successful,
      failed,
      total: results.length,
    });
  } catch (error) {
    console.error("Error sending notifications:", error);
    return NextResponse.json(
      { error: "Failed to send notifications" },
      { status: 500 },
    );
  }
}

// GET endpoint to test the notification system
export async function GET() {
  const subscriptionCount = global.subscriptionsStore.size;

  if (subscriptionCount === 0) {
    return NextResponse.json({
      message: "No subscriptions available for testing",
      count: 0,
    });
  }

  // Simulate sending test notifications
  const results = Array.from(global.subscriptionsStore.values()).map(
    (sub: SubscriptionData) => {
      try {
        console.log(`Test notification sent to ${sub.id}`);
        return { success: true, id: sub.id };
      } catch (error) {
        console.error(`Test notification failed for ${sub.id}:`, error);
        return { success: false, id: sub.id };
      }
    },
  );

  const successful = results.filter((r) => r.success).length;

  return NextResponse.json({
    message: "Test notifications sent (demo mode)",
    successful,
    failed: results.length - successful,
    total: results.length,
  });
}
