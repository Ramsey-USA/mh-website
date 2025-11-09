import fs from "fs";
import { logger } from "@/lib/utils/logger";
import path from "path";

export interface MarkdownContent {
  content: string;
  title?: string;
  excerpt?: string;
}

/**
 * Load markdown content from the docs folder
 * @param filePath - Path to the markdown file relative to the docs folder
 * @returns Promise<MarkdownContent>
 */
export function loadMarkdownContent(filePath: string): MarkdownContent {
  try {
    const fullPath = path.join(process.cwd(), "docs", filePath);
    const fileContent = fs.readFileSync(fullPath, "utf8");

    // Extract title from the first heading
    const titleMatch = fileContent.match(/^#\s+(.+)$/m);
    const title = titleMatch?.[1]?.trim();

    // Extract excerpt (first paragraph after title)
    const lines = fileContent.split("\n");
    let excerpt = "";
    let foundTitle = false;

    for (const line of lines) {
      if (line.startsWith("# ") && !foundTitle) {
        foundTitle = true;
        continue;
      }
      if (
        foundTitle &&
        line.trim() &&
        !line.startsWith("#") &&
        !line.startsWith("**") &&
        !line.startsWith("---")
      ) {
        excerpt = line.trim();
        break;
      }
    }

    return {
      content: fileContent,
      ...(title && { title }),
      ...(excerpt && { excerpt }),
    };
  } catch (_error) {
    logger.error(`Error loading markdown content from ${filePath}:`, _error);
    throw new Error(`Failed to load markdown content: ${filePath}`);
  }
}

/**
 * Load multiple markdown files
 * @param filePaths - Array of file paths relative to the docs folder
 * @returns Promise<Record<string, MarkdownContent>>
 */
export function loadMultipleMarkdownFiles(
  filePaths: string[],
): Record<string, MarkdownContent> {
  const contents: Record<string, MarkdownContent> = {};

  for (const filePath of filePaths) {
    try {
      const content = loadMarkdownContent(filePath);
      // Use filename without extension as key
      const key = path.basename(filePath, ".md");
      contents[key] = content;
    } catch (_error) {
      logger.error(`Failed to load ${filePath}:`, _error);
    }
  }

  return contents;
}

/**
 * Common markdown file paths for business content
 */
export const businessContentPaths = {
  coreValues: "business/CORE_VALUES.md",
  services: "business/SERVICES.md",
  teamRoster: "business/TEAM_ROSTER.md",
} as const;

/**
 * Load all business content
 */
export function loadBusinessContent(): Record<string, MarkdownContent> {
  return loadMultipleMarkdownFiles(Object.values(businessContentPaths));
}
