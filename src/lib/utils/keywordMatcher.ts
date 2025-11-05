/**
 * Keyword Matching Utility
 * Shared utility for matching keywords in text inputs across AI and veteran systems
 */

/**
 * Checks if an input string contains any of the specified keywords
 * @param input - The text to search (case-insensitive)
 * @param keywords - Array of keywords to match
 * @returns true if any keyword is found in the input
 */
export function matchesKeywords(input: string, keywords: string[]): boolean {
  const lowerInput = input.toLowerCase();
  return keywords.some((keyword) => lowerInput.includes(keyword.toLowerCase()));
}

/**
 * Checks if an input string contains all of the specified keywords
 * @param input - The text to search (case-insensitive)
 * @param keywords - Array of keywords that must all be present
 * @returns true if all keywords are found in the input
 */
export function matchesAllKeywords(input: string, keywords: string[]): boolean {
  const lowerInput = input.toLowerCase();
  return keywords.every((keyword) =>
    lowerInput.includes(keyword.toLowerCase())
  );
}

/**
 * Counts how many keywords from the list are present in the input
 * @param input - The text to search (case-insensitive)
 * @param keywords - Array of keywords to match
 * @returns number of matched keywords
 */
export function countMatchedKeywords(
  input: string,
  keywords: string[]
): number {
  const lowerInput = input.toLowerCase();
  return keywords.filter((keyword) =>
    lowerInput.includes(keyword.toLowerCase())
  ).length;
}
