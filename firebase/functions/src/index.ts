import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

// Initialize Firebase Admin SDK
admin.initializeApp();

// Example function - Contact form handler
export const handleContactForm = functions.https.onRequest(async (req, res) => {
  // Set CORS headers
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.set("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.status(200).send("");
    return;
  }

  if (req.method !== "POST") {
    res.status(405).send("Method Not Allowed");
    return;
  }

  try {
    const { name, email, phone, message, projectType } = req.body;

    // Save to Firestore
    await admin.firestore().collection("consultations").add({
      name,
      email,
      phone,
      message,
      projectType,
      status: "pending",
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      source: "website_contact_form",
    });

    res.status(200).json({
      success: true,
      message: "Contact form submitted successfully",
    });
  } catch (error) {
    console.error("Error handling contact form:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

// Example function - Generate project estimate
export const generateEstimate = functions.https.onCall(
  async (data, context) => {
    // Verify authentication if needed
    if (!context.auth) {
      throw new functions.https.HttpsError(
        "unauthenticated",
        "User must be authenticated",
      );
    }

    const { projectType, sqFootage, complexity, timeline } = data;

    // Basic estimate calculation logic
    const baseRates = {
      commercial: 150,
      residential: 120,
      industrial: 180,
      renovation: 100,
    };

    const complexityMultiplier = {
      low: 1.0,
      medium: 1.3,
      high: 1.6,
    };

    const baseRate = baseRates[projectType as keyof typeof baseRates] || 120;
    const multiplier =
      complexityMultiplier[complexity as keyof typeof complexityMultiplier] ||
      1.0;
    const estimatedCost = sqFootage * baseRate * multiplier;

    // Save estimate to Firestore
    const estimateDoc = await admin.firestore().collection("estimates").add({
      projectType,
      sqFootage,
      complexity,
      timeline,
      estimatedCost,
      createdBy: context.auth.uid,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      status: "draft",
    });

    return {
      estimateId: estimateDoc.id,
      estimatedCost,
      breakdown: {
        baseRate,
        sqFootage,
        complexity,
        multiplier,
      },
    };
  },
);
