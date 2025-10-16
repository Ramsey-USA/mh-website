import { NextRequest, NextResponse } from "next/server";
import { getFirestore } from "firebase-admin/firestore";
import { getAuth } from "firebase-admin/auth";
import { initializeApp, getApps, cert } from "firebase-admin/app";

// Initialize Firebase Admin SDK
let db: any = null;
let auth: any = null;

if (!getApps().length && process.env.FIREBASE_PROJECT_ID) {
  try {
    initializeApp({
      credential: cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      }),
    });
    db = getFirestore();
    auth = getAuth();
  } catch (error) {
    console.warn("Firebase Admin SDK initialization failed:", error);
  }
}

interface RouteParams {
  params: Promise<{ functionName: string }>;
}

export async function POST(request: NextRequest, context: RouteParams) {
  try {
    // Check if Firebase is initialized
    if (!db || !auth) {
      return NextResponse.json(
        { error: "Firebase not configured" },
        { status: 503 },
      );
    }

    const { functionName } = await context.params;
    const body = await request.json();
    const authHeader = request.headers.get("authorization");

    // Verify authentication if provided
    let user = null;
    if (authHeader && authHeader.startsWith("Bearer ")) {
      const token = authHeader.split("Bearer ")[1];
      try {
        user = await auth.verifyIdToken(token);
      } catch (error) {
        return NextResponse.json(
          { error: "Invalid authentication token" },
          { status: 401 },
        );
      }
    }

    // Route to specific functions
    switch (functionName) {
      case "sendNotification":
        return await handleSendNotification(body, user);
      case "getUserData":
        return await handleGetUserData(body, user);
      default:
        return NextResponse.json(
          { error: "Function not found" },
          { status: 404 },
        );
    }
  } catch (error) {
    console.error("Firebase function error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

async function handleSendNotification(data: any, user: any) {
  // Implement notification sending logic
  if (!user) {
    return NextResponse.json(
      { error: "Authentication required" },
      { status: 401 },
    );
  }

  // Example: Send notification via Firebase Cloud Messaging
  // You would implement the actual notification logic here

  return NextResponse.json({
    success: true,
    message: "Notification sent successfully",
    data: { userId: user.uid, ...data },
  });
}

async function handleGetUserData(data: any, user: any) {
  if (!user) {
    return NextResponse.json(
      { error: "Authentication required" },
      { status: 401 },
    );
  }

  try {
    // Example: Get user data from Firestore
    const userDoc = await db.collection("users").doc(user.uid).get();

    if (!userDoc.exists) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: userDoc.data(),
    });
  } catch (error) {
    console.error("Error getting user data:", error);
    return NextResponse.json(
      { error: "Failed to get user data" },
      { status: 500 },
    );
  }
}
