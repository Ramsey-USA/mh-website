// Firebase configuration
// This file handles Firebase initialization with proper error handling

import { initializeApp, getApps, FirebaseApp } from "firebase/app";
import { getAuth, connectAuthEmulator, Auth } from "firebase/auth";
import {
  getFirestore,
  connectFirestoreEmulator,
  Firestore,
} from "firebase/firestore";
import {
  getStorage,
  connectStorageEmulator,
  FirebaseStorage,
} from "firebase/storage";

// Dynamic import for Firebase Functions to avoid build-time TypeScript issues
type Functions = any;

// Check if we're in a production build or have valid Firebase config
const isProduction = process.env.NODE_ENV === "production";
const hasValidConfig =
  process.env.NEXT_PUBLIC_FIREBASE_API_KEY &&
  process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID &&
  process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID !== "demo-project";

// Firebase configuration with fallbacks for development
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "demo-api-key",
  authDomain:
    process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ||
    "demo-project.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "demo-project",
  storageBucket:
    process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ||
    "demo-project.appspot.com",
  messagingSenderId:
    process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "123456789",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "demo-app-id",
  measurementId:
    process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || "demo-measurement-id",
};

// Track initialization state
let app: FirebaseApp | null = null;
let auth: Auth | null = null;
let db: Firestore | null = null;
let storage: FirebaseStorage | null = null;
let functions: Functions | null = null;
let initializationError: Error | null = null;

// Initialize Firebase services lazily
function initializeFirebase() {
  if (app) return app;

  try {
    // Only initialize if we have valid config or we're in development
    if (!hasValidConfig && isProduction) {
      throw new Error("Firebase configuration missing in production");
    }

    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

    // Initialize services
    auth = getAuth(app);
    db = getFirestore(app);
    storage = getStorage(app);
    
    // Firebase Functions are not initialized in the client-side app
    // They should be called via API routes or server actions
    functions = null;

    // Setup development emulators if using demo config
    if (!hasValidConfig && typeof window !== "undefined") {
      console.log("[BUILD] Firebase: Using demo configuration for development");

      try {
        // Connect to emulators (will fail silently if already connected)
        connectAuthEmulator(auth, "http://localhost:9099", {
          disableWarnings: true,
        });
        connectFirestoreEmulator(db, "localhost", 8080);
        connectStorageEmulator(storage, "localhost", 9199);
        
        // Functions emulator connection not needed for client-side app
      } catch {
        // Emulators not available or already connected
        console.log(
          "[EDIT_NOTE] Firebase: Demo mode (emulators not connected)"
        );
      }
    }

    return app;
  } catch (error) {
    initializationError = error as Error;
    console.error("[EMERGENCY] Firebase initialization error:", error);
    return null;
  }
}

// Getter functions that initialize Firebase when needed
export function getFirebaseAuth(): Auth {
  if (initializationError) {
    throw initializationError;
  }

  if (!auth) {
    initializeFirebase();
  }

  if (!auth) {
    throw new Error("Firebase Auth could not be initialized");
  }

  return auth;
}

export function getFirebaseDb(): Firestore {
  if (initializationError) {
    throw initializationError;
  }

  if (!db) {
    initializeFirebase();
  }

  if (!db) {
    throw new Error("Firebase Firestore could not be initialized");
  }

  return db;
}

export function getFirebaseStorage(): FirebaseStorage {
  if (initializationError) {
    throw initializationError;
  }

  if (!storage) {
    initializeFirebase();
  }

  if (!storage) {
    throw new Error("Firebase Storage could not be initialized");
  }

  return storage;
}

export function getFirebaseFunctions(): Functions {
  throw new Error("Firebase Functions should be called via API routes, not directly from the client");
}

// Legacy exports for backward compatibility
export { getFirebaseAuth as auth };
export { getFirebaseDb as db };
export { getFirebaseStorage as storage };
export { getFirebaseFunctions as functions };

// Default export
export default function getFirebaseApp(): FirebaseApp | null {
  if (!app) {
    initializeFirebase();
  }
  return app;
}
