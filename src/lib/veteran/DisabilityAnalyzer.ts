/**
 * Disability Analyzer Module
 * Handles disability rating detection, service-connected conditions, and adaptive needs analysis
 */

import type { AdaptiveNeed } from "./types/VeteranTypes";

/**
 * Analyzes veteran disability information and adaptive needs
 */
export class DisabilityAnalyzer {
  /**
   * Detect if veteran has disability status
   * @param keywords - Normalized lowercase text to analyze
   * @returns True if disability indicators are found
   */
  detectDisabledVeteran(keywords: string): boolean {
    const disabilityKeywords = [
      "disabled veteran",
      "disability rating",
      "va rating",
      "service connected",
      "ptsd",
      "tbi",
      "traumatic brain injury",
      "wounded warrior",
      "disabled",
      "disability compensation",
      "100% disabled",
      "permanent disability",
      "service-connected disability",
    ];

    return disabilityKeywords.some((keyword) => keywords.includes(keyword));
  }

  /**
   * Estimate disability rating from keywords
   * @param keywords - Normalized lowercase text to analyze
   * @returns Disability rating percentage or undefined
   */
  estimateDisabilityRating(keywords: string): number | undefined {
    const ratingPatterns = [
      /(\d+)%\s*disabled/,
      /(\d+)%\s*rating/,
      /va\s*rating\s*(\d+)/,
      /disability\s*(\d+)%/,
      /service\s*connected\s*(\d+)%/,
      /(\d+)\s*percent\s*disabled/,
    ];

    for (const pattern of ratingPatterns) {
      const match = keywords.match(pattern);
      if (match && match[1]) {
        const rating = parseInt(match[1]);
        // Validate rating is within reasonable range
        if (rating >= 0 && rating <= 100) {
          return rating;
        }
      }
    }

    // Check for specific rating categories
    if (
      keywords.includes("100% disabled") ||
      keywords.includes("totally disabled")
    ) {
      return 100;
    }

    if (keywords.includes("70% disabled")) {
      return 70;
    }

    if (keywords.includes("50% disabled")) {
      return 50;
    }

    if (keywords.includes("30% disabled")) {
      return 30;
    }

    return undefined;
  }

  /**
   * Detect service-connected conditions
   * @param keywords - Normalized lowercase text to analyze
   * @returns Array of detected conditions
   */
  detectServiceConnectedConditions(keywords: string): string[] {
    const conditions: string[] = [];

    const conditionMap = {
      PTSD: ["ptsd", "post traumatic stress", "combat stress", "trauma"],
      TBI: ["tbi", "traumatic brain injury", "head injury", "concussion"],
      "Hearing Loss": [
        "hearing loss",
        "tinnitus",
        "deaf",
        "ringing ears",
        "hearing damage",
      ],
      "Vision Loss": ["vision loss", "blind", "eye injury", "vision problems"],
      "Mobility Issues": [
        "mobility",
        "wheelchair",
        "amputee",
        "prosthetic",
        "walking difficulties",
      ],
      "Back Injury": [
        "back injury",
        "spine",
        "herniated disc",
        "spinal injury",
      ],
      "Joint Issues": ["knee", "shoulder", "hip", "joint pain", "arthritis"],
      Respiratory: [
        "lung",
        "asthma",
        "breathing",
        "respiratory",
        "copd",
        "burn pit exposure",
      ],
      "Mental Health": [
        "depression",
        "anxiety",
        "mental health",
        "psychiatric",
      ],
      "Chronic Pain": ["chronic pain", "fibromyalgia", "pain management"],
    };

    Object.entries(conditionMap).forEach(([condition, indicators]) => {
      if (indicators.some((indicator) => keywords.includes(indicator))) {
        conditions.push(condition);
      }
    });

    return conditions;
  }

  /**
   * Analyzes adaptive needs from keywords and form data
   * @param keywords - Keywords to analyze
   * @param _formData - Optional form data with additional context (not currently used)
   * @returns Array of adaptive needs with severity and accommodations
   */
  analyzeAdaptiveNeeds(
    keywords: string,
    _formData?: Record<string, unknown>,
  ): AdaptiveNeed[] {
    const needs: AdaptiveNeed[] = [];

    // Mobility needs
    if (
      keywords.includes("wheelchair") ||
      keywords.includes("mobility") ||
      keywords.includes("walker") ||
      keywords.includes("cane")
    ) {
      const severity = this.determineSeverity(keywords, [
        "permanent wheelchair",
        "always wheelchair",
        "full time wheelchair",
      ]);

      needs.push({
        type: "mobility",
        severity: severity,
        accommodations: [
          "wheelchair access",
          "ramps",
          "wider doorways",
          "accessible bathroom",
          "lower counters",
          "grab bars",
        ],
      });
    }

    // Visual needs
    if (
      keywords.includes("blind") ||
      keywords.includes("vision") ||
      keywords.includes("low vision") ||
      keywords.includes("sight")
    ) {
      const severity = this.determineSeverity(keywords, [
        "completely blind",
        "total blindness",
        "legally blind",
      ]);

      needs.push({
        type: "visual",
        severity: severity,
        accommodations: [
          "braille",
          "audio systems",
          "tactile indicators",
          "high contrast",
          "voice control",
        ],
      });
    }

    // Hearing needs
    if (
      keywords.includes("deaf") ||
      keywords.includes("hearing loss") ||
      keywords.includes("hard of hearing") ||
      keywords.includes("tinnitus")
    ) {
      const severity = this.determineSeverity(keywords, [
        "completely deaf",
        "total hearing loss",
        "profound deafness",
      ]);

      needs.push({
        type: "hearing",
        severity: severity,
        accommodations: [
          "visual alerts",
          "vibrating notifications",
          "captioning systems",
          "sign language",
        ],
      });
    }

    // Cognitive needs
    if (
      keywords.includes("tbi") ||
      keywords.includes("memory") ||
      keywords.includes("cognitive") ||
      keywords.includes("brain injury")
    ) {
      needs.push({
        type: "cognitive",
        severity: "moderate",
        accommodations: [
          "simplified controls",
          "memory aids",
          "clear labeling",
          "organized spaces",
        ],
      });
    }

    // Medical equipment needs
    if (
      keywords.includes("oxygen") ||
      keywords.includes("medical equipment") ||
      keywords.includes("dialysis") ||
      keywords.includes("respirator")
    ) {
      needs.push({
        type: "medical",
        severity: "severe",
        accommodations: [
          "medical equipment space",
          "backup power",
          "climate control",
          "emergency access",
        ],
      });
    }

    return needs;
  }

  /**
   * Helper to determine severity based on keyword intensity
   * @param keywords - Keywords to analyze
   * @param severeIndicators - Keywords that indicate severe condition
   * @returns Severity level
   */
  private determineSeverity(
    keywords: string,
    severeIndicators: string[],
  ): "mild" | "moderate" | "severe" {
    if (severeIndicators.some((indicator) => keywords.includes(indicator))) {
      return "severe";
    }

    if (
      keywords.includes("permanent") ||
      keywords.includes("chronic") ||
      keywords.includes("significant")
    ) {
      return "moderate";
    }

    return "mild";
  }
}
