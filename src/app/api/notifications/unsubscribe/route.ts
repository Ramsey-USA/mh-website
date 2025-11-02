import { NextRequest, NextResponse } from "next/server";

// Enable Edge Runtime for Cloudflare Pages
export const runtime = "edge";

// Reference to the same subscription store (in production, use a database)
import type { SubscriptionData } from "../send/route";

declare global {
  // Ensure the type matches the declaration in send/route.ts
  var subscriptionsStore: Map<string, SubscriptionData>;
}

if (!global.subscriptionsStore) {
  global.subscriptionsStore = new Map();
}

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
    const { subscription } = await request.json();

    if (!subscription || !subscription.endpoint) {
      return NextResponse.json(
        { error: "Invalid subscription object" },
        { status: 400 }
      );
    }

    // Generate the same ID used when subscribing
    const subscriptionId = base64EncodeUnicode(subscription.endpoint);

    // Remove the subscription
    const existed = global.subscriptionsStore.delete(subscriptionId);

    console.log(`Push subscription unregistered: ${subscriptionId}`);
    console.log(`Total subscriptions: ${global.subscriptionsStore.size}`);

    return NextResponse.json({
      message: existed
        ? "Subscription removed successfully"
        : "Subscription not found",
      id: subscriptionId,
    });
  } catch (error) {
    console.error("Error removing subscription:", error);
    return NextResponse.json(
      { error: "Failed to remove subscription" },
      { status: 500 }
    );
  }
}
