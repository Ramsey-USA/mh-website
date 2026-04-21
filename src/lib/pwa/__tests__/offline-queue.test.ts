/**
 * @jest-environment jsdom
 *
 * Tests for lib/pwa/offline-queue.ts
 *
 * jsdom does not provide a real IndexedDB implementation.
 * We mount a lightweight in-memory mock that mirrors the IDB request/event
 * contract used by the module and test the public API surface.
 */

// ── Minimal in-memory IndexedDB mock ─────────────────────────────────────────

class MockIDBRequest<T = unknown> extends EventTarget {
  result: T | undefined;
  error: DOMException | null = null;
  readyState: "pending" | "done" = "pending";

  _resolve(value: T) {
    this.result = value;
    this.readyState = "done";
    this.dispatchEvent(new Event("success"));
    if (typeof this.onsuccess === "function") {
      this.onsuccess({ target: this } as unknown as Event);
    }
  }

  _reject(err: DOMException) {
    this.error = err;
    this.readyState = "done";
    this.dispatchEvent(new Event("error"));
    if (typeof this.onerror === "function") {
      this.onerror({ target: this } as unknown as Event);
    }
  }

  onsuccess: ((event: Event) => void) | null = null;
  onerror: ((event: Event) => void) | null = null;
}

class MockStore {
  private _items: Map<number, unknown> = new Map();
  private _nextId = 1;

  add(entry: unknown): MockIDBRequest<number> {
    const req = new MockIDBRequest<number>();
    const id = this._nextId++;
    this._items.set(id, entry);
    Promise.resolve().then(() => req._resolve(id));
    return req;
  }

  count(): MockIDBRequest<number> {
    const req = new MockIDBRequest<number>();
    Promise.resolve().then(() => req._resolve(this._items.size));
    return req;
  }

  delete(id: number): MockIDBRequest<undefined> {
    const req = new MockIDBRequest<undefined>();
    this._items.delete(id);
    Promise.resolve().then(() => req._resolve(undefined));
    return req;
  }
}

class MockTransaction {
  private _stores: Map<string, MockStore>;
  constructor(storeNames: string[], stores: Map<string, MockStore>) {
    this._stores = stores;
    // Ensure each requested store exists
    storeNames.forEach((name) => {
      if (!stores.has(name)) stores.set(name, new MockStore());
    });
  }

  objectStore(name: string): MockStore {
    return this._stores.get(name)!;
  }
}

const globalStores = new Map<string, MockStore>();
globalStores.set("offline-submissions", new MockStore());
globalStores.set("contact-forms", new MockStore());

class MockIDBDatabase extends EventTarget {
  objectStoreNames = {
    contains: (name: string) => globalStores.has(name),
  };

  transaction(storeNames: string[]): MockTransaction {
    return new MockTransaction(storeNames, globalStores);
  }
}

// Wire up the global indexedDB open mock
const mockOpen = jest.fn((_name: string, _version: number) => {
  const req = new MockIDBRequest<MockIDBDatabase>();
  Promise.resolve().then(() => req._resolve(new MockIDBDatabase()));
  return req;
});

Object.defineProperty(global, "indexedDB", {
  value: { open: mockOpen },
  configurable: true,
  writable: true,
});

// ── Tests ─────────────────────────────────────────────────────────────────────

import {
  saveOfflineSubmission,
  getPendingCount,
  deleteOfflineSubmission,
} from "@/lib/pwa/offline-queue";

describe("offline-queue", () => {
  beforeEach(() => {
    // Reset the store for each test
    globalStores.set("offline-submissions", new MockStore());
    globalStores.set("contact-forms", new MockStore());
  });

  it("getPendingCount() returns 0 on a fresh database", async () => {
    const count = await getPendingCount();
    expect(count).toBe(0);
  });

  it("saveOfflineSubmission() increments the pending count", async () => {
    await saveOfflineSubmission("/api/contact", { name: "Alice" });
    const count = await getPendingCount();
    expect(count).toBe(1);
  });

  it("adding multiple entries reflects the updated count", async () => {
    await saveOfflineSubmission("/api/contact", { name: "Alice" });
    await saveOfflineSubmission("/api/consultation", { name: "Bob" });
    const count = await getPendingCount();
    expect(count).toBe(2);
  });

  it("deleteOfflineSubmission() removes an entry and count decreases", async () => {
    // Insert one entry
    await saveOfflineSubmission("/api/delete-test", { x: 1 });
    expect(await getPendingCount()).toBe(1);

    // IDB auto-increment starts at 1 for our mock
    await deleteOfflineSubmission(1);
    expect(await getPendingCount()).toBe(0);
  });
});

// ─── onupgradeneeded path ─────────────────────────────────────────────────────

describe("offline-queue — onupgradeneeded", () => {
  it("invokes onupgradeneeded and creates object stores when DB does not exist", async () => {
    const createdStores: string[] = [];

    const mockDBForUpgrade = {
      objectStoreNames: { contains: (_name: string) => false },
      createObjectStore: jest.fn((name: string) => {
        createdStores.push(name);
      }),
    };

    // Supply an onupgradeneeded-aware mock
    const openWithUpgrade = jest.fn((_name: string, _version: number) => {
      const req = new MockIDBRequest<MockIDBDatabase>();
      // Fire onupgradeneeded synchronously before resolving
      Promise.resolve().then(() => {
        const asRecord = req as unknown as Record<string, unknown>;
        if (typeof asRecord["onupgradeneeded"] === "function") {
          const handler = asRecord["onupgradeneeded"] as (e: {
            target: unknown;
          }) => void;
          handler({ target: { result: mockDBForUpgrade } });
        }
        req._resolve(new MockIDBDatabase());
      });
      return req;
    });

    Object.defineProperty(global, "indexedDB", {
      value: { open: openWithUpgrade },
      configurable: true,
      writable: true,
    });

    await getPendingCount();

    expect(mockDBForUpgrade.createObjectStore).toHaveBeenCalledWith(
      "contact-forms",
      expect.objectContaining({ autoIncrement: true }),
    );
    expect(mockDBForUpgrade.createObjectStore).toHaveBeenCalledWith(
      "offline-submissions",
      expect.objectContaining({ autoIncrement: true }),
    );

    // Restore original mock
    Object.defineProperty(global, "indexedDB", {
      value: { open: mockOpen },
      configurable: true,
      writable: true,
    });
  });

  it("skips createObjectStore when stores already exist (onupgradeneeded with contains=true)", async () => {
    const mockDBForUpgrade = {
      objectStoreNames: { contains: (_name: string) => true },
      createObjectStore: jest.fn(),
    };

    const openWithUpgrade = jest.fn((_name: string, _version: number) => {
      const req = new MockIDBRequest<MockIDBDatabase>();
      Promise.resolve().then(() => {
        const asRecord = req as unknown as Record<string, unknown>;
        if (typeof asRecord["onupgradeneeded"] === "function") {
          const handler = asRecord["onupgradeneeded"] as (e: {
            target: unknown;
          }) => void;
          handler({ target: { result: mockDBForUpgrade } });
        }
        req._resolve(new MockIDBDatabase());
      });
      return req;
    });

    Object.defineProperty(global, "indexedDB", {
      value: { open: openWithUpgrade },
      configurable: true,
      writable: true,
    });

    await getPendingCount();

    expect(mockDBForUpgrade.createObjectStore).not.toHaveBeenCalled();

    Object.defineProperty(global, "indexedDB", {
      value: { open: mockOpen },
      configurable: true,
      writable: true,
    });
  });
});

// ─── SyncManager / background sync path ──────────────────────────────────────

describe("offline-queue — background sync registration", () => {
  afterEach(() => {
    // Reset stores and restore navigator.serviceWorker
    globalStores.set("offline-submissions", new MockStore());
    globalStores.set("contact-forms", new MockStore());
    Object.defineProperty(global, "indexedDB", {
      value: { open: mockOpen },
      configurable: true,
      writable: true,
    });
  });

  it("registers background-sync tag when SyncManager and serviceWorker are available", async () => {
    const syncRegister = jest.fn().mockResolvedValue(undefined);
    const mockRegistration = { sync: { register: syncRegister } };

    Object.defineProperty(window, "SyncManager", {
      value: class SyncManager {},
      configurable: true,
      writable: true,
    });
    Object.defineProperty(navigator, "serviceWorker", {
      value: {
        ready: Promise.resolve(mockRegistration),
      },
      configurable: true,
      writable: true,
    });

    await saveOfflineSubmission("/api/test", { a: 1 });

    expect(syncRegister).toHaveBeenCalledWith("background-sync");
  });

  it("does not throw when sync.register() rejects (browser limitation)", async () => {
    const syncRegister = jest
      .fn()
      .mockRejectedValue(new Error("Sync not supported"));
    const mockRegistration = { sync: { register: syncRegister } };

    Object.defineProperty(window, "SyncManager", {
      value: class SyncManager {},
      configurable: true,
      writable: true,
    });
    Object.defineProperty(navigator, "serviceWorker", {
      value: {
        ready: Promise.resolve(mockRegistration),
      },
      configurable: true,
      writable: true,
    });

    await expect(
      saveOfflineSubmission("/api/test", { b: 2 }),
    ).resolves.not.toThrow();
  });
});
