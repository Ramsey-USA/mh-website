/**
 * Offline Queue Manager
 *
 * Typed IndexedDB wrapper for queueing form submissions when the user
 * is offline. The service worker drains this queue on "background-sync".
 *
 * DB name : MHConstructionDB  (shared with sw.js — must stay in sync)
 * Version : 1
 * Stores  : "offline-submissions"  { id, endpoint, data, queuedAt }
 *           "contact-forms"        { id, data }  (legacy — kept for compat)
 */

const DB_NAME = "MHConstructionDB";
const DB_VERSION = 1;
const STORE = "offline-submissions";

export interface OfflineEntry {
  id?: number;
  endpoint: string;
  data: Record<string, unknown>;
  queuedAt: string;
}

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onerror = () => reject(req.error);
    req.onsuccess = () => resolve(req.result as IDBDatabase);
    req.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains("contact-forms")) {
        db.createObjectStore("contact-forms", {
          keyPath: "id",
          autoIncrement: true,
        });
      }
      if (!db.objectStoreNames.contains(STORE)) {
        db.createObjectStore(STORE, { keyPath: "id", autoIncrement: true });
      }
    };
  });
}

/** Enqueue a form submission for later sync. */
export async function saveOfflineSubmission(
  endpoint: string,
  data: Record<string, unknown>,
): Promise<void> {
  const db = await openDB();
  await new Promise<void>((resolve, reject) => {
    const tx = db.transaction([STORE], "readwrite");
    const store = tx.objectStore(STORE);
    const entry: OfflineEntry = {
      endpoint,
      data,
      queuedAt: new Date().toISOString(),
    };
    const req = store.add(entry);
    req.onerror = () => reject(req.error);
    req.onsuccess = () => resolve();
  });

  // Trigger background sync if available
  if ("serviceWorker" in navigator && "SyncManager" in window) {
    const registration = await navigator.serviceWorker.ready;
    try {
      await (
        registration as ServiceWorkerRegistration & {
          sync: { register(tag: string): Promise<void> };
        }
      ).sync.register("background-sync");
    } catch {
      // Browser does not support Background Sync — will retry on next online event
    }
  }
}

/** Get all pending submissions (used by OfflineIndicator for count). */
export async function getPendingCount(): Promise<number> {
  const db = await openDB();
  return new Promise<number>((resolve, reject) => {
    const tx = db.transaction([STORE], "readonly");
    const store = tx.objectStore(STORE);
    const req = store.count();
    req.onerror = () => reject(req.error);
    req.onsuccess = () => resolve(req.result as number);
  });
}

/** Delete a synced submission by id. */
export async function deleteOfflineSubmission(id: number): Promise<void> {
  const db = await openDB();
  await new Promise<void>((resolve, reject) => {
    const tx = db.transaction([STORE], "readwrite");
    const store = tx.objectStore(STORE);
    const req = store.delete(id);
    req.onerror = () => reject(req.error);
    req.onsuccess = () => resolve();
  });
}
