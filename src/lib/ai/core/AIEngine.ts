/**
 * Military Construction AI Engine
 * Core AI system with military personality and construction expertise
 */

import type { ConstructionIntel, AIResponse } from "@/lib/ai/types";
import { logger } from "@/lib/utils/logger";
import { matchesKeywords } from "@/lib/utils/keywordMatcher";

export class CoreAIEngine {
  private constructionIntel: ConstructionIntel;

  constructor() {
    this.constructionIntel = {
      projectTypes: {
        residential:
          "**RESIDENTIAL FORTIFICATION** - Standard housing operations with tactical precision",
        commercial:
          "**COMMERCIAL OUTPOST** - Business facility construction with strategic positioning",
        renovation:
          "**STRUCTURE ENHANCEMENT MISSION** - Upgrading existing tactical installations",
        addition:
          "**FACILITY EXPANSION OPERATION** - Extending operational capacity",
        deck: "**ELEVATED PLATFORM CONSTRUCTION** - Tactical observation and recreation deck",
        kitchen:
          "**COMMAND CENTER UPGRADE** - Central operations and nutrition facility",
        bathroom:
          "**SANITATION FACILITY ENHANCEMENT** - Essential personnel welfare upgrade",
      },

      materialSpecs: {
        concrete:
          "**TACTICAL CONCRETE DEPLOYMENT** [ENGINEERING]\n• High-strength tactical mix\n• Weather-resistant compound\n• Precision placement protocols",
        steel:
          "**STRUCTURAL STEEL OPERATIONS** [BUILD]\n• Military-grade framework\n• Corrosion-resistant specifications\n• Load-bearing tactical deployment",
        lumber:
          "**TACTICAL LUMBER PROCUREMENT** [PARK]\n• Pacific Northwest premium grade\n• Sustainable tactical sourcing\n• Precision-cut specifications",
      },

      locationIntel: {
        seattle:
          "**SEATTLE OPERATIONAL ZONE** [LOCATION_CITY]\n• Urban tactical construction\n• High-density operational parameters\n• Premium material logistics",
        tacoma:
          "**TACOMA FORWARD OPERATING BASE** [LOCATION_CITY]\n• Strategic positioning\n• Industrial capacity operations\n• Port logistics advantage",
        bellevue:
          "**BELLEVUE COMMAND CENTER** [LOCATION_CITY]\n• Executive-level operations\n• Premium tactical specifications\n• High-security protocols",
      },

      veteranProtocols: {
        accessibility:
          "**VETERAN ACCESSIBILITY PROTOCOL** [ACCESSIBLE]\n• ADA-compliant tactical modifications\n• Mobility-enhanced operational space\n• Veteran-priority implementation",
        benefits:
          "**VETERAN BENEFITS INTELLIGENCE** [MILITARY_TECH]\n• Service-connected construction accommodations\n• VA benefit coordination protocols\n• Veteran family tactical support",
      },

      timelineStrategies: {
        immediate:
          "**RAPID DEPLOYMENT MISSION** [BOLT]\n• Emergency response protocols\n• Accelerated tactical timeline\n• Priority resource allocation",
        urgent:
          "**PRIORITY MISSION STATUS** [SCHEDULE]\n• Fast-track operational planning\n• Enhanced resource commitment\n• Veteran-priority processing",
        standard:
          "**STANDARD OPERATIONAL TIMELINE** [CALENDAR_TODAY]\n• Comprehensive planning phase\n• Quality-assured deployment\n• Systematic tactical approach",
        extended:
          "**STRATEGIC CAMPAIGN TIMELINE** [GPS_FIXED]\n• Extended operation planning\n• Comprehensive resource strategy\n• Maximum quality standards",
        complex:
          "**MAJOR INSTALLATION PROJECT** [ACCOUNT_BALANCE]\n• Large-scale operational planning\n• Multi-phase deployment strategy\n• Full command oversight",
      },
    };
  }

  generateResponse(userInput: string, context?: unknown): string {
    const input = userInput.toLowerCase();

    // Page-specific intelligence briefings
    if (
      matchesKeywords(input, [
        "page",
        "help",
        "where",
        "navigation",
        "guide",
      ]) &&
      context?.currentPage
    ) {
      return this.getPageSpecificGuidance(context.currentPage, input);
    }

    // Estimate and cost intelligence with context integration
    if (matchesKeywords(input, ["estimate", "cost", "price", "budget"])) {
      return this.getCostIntelligence(input, context);
    }

    // Material intelligence
    if (matchesKeywords(input, ["material", "supplies", "equipment"])) {
      return this.getMaterialIntelligence(input);
    }

    // Location intelligence
    if (
      matchesKeywords(input, [
        "location",
        "area",
        "where",
        "seattle",
        "tacoma",
        "bellevue",
      ])
    ) {
      return this.getLocationIntelligence(input);
    }

    // Timeline intelligence
    if (
      matchesKeywords(input, [
        "timeline",
        "schedule",
        "when",
        "time",
        "duration",
      ])
    ) {
      return this.getTimelineIntelligence(input);
    }

    // Veteran protocols
    if (
      matchesKeywords(input, [
        "veteran",
        "military",
        "service",
        "army",
        "navy",
        "marines",
      ])
    ) {
      return this.getVeteranProtocols(input);
    }

    // Default tactical guidance
    return this.getDefaultTacticalGuidance(input);
  }

  private getPageSpecificGuidance(currentPage: string, input: string): string {
    const pageGuidance: Record<string, string> = {
      home: "**MAIN BASE OPERATIONS** [HOME]\n• Mission overview and tactical capabilities\n• Access all operational divisions\n• Request immediate consultation",
      services:
        "**TACTICAL SERVICES COMMAND** [BUILD]\n• Construction operation categories\n• Specialized mission capabilities\n• Service delivery protocols",
      contact:
        "**COMMUNICATIONS CENTER** [CONTACT_PHONE]\n• Direct command contact\n• Mission briefing request\n• Emergency consultation protocols",
      about:
        "**COMMAND INTELLIGENCE** [INFO]\n• Unit history and capabilities\n• Leadership team credentials\n• Mission philosophy briefing",
      projects:
        "**OPERATIONAL PORTFOLIO** [PHOTO_LIBRARY]\n• Completed mission gallery\n• Tactical success documentation\n• Operation capability demonstration",
    };

    return pageGuidance[currentPage] || this.getDefaultTacticalGuidance(input);
  }

  private getCostIntelligence(input: string, context?: unknown): string {
    const budgetIntel = `**COST INTELLIGENCE BRIEFING** [CALCULATE]

[MILITARY_TECH] **TACTICAL BUDGET ANALYSIS**

• **Free Consultation**: No-cost tactical assessment
• **AI Estimator**: Immediate preliminary intelligence
• **Transparent Pricing**: No hidden operational costs

**Budget Operation Categories:**
• **Reconnaissance Mission** ($1K-$10K) - Minor tactical upgrades
• **Standard Operation** ($10K-$50K) - Major facility enhancements  
• **Strategic Campaign** ($50K-$250K) - Large-scale installations
• **Major Installation** ($250K+) - Complex multi-phase operations

[CHECK_CIRCLE] **VETERAN TACTICAL ADVANTAGE**
Special operational discounts and VA benefit coordination available.

**NEXT TACTICAL MOVE**: Request free consultation for mission-specific cost analysis.`;

    return budgetIntel;
  }

  private getMaterialIntelligence(input: string): string {
    return `**MATERIAL PROCUREMENT INTELLIGENCE** [HANDYMAN]

[ENGINEERING] **TACTICAL SUPPLY CHAIN**

• **Pacific Northwest Premium Materials** - Local tactical sourcing
• **Military-Grade Specifications** - Maximum durability protocols
• **Weather-Resistant Compounds** - All-season operational capability

**Primary Material Categories:**
${Object.entries(this.constructionIntel.materialSpecs)
  .map(([key, value]) => `• ${value}`)
  .join("\n")}

[SHIELD] **QUALITY ASSURANCE PROTOCOL**
Every material meets military-standard quality control procedures.`;
  }

  private getLocationIntelligence(input: string): string {
    return `**OPERATIONAL TERRITORY INTELLIGENCE** [LOCATION_ON]

[GPS_FIXED] **PACIFIC NORTHWEST TACTICAL ZONE**

**Primary Operating Areas:**
${Object.entries(this.constructionIntel.locationIntel)
  .map(([key, value]) => `• ${value}`)
  .join("\n")}

[SHIELD] **SERVICE RADIUS**: 50-mile tactical deployment zone
**RAPID RESPONSE**: Same-day consultation within operational parameters`;
  }

  private getTimelineIntelligence(input: string): string {
    return `**OPERATIONAL TIMELINE INTELLIGENCE** [SCHEDULE]

[MILITARY_TECH] **MISSION TIMELINE CATEGORIES**

${Object.entries(this.constructionIntel.timelineStrategies)
  .map(([key, value]) => `• ${value}`)
  .join("\n")}

[CHECK_CIRCLE] **TIMELINE COMMITMENT PROTOCOL**
Every mission timeline includes buffer zones for weather and unforeseen tactical challenges.`;
  }

  private getVeteranProtocols(input: string): string {
    return `**VETERAN TACTICAL PROTOCOLS** [MILITARY_TECH]

[SHIELD] **VETERAN-FIRST OPERATIONAL PRIORITY**

• **Service Recognition**: Immediate veteran status verification
• **Priority Scheduling**: Fast-track consultation and project timeline
• **Veteran Discounts**: Automatic service-connected savings applied
• **VA Benefit Coordination**: Expert assistance with benefit utilization

${Object.entries(this.constructionIntel.veteranProtocols)
  .map(([key, value]) => `• ${value}`)
  .join("\n")}

[HANDSHAKE] **VETERAN COMMITMENT**
Our veteran-owned team understands military precision and attention to detail.`;
  }

  private getDefaultTacticalGuidance(input: string): string {
    return `**GENERAL TACTICAL GUIDANCE** [INFO]

[MILITARY_TECH] **MH CONSTRUCTION COMMAND CENTER**

• **Mission**: Premium construction services with military precision
• **Area of Operations**: Pacific Northwest tactical zone
• **Capabilities**: Residential, commercial, and specialized operations

**IMMEDIATE TACTICAL OPTIONS:**
• Request free consultation: Strategic mission planning
• AI Estimator: Rapid preliminary cost intelligence
• Portfolio Review: Previous successful operations

[HANDSHAKE] **PARTNERSHIP PROTOCOL**
"We Work With You" - Collaborative tactical approach to every mission.

**Ready for your next tactical move, partner?**`;
  }
}
