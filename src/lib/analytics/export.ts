/**
 * Analytics Data Export Utilities
 * Export analytics data in various formats (CSV, JSON)
 */

import { dataCollector } from "./data-collector";
import { logger } from "@/lib/utils/logger";

/**
 * Export all analytics data as JSON
 */
export function exportAsJSON(): string {
  try {
    const data = dataCollector.getAllData();
    return JSON.stringify(data, null, 2);
  } catch (error) {
    logger.error("Error exporting analytics as JSON:", error);
    return "{}";
  }
}

/**
 * Export page views as CSV
 */
export function exportPageViewsAsCSV(): string {
  try {
    const data = dataCollector.getAllData();
    if (!data?.pageviews?.pages) return "Page,Views\n";

    const csv = ["Page,Views"];
    Object.entries(data.pageviews.pages).forEach(([page, views]) => {
      csv.push(`"${page}",${views}`);
    });

    return csv.join("\n");
  } catch (error) {
    logger.error("Error exporting page views as CSV:", error);
    return "Page,Views\n";
  }
}

/**
 * Export clicks as CSV
 */
export function exportClicksAsCSV(): string {
  try {
    const data = dataCollector.getAllData();
    if (!data?.clicks || !Array.isArray(data.clicks)) {
      return "Element,Timestamp,Page,Device,Browser,OS\n";
    }

    const csv = ["Element,Timestamp,Page,Device,Browser,OS"];
    data.clicks.forEach((click: Record<string, unknown>) => {
      csv.push(
        `"${click["element"] || ""}","${click["timestamp"] || ""}","${click["page"] || ""}","${click["deviceType"] || ""}","${click["browser"] || ""}","${click["os"] || ""}"`,
      );
    });

    return csv.join("\n");
  } catch (error) {
    logger.error("Error exporting clicks as CSV:", error);
    return "Element,Timestamp,Page,Device,Browser,OS\n";
  }
}

/**
 * Export form submissions as CSV
 */
export function exportFormsAsCSV(): string {
  try {
    const data = dataCollector.getAllData();
    if (!data?.forms || !Array.isArray(data.forms)) {
      return "Form ID,Timestamp,Page\n";
    }

    const csv = ["Form ID,Timestamp,Page"];
    data.forms.forEach((form: Record<string, unknown>) => {
      csv.push(
        `"${form["formId"] || ""}","${form["timestamp"] || ""}","${form["page"] || ""}"`,
      );
    });

    return csv.join("\n");
  } catch (error) {
    logger.error("Error exporting forms as CSV:", error);
    return "Form ID,Timestamp,Page\n";
  }
}

/**
 * Export interactions as CSV
 */
export function exportInteractionsAsCSV(): string {
  try {
    const data = dataCollector.getAllData();
    if (!data?.interactions || !Array.isArray(data.interactions)) {
      return "Type,Element,Timestamp,Page\n";
    }

    const csv = ["Type,Element,Timestamp,Page"];
    data.interactions.forEach((interaction: Record<string, unknown>) => {
      csv.push(
        `"${interaction["type"] || ""}","${interaction["element"] || ""}","${interaction["timestamp"] || ""}","${interaction["page"] || ""}"`,
      );
    });

    return csv.join("\n");
  } catch (error) {
    logger.error("Error exporting interactions as CSV:", error);
    return "Type,Element,Timestamp,Page\n";
  }
}

/**
 * Download analytics data as a file
 */
export function downloadAnalyticsData(
  format:
    | "json"
    | "csv-pageviews"
    | "csv-clicks"
    | "csv-forms"
    | "csv-interactions",
): void {
  try {
    let content: string;
    let filename: string;
    let mimeType: string;

    switch (format) {
      case "json":
        content = exportAsJSON();
        filename = `mh-analytics-${new Date().toISOString().split("T")[0]}.json`;
        mimeType = "application/json";
        break;
      case "csv-pageviews":
        content = exportPageViewsAsCSV();
        filename = `mh-analytics-pageviews-${new Date().toISOString().split("T")[0]}.csv`;
        mimeType = "text/csv";
        break;
      case "csv-clicks":
        content = exportClicksAsCSV();
        filename = `mh-analytics-clicks-${new Date().toISOString().split("T")[0]}.csv`;
        mimeType = "text/csv";
        break;
      case "csv-forms":
        content = exportFormsAsCSV();
        filename = `mh-analytics-forms-${new Date().toISOString().split("T")[0]}.csv`;
        mimeType = "text/csv";
        break;
      case "csv-interactions":
        content = exportInteractionsAsCSV();
        filename = `mh-analytics-interactions-${new Date().toISOString().split("T")[0]}.csv`;
        mimeType = "text/csv";
        break;
      default:
        logger.error("Unknown export format:", format);
        return;
    }

    // Create blob and download
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    logger.log(`Analytics data exported as ${filename}`);
  } catch (error) {
    logger.error("Error downloading analytics data:", error);
  }
}

/**
 * Get analytics summary for display
 */
export function getAnalyticsSummary(): {
  totalPageViews: number;
  uniquePages: number;
  totalClicks: number;
  totalForms: number;
  totalInteractions: number;
  totalConversions: number;
  lastUpdated: string | null;
} {
  try {
    const data = dataCollector.getAllData();

    return {
      totalPageViews: data?.pageviews?.total || 0,
      uniquePages: Object.keys(data?.pageviews?.pages || {}).length,
      totalClicks: data?.clicks?.length || 0,
      totalForms: data?.forms?.length || 0,
      totalInteractions: data?.interactions?.length || 0,
      totalConversions: data?.conversions?.["total"] || 0,
      lastUpdated: data?.pageviews?.lastView || null,
    };
  } catch (error) {
    logger.error("Error getting analytics summary:", error);
    return {
      totalPageViews: 0,
      uniquePages: 0,
      totalClicks: 0,
      totalForms: 0,
      totalInteractions: 0,
      totalConversions: 0,
      lastUpdated: null,
    };
  }
}
