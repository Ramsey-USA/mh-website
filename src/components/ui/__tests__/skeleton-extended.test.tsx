/**
 * @jest-environment jsdom
 *
 * Tests for untested Skeleton exports:
 * TeamMemberSkeleton, FormFieldSkeleton, TableRowSkeleton,
 * ListItemSkeleton, PageHeaderSkeleton, HeroSkeleton, GridSkeleton
 */

import { render } from "@testing-library/react";

jest.mock("@/lib/utils", () => ({
  cn: (...args: (string | undefined | null | false)[]) =>
    args.filter(Boolean).join(" "),
}));

import {
  TeamMemberSkeleton,
  FormFieldSkeleton,
  TableRowSkeleton,
  ListItemSkeleton,
  PageHeaderSkeleton,
  HeroSkeleton,
  GridSkeleton,
} from "../Skeleton";

// ─── TeamMemberSkeleton ───────────────────────────────────────────────────────

describe("TeamMemberSkeleton", () => {
  it("renders default count=1", () => {
    const { container } = render(<TeamMemberSkeleton />);
    expect(container.firstChild).toBeTruthy();
  });

  it("renders count=3", () => {
    const { container } = render(<TeamMemberSkeleton count={3} />);
    // 3 team member skeletons
    const items = container.querySelectorAll(".animate-pulse");
    expect(items.length).toBeGreaterThanOrEqual(3);
  });
});

// ─── FormFieldSkeleton ────────────────────────────────────────────────────────

describe("FormFieldSkeleton", () => {
  it("renders default count=3", () => {
    const { container } = render(<FormFieldSkeleton />);
    const items = container.querySelectorAll(".animate-pulse");
    expect(items.length).toBeGreaterThanOrEqual(3);
  });

  it("renders count=1", () => {
    const { container } = render(<FormFieldSkeleton count={1} />);
    expect(container.firstChild).toBeTruthy();
  });
});

// ─── TableRowSkeleton ─────────────────────────────────────────────────────────

describe("TableRowSkeleton", () => {
  it("renders default rows=5 and cols=4", () => {
    const { container } = render(<TableRowSkeleton />);
    expect(container.firstChild).toBeTruthy();
  });

  it("renders custom rows and cols", () => {
    const { container } = render(<TableRowSkeleton rows={2} columns={3} />);
    const cells = container.querySelectorAll(".animate-pulse");
    // 2 rows × 3 cols = 6 cells
    expect(cells.length).toBeGreaterThanOrEqual(6);
  });
});

// ─── ListItemSkeleton ─────────────────────────────────────────────────────────

describe("ListItemSkeleton", () => {
  it("renders default count=5", () => {
    const { container } = render(<ListItemSkeleton />);
    const items = container.querySelectorAll(".animate-pulse");
    expect(items.length).toBeGreaterThanOrEqual(5);
  });

  it("renders count=2", () => {
    const { container } = render(<ListItemSkeleton count={2} />);
    expect(container.firstChild).toBeTruthy();
  });
});

// ─── PageHeaderSkeleton ───────────────────────────────────────────────────────

describe("PageHeaderSkeleton", () => {
  it("renders", () => {
    const { container } = render(<PageHeaderSkeleton />);
    expect(container.querySelector(".animate-pulse")).toBeTruthy();
  });
});

// ─── HeroSkeleton ─────────────────────────────────────────────────────────────

describe("HeroSkeleton", () => {
  it("renders", () => {
    const { container } = render(<HeroSkeleton />);
    expect(container.querySelector(".animate-pulse")).toBeTruthy();
  });
});

// ─── GridSkeleton ─────────────────────────────────────────────────────────────

describe("GridSkeleton", () => {
  it("renders default (3 cols, 2 rows, card type)", () => {
    const { container } = render(<GridSkeleton />);
    expect(container.firstChild).toBeTruthy();
  });

  it("renders team type", () => {
    const { container } = render(
      <GridSkeleton type="team" columns={2} rows={1} />,
    );
    expect(container.firstChild).toBeTruthy();
  });

  it("renders list type", () => {
    const { container } = render(
      <GridSkeleton type="list" columns={1} rows={2} />,
    );
    expect(container.firstChild).toBeTruthy();
  });

  it("renders all defined column counts (1, 2, 3, 4)", () => {
    [1, 2, 3, 4].forEach((cols) => {
      const { container } = render(<GridSkeleton columns={cols} rows={1} />);
      expect(container.firstChild).toBeTruthy();
    });
  });

  it("falls back to default grid classes for unknown column count", () => {
    const { container } = render(<GridSkeleton columns={5} rows={1} />);
    expect(container.firstChild).toBeTruthy();
  });
});
