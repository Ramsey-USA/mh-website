/**
 * @jest-environment node
 */

jest.mock("@/lib/utils/logger", () => ({
  logger: {
    debug: jest.fn(),
    error: jest.fn(),
  },
}));

import {
  DbClient,
  createDbClient,
  getDb,
  type D1PreparedStatement,
} from "../client";
import { logger } from "@/lib/utils/logger";

function makePreparedStatement(
  overrides?: Partial<D1PreparedStatement>,
): D1PreparedStatement {
  const stmt: D1PreparedStatement = {
    bind: jest.fn(() => stmt),
    first: jest.fn(),
    run: jest.fn(),
    all: jest.fn(),
    raw: jest.fn(),
    ...overrides,
  };
  return stmt;
}

describe("db client helpers", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("getDb throws when DB binding is missing", () => {
    expect(() => getDb({})).toThrow(/D1 database binding not found/i);
  });

  it("createDbClient returns a DbClient instance", () => {
    const db = {
      prepare: jest.fn(),
      dump: jest.fn(),
      batch: jest.fn(),
      exec: jest.fn(),
    };
    expect(createDbClient({ DB: db }) instanceof DbClient).toBe(true);
  });
});

describe("DbClient", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("query returns rows and binds parameters when provided", async () => {
    const stmt = makePreparedStatement({
      all: jest.fn().mockResolvedValue({
        success: true,
        results: [{ id: "1" }],
        meta: { duration: 1, rows_read: 1, rows_written: 0 },
      }),
    });
    const db = {
      prepare: jest.fn(() => stmt),
      dump: jest.fn(),
      batch: jest.fn(),
      exec: jest.fn(),
    };

    const client = new DbClient(db);
    const rows = await client.query("SELECT * FROM users WHERE id = ?", "1");

    expect(rows).toEqual([{ id: "1" }]);
    expect(stmt.bind).toHaveBeenCalledWith("1");
    expect(logger.debug).toHaveBeenCalled();
  });

  it("query throws when the result is unsuccessful", async () => {
    const stmt = makePreparedStatement({
      all: jest.fn().mockResolvedValue({
        success: false,
        error: "Query failed",
        meta: { duration: 1, rows_read: 0, rows_written: 0 },
      }),
    });
    const client = new DbClient({
      prepare: jest.fn(() => stmt),
      dump: jest.fn(),
      batch: jest.fn(),
      exec: jest.fn(),
    });

    await expect(client.query("SELECT 1")).rejects.toThrow("Query failed");
    expect(logger.error).toHaveBeenCalled();
  });

  it("queryOne returns the first row or null", async () => {
    const stmt = makePreparedStatement({
      first: jest.fn().mockResolvedValue({ id: "abc" }),
    });
    const client = new DbClient({
      prepare: jest.fn(() => stmt),
      dump: jest.fn(),
      batch: jest.fn(),
      exec: jest.fn(),
    });

    await expect(client.queryOne("SELECT * FROM t")).resolves.toEqual({
      id: "abc",
    });
  });

  it("execute returns success and rowsAffected", async () => {
    const stmt = makePreparedStatement({
      run: jest.fn().mockResolvedValue({
        success: true,
        meta: { duration: 1, rows_read: 0, rows_written: 2 },
      }),
    });
    const client = new DbClient({
      prepare: jest.fn(() => stmt),
      dump: jest.fn(),
      batch: jest.fn(),
      exec: jest.fn(),
    });

    await expect(client.execute("UPDATE t SET x = 1")).resolves.toEqual({
      success: true,
      rowsAffected: 2,
    });
  });

  it("batch throws when any statement fails", async () => {
    const stmt = makePreparedStatement();
    const client = new DbClient({
      prepare: jest.fn(() => stmt),
      dump: jest.fn(),
      batch: jest.fn().mockResolvedValue([
        { success: true, meta: { duration: 1, rows_read: 0, rows_written: 1 } },
        {
          success: false,
          error: "batch failed",
          meta: { duration: 1, rows_read: 0, rows_written: 0 },
        },
      ]),
      exec: jest.fn(),
    });

    await expect(
      client.batch([
        { sql: "INSERT INTO t VALUES (?)", params: [1] },
        { sql: "INSERT INTO t VALUES (?)", params: [2] },
      ]),
    ).rejects.toThrow("batch failed");
  });

  it("insert rejects invalid table names and invalid-only column sets", async () => {
    const client = new DbClient({
      prepare: jest.fn(),
      dump: jest.fn(),
      batch: jest.fn(),
      exec: jest.fn(),
    } as never);

    await expect(client.insert("users;DROP", { name: "x" })).rejects.toThrow(
      /Invalid table name/i,
    );
    await expect(
      client.insert("users", { "bad-column!": "x" }),
    ).rejects.toThrow(/No valid column names/i);
  });

  it("insert generates an id when one is not provided", async () => {
    const randomUuid = jest
      .spyOn(globalThis.crypto, "randomUUID")
      .mockReturnValue("uuid-123");
    const stmt = makePreparedStatement({
      run: jest.fn().mockResolvedValue({
        success: true,
        meta: { duration: 1, rows_read: 0, rows_written: 1 },
      }),
    });
    const db = {
      prepare: jest.fn(() => stmt),
      dump: jest.fn(),
      batch: jest.fn(),
      exec: jest.fn(),
    };
    const client = new DbClient(db);

    await expect(client.insert("users", { name: "Jane" })).resolves.toBe(
      "uuid-123",
    );
    expect(db.prepare).toHaveBeenCalledWith(
      expect.stringContaining("INSERT INTO users"),
    );
    randomUuid.mockRestore();
  });

  it("update and delete return booleans based on affected rows", async () => {
    const stmt = makePreparedStatement({
      run: jest
        .fn()
        .mockResolvedValueOnce({
          success: true,
          meta: { duration: 1, rows_read: 0, rows_written: 1 },
        })
        .mockResolvedValueOnce({
          success: true,
          meta: { duration: 1, rows_read: 0, rows_written: 0 },
        }),
    });
    const client = new DbClient({
      prepare: jest.fn(() => stmt),
      dump: jest.fn(),
      batch: jest.fn(),
      exec: jest.fn(),
    });

    await expect(
      client.update("users", "id-1", { email: "a@b.com" }),
    ).resolves.toBe(true);
    await expect(client.delete("users", "id-1")).resolves.toBe(false);
  });

  it("exists and count validate identifiers and return query-derived results", async () => {
    const client = new DbClient({
      prepare: jest.fn(),
      dump: jest.fn(),
      batch: jest.fn(),
      exec: jest.fn(),
    } as never);

    const queryOne = jest
      .spyOn(client, "queryOne")
      .mockResolvedValueOnce({ id: "1" })
      .mockResolvedValueOnce({ count: 4 });

    await expect(client.exists("users", "1")).resolves.toBe(true);
    await expect(
      client.count("users", { column: "role", value: "admin" }),
    ).resolves.toBe(4);
    await expect(
      client.count("users", { column: "bad-column!", value: 1 }),
    ).rejects.toThrow(/Invalid column name/i);

    queryOne.mockRestore();
  });

  it("query without params does not call bind", async () => {
    const stmt = makePreparedStatement({
      all: jest.fn().mockResolvedValue({
        success: true,
        results: [{ id: "1" }],
        meta: { duration: 1, rows_read: 1, rows_written: 0 },
      }),
    });
    const db = {
      prepare: jest.fn(() => stmt),
      dump: jest.fn(),
      batch: jest.fn(),
      exec: jest.fn(),
    };
    const client = new DbClient(db);

    await client.query("SELECT * FROM users");
    expect(stmt.bind).not.toHaveBeenCalled();
  });

  it("queryOne without params does not call bind", async () => {
    const stmt = makePreparedStatement({
      first: jest.fn().mockResolvedValue(null),
    });
    const client = new DbClient({
      prepare: jest.fn(() => stmt),
      dump: jest.fn(),
      batch: jest.fn(),
      exec: jest.fn(),
    });

    await client.queryOne("SELECT 1");
    expect(stmt.bind).not.toHaveBeenCalled();
  });

  it("execute without params does not call bind", async () => {
    const stmt = makePreparedStatement({
      run: jest.fn().mockResolvedValue({
        success: true,
        meta: { duration: 1, rows_read: 0, rows_written: 0 },
      }),
    });
    const client = new DbClient({
      prepare: jest.fn(() => stmt),
      dump: jest.fn(),
      batch: jest.fn(),
      exec: jest.fn(),
    });

    await client.execute("DELETE FROM temp");
    expect(stmt.bind).not.toHaveBeenCalled();
  });

  it("count without where clause returns total row count", async () => {
    const client = new DbClient({
      prepare: jest.fn(),
      dump: jest.fn(),
      batch: jest.fn(),
      exec: jest.fn(),
    } as never);

    jest.spyOn(client, "queryOne").mockResolvedValueOnce({ count: 10 });
    await expect(client.count("users")).resolves.toBe(10);
  });

  it("count returns 0 when queryOne returns null", async () => {
    const client = new DbClient({
      prepare: jest.fn(),
      dump: jest.fn(),
      batch: jest.fn(),
      exec: jest.fn(),
    } as never);

    jest.spyOn(client, "queryOne").mockResolvedValueOnce(null);
    await expect(client.count("users")).resolves.toBe(0);
  });

  it("count rejects invalid table names", async () => {
    const client = new DbClient({
      prepare: jest.fn(),
      dump: jest.fn(),
      batch: jest.fn(),
      exec: jest.fn(),
    } as never);

    await expect(client.count("bad;table")).rejects.toThrow(
      /Invalid table name/i,
    );
  });

  it("exists rejects invalid table names", async () => {
    const client = new DbClient({
      prepare: jest.fn(),
      dump: jest.fn(),
      batch: jest.fn(),
      exec: jest.fn(),
    } as never);

    await expect(client.exists("bad;table", "1")).rejects.toThrow(
      /Invalid table name/i,
    );
  });

  it("delete rejects invalid table names", async () => {
    const client = new DbClient({
      prepare: jest.fn(),
      dump: jest.fn(),
      batch: jest.fn(),
      exec: jest.fn(),
    } as never);

    await expect(client.delete("bad;table", "1")).rejects.toThrow(
      /Invalid table name/i,
    );
  });

  it("update rejects when no valid column names are provided", async () => {
    const client = new DbClient({
      prepare: jest.fn(),
      dump: jest.fn(),
      batch: jest.fn(),
      exec: jest.fn(),
    } as never);

    await expect(
      client.update("users", "1", { "bad-col!": "x" }),
    ).rejects.toThrow(/No valid column names/i);
  });

  it("queryOne throws and logs on error", async () => {
    const stmt = makePreparedStatement({
      first: jest.fn().mockRejectedValue(new Error("DB down")),
    });
    const client = new DbClient({
      prepare: jest.fn(() => stmt),
      dump: jest.fn(),
      batch: jest.fn(),
      exec: jest.fn(),
    });

    await expect(client.queryOne("SELECT 1")).rejects.toThrow("DB down");
    expect(logger.error).toHaveBeenCalled();
  });

  it("execute throws and logs on error", async () => {
    const stmt = makePreparedStatement({
      run: jest.fn().mockRejectedValue(new Error("DB write failed")),
    });
    const client = new DbClient({
      prepare: jest.fn(() => stmt),
      dump: jest.fn(),
      batch: jest.fn(),
      exec: jest.fn(),
    });

    await expect(client.execute("UPDATE t SET x = 1")).rejects.toThrow(
      "DB write failed",
    );
    expect(logger.error).toHaveBeenCalled();
  });

  it("batch without params in a statement does not call bind", async () => {
    const stmt = makePreparedStatement();
    const db = {
      prepare: jest.fn(() => stmt),
      dump: jest.fn(),
      batch: jest.fn().mockResolvedValue([
        {
          success: true,
          meta: { duration: 1, rows_read: 0, rows_written: 1 },
        },
      ]),
      batch: jest
        .fn()
        .mockResolvedValue([
          {
            success: true,
            meta: { duration: 1, rows_read: 0, rows_written: 1 },
          },
        ]),
      exec: jest.fn(),
    };
    const client = new DbClient(db);

    await client.batch([{ sql: "DELETE FROM temp" }]);
    expect(stmt.bind).not.toHaveBeenCalled();
  });

  it("query returns empty array when results is undefined", async () => {
    const stmt = makePreparedStatement({
      all: jest.fn().mockResolvedValue({
        success: true,
        meta: { duration: 1, rows_read: 0, rows_written: 0 },
      }),
    });
    const client = new DbClient({
      prepare: jest.fn(() => stmt),
      dump: jest.fn(),
      batch: jest.fn(),
      exec: jest.fn(),
    });

    const rows = await client.query("SELECT * FROM empty_table");
    expect(rows).toEqual([]);
  });
});
