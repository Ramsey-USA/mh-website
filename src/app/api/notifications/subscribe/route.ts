import { NextRequest, NextResponse } from "next/server";

// Store subscriptions in memory (in production, use a database)
const subscriptions = new Map<string, any>();

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
    const subscriptionId = Buffer.from(subscription.endpoint).toString(
      "base64",
    );

    // Store the subscription (in production, save to database)
    subscriptions.set(subscriptionId, {
      subscription,
      userAgent,
      timestamp,
      id: subscriptionId,
    });

    console.log(`New push subscription registered: ${subscriptionId}`);
    console.log(`Total subscriptions: ${subscriptions.size}`);

    return NextResponse.json({
      message: "Subscription saved successfully",
      id: subscriptionId,
    });
  } catch (error) {
    console.error("Error saving subscription:", error);
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
