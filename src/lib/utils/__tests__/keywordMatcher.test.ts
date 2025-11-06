import {
  matchesKeywords,
  matchesAllKeywords,
  countMatchedKeywords,
} from "../keywordMatcher";

describe("keywordMatcher", () => {
  describe("matchesKeywords", () => {
    it("should return true when any keyword is found", () => {
      expect(matchesKeywords("hello world", ["hello"])).toBe(true);
      expect(matchesKeywords("hello world", ["world"])).toBe(true);
      expect(matchesKeywords("hello world", ["hello", "world"])).toBe(true);
    });

    it("should return false when no keywords are found", () => {
      expect(matchesKeywords("hello world", ["foo"])).toBe(false);
      expect(matchesKeywords("hello world", ["foo", "bar"])).toBe(false);
    });

    it("should be case-insensitive", () => {
      expect(matchesKeywords("Hello World", ["hello"])).toBe(true);
      expect(matchesKeywords("HELLO WORLD", ["world"])).toBe(true);
    });

    it("should handle empty input", () => {
      expect(matchesKeywords("", ["hello"])).toBe(false);
    });

    it("should handle empty keywords", () => {
      expect(matchesKeywords("hello world", [])).toBe(false);
    });
  });

  describe("matchesAllKeywords", () => {
    it("should return true when all keywords are found", () => {
      expect(matchesAllKeywords("hello world", ["hello", "world"])).toBe(true);
      expect(matchesAllKeywords("foo bar baz", ["foo", "bar", "baz"])).toBe(
        true,
      );
    });

    it("should return false when not all keywords are found", () => {
      expect(matchesAllKeywords("hello world", ["hello", "foo"])).toBe(false);
      expect(matchesAllKeywords("hello world", ["foo", "bar"])).toBe(false);
    });

    it("should be case-insensitive", () => {
      expect(matchesAllKeywords("Hello World", ["hello", "world"])).toBe(true);
    });

    it("should handle empty keywords", () => {
      expect(matchesAllKeywords("hello world", [])).toBe(true);
    });
  });

  describe("countMatchedKeywords", () => {
    it("should count matched keywords correctly", () => {
      expect(countMatchedKeywords("hello world", ["hello", "world"])).toBe(2);
      expect(countMatchedKeywords("hello world", ["hello"])).toBe(1);
      expect(countMatchedKeywords("hello world", ["foo"])).toBe(0);
    });

    it("should not count duplicate matches", () => {
      expect(countMatchedKeywords("hello hello", ["hello"])).toBe(1);
    });

    it("should be case-insensitive", () => {
      expect(countMatchedKeywords("Hello World", ["hello", "world"])).toBe(2);
    });

    it("should handle empty input", () => {
      expect(countMatchedKeywords("", ["hello"])).toBe(0);
    });

    it("should handle empty keywords", () => {
      expect(countMatchedKeywords("hello world", [])).toBe(0);
    });
  });
});
