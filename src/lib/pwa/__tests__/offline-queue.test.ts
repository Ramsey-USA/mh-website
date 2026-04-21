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
