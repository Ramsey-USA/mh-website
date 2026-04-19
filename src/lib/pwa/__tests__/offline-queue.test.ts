/**
 * @jest-environment jsdom
 */

import {
  saveOfflineSubmission,
  getPendingCount,
  deleteOfflineSubmission,
} from "../offline-queue";

type RequestLike = {
  onsuccess?: (event?: unknown) => void;
  onerror?: (event?: unknown) => void;
  onupgradeneeded?: (event?: unknown) => void;
  result?: unknown;
  error?: Error;
};

function createSuccessRequest(result?: unknown): RequestLike {
  const req: RequestLike = {};
  queueMicrotask(() => {
    req.result = result;
    req.onsuccess?.({ target: req });
  });
  return req;
}

function createErrorRequest(error: Error): RequestLike {
  const req: RequestLike = {};
  queueMicrotask(() => {
    req.error = error;
    req.onerror?.({ target: req });
  });
  return req;
}

function setupIndexedDB(options?: {
  countResult?: number;
  addError?: Error;
  countError?: Error;
  deleteError?: Error;
  hasContactFormsStore?: boolean;
  hasOfflineStore?: boolean;
}) {
  const store = {
    add: jest.fn(() =>
      options?.addError
        ? createErrorRequest(options.addError)
        : createSuccessRequest(1),
    ),
    count: jest.fn(() =>
      options?.countError
        ? createErrorRequest(options.countError)
        : createSuccessRequest(options?.countResult ?? 0),
    ),
    delete: jest.fn(() =>
      options?.deleteError
        ? createErrorRequest(options.deleteError)
        : createSuccessRequest(undefined),
    ),
  };

  const tx = {
    objectStore: jest.fn(() => store),
  };

  const db = {
    objectStoreNames: {
      contains: jest.fn((name: string) => {
        if (name === "contact-forms")
          return Boolean(options?.hasContactFormsStore);
        if (name === "offline-submissions")
          return Boolean(options?.hasOfflineStore);
        return false;
      }),
    },
    createObjectStore: jest.fn(),
    transaction: jest.fn(() => tx),
  };

  const open = jest.fn(() => {
    const req: RequestLike = {};
    queueMicrotask(() => {
      req.onupgradeneeded?.({ target: { result: db } });
      req.result = db;
      req.onsuccess?.({ target: req });
    });
    return req;
  });

  Object.defineProperty(global, "indexedDB", {
    configurable: true,
    value: { open },
  });

  return { open, db, tx, store };
}

describe("offline queue", () => {
  const originalServiceWorker = navigator.serviceWorker;
  const originalSyncManager = (window as Window & { SyncManager?: unknown })
    .SyncManager;

  beforeEach(() => {
    jest.clearAllMocks();

    Object.defineProperty(navigator, "serviceWorker", {
      configurable: true,
      value: undefined,
    });

    delete (window as Window & { SyncManager?: unknown }).SyncManager;
  });

  afterEach(() => {
    Object.defineProperty(navigator, "serviceWorker", {
      configurable: true,
      value: originalServiceWorker,
    });

    if (originalSyncManager) {
      (window as Window & { SyncManager?: unknown }).SyncManager =
        originalSyncManager;
    } else {
      delete (window as Window & { SyncManager?: unknown }).SyncManager;
    }
  });

  it("saves submission and registers background sync when supported", async () => {
    const { open, db, tx, store } = setupIndexedDB();
    const register = jest.fn().mockResolvedValue(undefined);

    Object.defineProperty(navigator, "serviceWorker", {
      configurable: true,
      value: { ready: Promise.resolve({ sync: { register } }) },
    });
    (window as Window & { SyncManager?: unknown }).SyncManager = function () {
      return;
    };

    await saveOfflineSubmission("/api/contact", { name: "Alex" });

    expect(open).toHaveBeenCalledWith("MHConstructionDB", 1);
    expect(db.createObjectStore).toHaveBeenCalledWith("contact-forms", {
      keyPath: "id",
      autoIncrement: true,
    });
    expect(db.createObjectStore).toHaveBeenCalledWith("offline-submissions", {
      keyPath: "id",
      autoIncrement: true,
    });
    expect(db.transaction).toHaveBeenCalledWith(
      ["offline-submissions"],
      "readwrite",
    );
    expect(tx.objectStore).toHaveBeenCalledWith("offline-submissions");
    expect(store.add).toHaveBeenCalledWith(
      expect.objectContaining({
        endpoint: "/api/contact",
        data: { name: "Alex" },
        queuedAt: expect.any(String),
      }),
    );
    expect(register).toHaveBeenCalledWith("background-sync");
  });

  it("does not throw when background sync registration fails", async () => {
    setupIndexedDB();
    const register = jest.fn().mockRejectedValue(new Error("unsupported"));

    Object.defineProperty(navigator, "serviceWorker", {
      configurable: true,
      value: { ready: Promise.resolve({ sync: { register } }) },
    });
    (window as Window & { SyncManager?: unknown }).SyncManager = function () {
      return;
    };

    await expect(
      saveOfflineSubmission("/api/contact", { id: 1 }),
    ).resolves.toBeUndefined();
    expect(register).toHaveBeenCalledWith("background-sync");
  });

  it("skips sync registration when APIs are unavailable", async () => {
    const { store } = setupIndexedDB({
      hasContactFormsStore: true,
      hasOfflineStore: true,
    });

    await saveOfflineSubmission("/api/forms", { foo: "bar" });

    expect(store.add).toHaveBeenCalledTimes(1);
  });

  it("returns pending queue count", async () => {
    const { db, tx, store } = setupIndexedDB({ countResult: 7 });

    await expect(getPendingCount()).resolves.toBe(7);

    expect(db.transaction).toHaveBeenCalledWith(
      ["offline-submissions"],
      "readonly",
    );
    expect(tx.objectStore).toHaveBeenCalledWith("offline-submissions");
    expect(store.count).toHaveBeenCalledTimes(1);
  });

  it("deletes a queued submission by id", async () => {
    const { db, tx, store } = setupIndexedDB();

    await expect(deleteOfflineSubmission(42)).resolves.toBeUndefined();

    expect(db.transaction).toHaveBeenCalledWith(
      ["offline-submissions"],
      "readwrite",
    );
    expect(tx.objectStore).toHaveBeenCalledWith("offline-submissions");
    expect(store.delete).toHaveBeenCalledWith(42);
  });

  it("propagates IndexedDB operation errors", async () => {
    const addError = new Error("add failed");
    const countError = new Error("count failed");
    const deleteError = new Error("delete failed");

    setupIndexedDB({ addError });
    await expect(saveOfflineSubmission("/api/contact", {})).rejects.toThrow(
      "add failed",
    );

    setupIndexedDB({ countError });
    await expect(getPendingCount()).rejects.toThrow("count failed");

    setupIndexedDB({ deleteError });
    await expect(deleteOfflineSubmission(9)).rejects.toThrow("delete failed");
  });
});
