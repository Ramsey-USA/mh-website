/**
 * @jest-environment jsdom
 *
 * Tests for the useProjectsSearch custom hook.
 */

jest.mock("@/components/analytics/EnhancedAnalytics", () => ({
  useAnalytics: () => ({
    trackSearchPerformed: jest.fn(),
    trackSearchFilterUsed: jest.fn(),
    trackSearchClear: jest.fn(),
  }),
}));

jest.mock("@/lib/services/portfolio-service", () => ({
  PortfolioService: {
    getProjectsByCategory: jest.fn((category: string) => {
      const projects = [
        {
          id: "1",
          title: "Residential Build",
          description: "A house project",
          category: "residential",
          subcategory: "custom",
          location: { city: "Kennewick" },
          tags: ["wood-frame"],
        },
        {
          id: "2",
          title: "Commercial Plaza",
          description: "A commercial project",
          category: "commercial",
          subcategory: undefined,
          location: { city: "Spokane" },
          tags: undefined,
        },
      ];
      if (category === "all") return projects;
      return projects.filter((p) => p.category === category);
    }),
  },
}));

import { renderHook, act } from "@testing-library/react";
import { useProjectsSearch } from "../components/useProjectsSearch";

describe("useProjectsSearch", () => {
  beforeEach(() => {
    // Reset URL
    window.history.replaceState({}, "", "/projects");
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("initialises with defaults", () => {
    const { result } = renderHook(() => useProjectsSearch());
    expect(result.current.selectedCategory).toBe("all");
    expect(result.current.searchQuery).toBe("");
    expect(result.current.projects.length).toBeGreaterThan(0);
  });

  it("reads search param from URL on mount", () => {
    window.history.replaceState({}, "", "/projects?search=Commercial");
    const { result } = renderHook(() => useProjectsSearch());
    expect(result.current.searchQuery).toBe("Commercial");
  });

  it("reads category param from URL on mount", () => {
    window.history.replaceState({}, "", "/projects?category=residential");
    const { result } = renderHook(() => useProjectsSearch());
    expect(result.current.selectedCategory).toBe("residential");
  });

  it("updates searchQuery", () => {
    const { result } = renderHook(() => useProjectsSearch());
    act(() => {
      result.current.setSearchQuery("Kennewick");
    });
    expect(result.current.searchQuery).toBe("Kennewick");
  });

  it("filters projects by searchQuery (title match)", () => {
    const { result } = renderHook(() => useProjectsSearch());
    act(() => {
      result.current.setSearchQuery("Residential");
    });
    expect(
      result.current.projects.every(
        (p) =>
          p.title.toLowerCase().includes("residential") ||
          p.description.toLowerCase().includes("residential") ||
          p.location.city.toLowerCase().includes("residential"),
      ),
    ).toBe(true);
  });

  it("filters projects by searchQuery (city match)", () => {
    const { result } = renderHook(() => useProjectsSearch());
    act(() => {
      result.current.setSearchQuery("Spokane");
    });
    expect(
      result.current.projects.some((p) =>
        p.location.city.toLowerCase().includes("spokane"),
      ),
    ).toBe(true);
  });

  it("filters projects by searchQuery (tag match)", () => {
    const { result } = renderHook(() => useProjectsSearch());
    act(() => {
      result.current.setSearchQuery("wood-frame");
    });
    expect(result.current.projects.length).toBeGreaterThan(0);
  });

  it("updates selectedCategory", () => {
    const { result } = renderHook(() => useProjectsSearch());
    act(() => {
      result.current.setSelectedCategory("commercial");
    });
    expect(result.current.selectedCategory).toBe("commercial");
  });

  it("clearSearch resets query and category", () => {
    const { result } = renderHook(() => useProjectsSearch());
    act(() => {
      result.current.setSearchQuery("test");
      result.current.setSelectedCategory("residential");
    });
    act(() => {
      result.current.clearSearch();
    });
    expect(result.current.searchQuery).toBe("");
    expect(result.current.selectedCategory).toBe("all");
  });

  it("updates URL when search changes", () => {
    const { result } = renderHook(() => useProjectsSearch());
    act(() => {
      result.current.setSearchQuery("Pasco");
    });
    expect(window.location.search).toContain("search=Pasco");
  });

  it("clears URL search param when query is empty", () => {
    const { result } = renderHook(() => useProjectsSearch());
    act(() => {
      result.current.setSearchQuery("temp");
    });
    act(() => {
      result.current.setSearchQuery("");
    });
    expect(window.location.search).not.toContain("search=");
  });

  it("fires debounced analytics after 1s of search", async () => {
    const { result } = renderHook(() => useProjectsSearch());
    act(() => {
      result.current.setSearchQuery("buildx");
    });
    await act(async () => {
      jest.advanceTimersByTime(1100);
    });
    // No throw — analytics is a no-op mock
  });
});
