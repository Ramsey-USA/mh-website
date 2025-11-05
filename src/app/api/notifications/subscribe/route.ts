import { NextRequest, NextResponse } from "next/server";
import { logger } from "@/lib/utils/logger";

export const runtime = "edge";
export const dynamic = "force-dynamic";

// Store subscriptions in memory (in production, use a database)
const subscriptions = new Map<string, any>();

// Web-compatible base64 helper (Edge runtime safe)
function base64EncodeUnicode(str: string) {
  const uint8 = new TextEncoder().encode(str);
  let binary = "";
  for (let i = 0; i < uint8.length; i++)
    binary += String.fromCharCode(uint8[i]);
  return btoa(binary);
}

export async function POST(request: NextRequest) {
  try {
    const { subscription, userAgent, timestamp } = await request.json();

    if (!subscription || !subscription.endpoint) {
      return NextResponse.json(
        { error: "Invalid subscription object" },
        { status: 400 },
      );
    }

    // Generate a unique ID for the subscription
    const subscriptionId = base64EncodeUnicode(subscription.endpoint);

    // Store the subscription (in production, save to database)
    subscriptions.set(subscriptionId, {
      subscription,
      userAgent,
      timestamp,
      id: subscriptionId,
    });

    logger.info(`New push subscription registered: ${subscriptionId}`);
    logger.info(`Total subscriptions: ${subscriptions.size}`);

    return NextResponse.json({
      message: "Subscription saved successfully",
      id: subscriptionId,
    });
  } catch (error) {
    logger.error("Error saving subscription:", error);
    return NextResponse.json(
      { error: "Failed to save subscription" },
      { status: 500 },
    );
  }
}

export async function GET() {
  // Return subscription count for admin purposes
  return NextResponse.json({
    count: subscriptions.size,
    subscriptions: Array.from(subscriptions.values()).map((sub) => ({
      id: sub.id,
      userAgent: sub.userAgent,
      timestamp: sub.timestamp,
    })),
  });
}
