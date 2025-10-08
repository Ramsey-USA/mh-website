import SmartRecommendationEngine, {
  ProjectRecommendation,
  UserProfile,
} from './recommendations/SmartRecommendationEngine'
import {
  VeteranPersonalizationSystem,
  VeteranProfile,
  ComprehensiveVeteranExperience,
  VeteranBenefitsAutomation,
  enhanceAIWithVeteranPersonalization,
} from './veteran'

interface ConstructionIntel {
  projectTypes: Record<string, string>
  materialSpecs: Record<string, string>
  locationIntel: Record<string, string>
  veteranProtocols: Record<string, string>
  timelineStrategies: Record<string, string>
}

export class MilitaryConstructionAI {
  private constructionIntel: ConstructionIntel
  private recommendationEngine: SmartRecommendationEngine
  private veteranSystem: VeteranPersonalizationSystem

  constructor() {
    this.recommendationEngine = new SmartRecommendationEngine()
    this.recommendationEngine.setAIEngine(this) // Inject self to break circular dependency
    this.veteranSystem = VeteranPersonalizationSystem.getInstance()
    this.constructionIntel = {
      projectTypes: {
        residential:
          '**RESIDENTIAL FORTIFICATION** - Standard housing operations with tactical precision',
        commercial:
          '**COMMERCIAL OUTPOST** - Business facility construction with strategic positioning',
        renovation:
          '**STRUCTURE ENHANCEMENT MISSION** - Upgrading existing tactical installations',
        addition:
          '**FACILITY EXPANSION OPERATION** - Extending operational capacity',
        deck: '**ELEVATED PLATFORM CONSTRUCTION** - Tactical observation and recreation deck',
        kitchen:
          '**COMMAND CENTER UPGRADE** - Central operations and nutrition facility',
        bathroom:
          '**SANITATION FACILITY ENHANCEMENT** - Essential personnel welfare upgrade',
      },

      materialSpecs: {
        standard:
          '**STANDARD ISSUE MATERIALS** [CONSTRUCTION]\n• Field-grade lumber and basic fixtures\n• Reliable performance for standard operations\n• Cost-effective tactical solution',
        enhanced:
          '**ENHANCED GRADE ARSENAL** [SECURITY]\n• Superior tactical equipment and materials\n• Improved durability and performance\n• Recommended for extended deployments',
        premium:
          '**PREMIUM MILITARY SPEC** [STAR]\n• Top-tier operational supplies\n• Maximum performance and longevity\n• Elite command center standards',
        elite:
          '**ELITE COMMAND MATERIALS** [DIAMOND]\n• Maximum performance specifications\n• Highest quality operational equipment\n• Built for commanding officer standards',
      },

      locationIntel: {
        seattle:
          '**SEATTLE FORWARD OPERATING BASE** - Urban operations with rain-weather protocols',
        tacoma:
          '**TACOMA TACTICAL ZONE** - Industrial sector with strategic port access',
        bellevue:
          '**BELLEVUE COMMAND CENTER** - High-value target area with premium requirements',
        everett:
          '**EVERETT AEROSPACE SECTOR** - Advanced technology zone operations',
        spokane:
          '**SPOKANE EASTERN FRONT** - Continental operations with extreme weather prep',
        vancouver:
          '**VANCOUVER NORTHERN OUTPOST** - International border tactical position',
        olympia:
          '**OLYMPIA CAPITAL COMMAND** - State operations headquarters sector',
        bellingham:
          '**BELLINGHAM NORTHERN PATROL** - Border region tactical operations',
      },

      veteranProtocols: {
        army: '**HOOAH, SOLDIER!** [FLAG] Army strong - we build with the same precision you served with',
        navy: '**ANCHORS AWEIGH!** [ANCHOR] Navy precision meets construction excellence',
        marines:
          '**SEMPER FI!** [SPA] Marine Corps standards - built tough, built right',
        airforce:
          '**AIM HIGH!** [FLIGHT] Air Force precision engineering in every project',
        coastguard:
          '**SEMPER PARATUS!** [DIRECTIONS_BOAT] Coast Guard ready - always prepared for any challenge',
        general:
          '**THANK YOU FOR YOUR SERVICE!** [MILITARY_TECH] Veteran recognition protocol active',
      },

      timelineStrategies: {
        urgent:
          '**RAPID DEPLOYMENT MISSION** [BOLT]\n• Emergency response protocols\n• Accelerated tactical timeline\n• Priority resource allocation',
        standard:
          '**STANDARD OPERATIONS TEMPO** [EVENT]\n• Regular mission timeline\n• Balanced resource deployment\n• Quality assurance protocols',
        extended:
          '**STRATEGIC CAMPAIGN TIMELINE** [GPS_FIXED]\n• Extended operation planning\n• Comprehensive resource strategy\n• Maximum quality standards',
        complex:
          '**MAJOR INSTALLATION PROJECT** [ACCOUNT_BALANCE]\n• Large-scale operational planning\n• Multi-phase deployment strategy\n• Full command oversight',
      },
    }
  }

  generateResponse(userInput: string, context?: any): string {
    const input = userInput.toLowerCase()

    // Page-specific intelligence briefings
    if (
      this.matchesKeywords(input, [
        'page',
        'help',
        'where',
        'navigation',
        'guide',
      ]) &&
      context?.currentPage
    ) {
      return this.getPageSpecificGuidance(context.currentPage, input)
    }

    // Estimate and cost intelligence with context integration
    if (this.matchesKeywords(input, ['estimate', 'cost', 'price', 'budget'])) {
      return this.getCostIntelligence(input, context)
    } // Material intelligence
    if (this.matchesKeywords(input, ['material', 'supplies', 'equipment'])) {
      return this.getMaterialIntelligence(input)
    }

    // Location intelligence
    if (
      this.matchesKeywords(input, [
        'location',
        'area',
        'where',
        'seattle',
        'tacoma',
        'bellevue',
      ])
    ) {
      return this.getLocationIntelligence(input)
    }

    // Timeline intelligence
    if (
      this.matchesKeywords(input, [
        'timeline',
        'schedule',
        'when',
        'time',
        'duration',
      ])
    ) {
      return this.getTimelineIntelligence(input)
    }

    // Veteran protocols
    if (
      this.matchesKeywords(input, [
        'veteran',
        'military',
        'service',
        'army',
        'navy',
        'marines',
      ])
    ) {
      return this.getVeteranProtocols(input)
    }

    // Veteran-specific advisory system
    if (
      this.matchesKeywords(input, [
        'accessibility',
        'disability',
        'ada',
        'wheelchair',
        'mobility',
      ])
    ) {
      return this.getVeteranAccessibilityAdvice(input)
    }

    // Energy efficiency for veterans
    if (
      this.matchesKeywords(input, [
        'energy',
        'efficiency',
        'saving',
        'utility',
        'green',
      ])
    ) {
      return this.getVeteranEnergyAdvice(input)
    }

    // Security enhancements for veterans
    if (
      this.matchesKeywords(input, [
        'security',
        'safety',
        'protection',
        'surveillance',
      ])
    ) {
      return this.getVeteranSecurityAdvice(input)
    }

    // Project type intelligence
    if (
      this.matchesKeywords(input, [
        'project',
        'build',
        'construction',
        'renovation',
        'addition',
      ])
    ) {
      return this.getProjectIntelligence(input)
    }

    // Estimator integration and guidance
    if (
      this.matchesKeywords(input, [
        'estimator',
        'calculator',
        'form',
        'step',
        'next',
      ])
    ) {
      return this.getEstimatorGuidance(input, context)
    }

    // Help and general guidance
    if (this.matchesKeywords(input, ['help', 'what', 'how', 'guide'])) {
      return this.getOperationalGuidance()
    }

    return this.getDefaultResponse()
  }

  private matchesKeywords(input: string, keywords: string[]): boolean {
    return keywords.some(keyword => input.includes(keyword))
  }

  private getCostIntelligence(input: string, context?: any): string {
    return `**COST RECONNAISSANCE MISSION** [ATTACH_MONEY]

**TACTICAL ASSESSMENT INITIATED** [GPS_FIXED]

To provide precise **financial intelligence**, I need your operational parameters:

**MISSION BRIEFING REQUIRED:**
• **Primary Objective** (project type)
• **Area of Operations** (location)
• **Operational Scale** (size/scope)
• **Mission Timeline** (when needed)
• **Resource Requirements** (materials/features)

**VETERAN STATUS CHECK:** [MILITARY_TECH]
Confirm veteran status for **12% combat discount** activation.

**INTEL ADVANTAGE:** Our **AI estimation algorithms** factor in:
• **Location-specific cost intelligence**
• **Seasonal procurement strategies**
• **Material supply chain analysis**
• **Timeline optimization protocols**

**ORDERS:** Provide mission details and I'll deploy **immediate cost reconnaissance**!`
  }

  private getMaterialIntelligence(input: string): string {
    return `**MATERIAL SUPPLY INTELLIGENCE** [INVENTORY_2]

**SUPPLY CHAIN ANALYSIS COMPLETE** [ANALYTICS]

**TACTICAL MATERIAL GRADES:**

${Object.entries(this.constructionIntel.materialSpecs)
  .map(([key, value]) => value)
  .join('\n\n')}

**STRATEGIC ADVANTAGES:**
• **Pacific Northwest supply chain optimization**
• **Weather-resistant material protocols**
• **Veteran-preferred supplier network**
• **Quality assurance inspections**

**DEPLOYMENT RECOMMENDATION:** Enhanced Grade provides optimal **cost-to-performance ratio** for most tactical operations.

**WHAT MATERIALS ARE YOU REQUISITIONING FOR YOUR MISSION?**`
  }

  private getLocationIntelligence(input: string): string {
    const detectedLocation = Object.keys(
      this.constructionIntel.locationIntel
    ).find(loc => input.includes(loc))

    if (detectedLocation) {
      return `**LOCATION INTELLIGENCE REPORT** [LOCATION_ON]

**TARGET ZONE:** ${this.constructionIntel.locationIntel[detectedLocation]}

**TACTICAL ASSESSMENT:**
• **Local permit protocols** analyzed
• **Supply chain routes** optimized
• **Weather pattern intelligence** integrated
• **Contractor network** deployment ready

**OPERATIONAL FACTORS:**
• **Material cost adjustments** calculated
• **Transportation logistics** optimized
• **Local building code compliance** verified
• **Veteran contractor network** activated

**MISSION STATUS:** Ready to deploy tactical construction operations in your AO!`
    }

    return `**AREA OF OPERATIONS INTELLIGENCE** [MAP]

**PACIFIC NORTHWEST COMMAND ZONES:**

${Object.entries(this.constructionIntel.locationIntel)
  .map(([key, value]) => `• ${value}`)
  .join('\n')}

**TACTICAL ADVANTAGE:** Each zone has specialized **operational protocols** and **cost factors**.

**INTEL REQUEST:** What's your target operational area, soldier?`
  }

  private getTimelineIntelligence(input: string): string {
    return `**MISSION TIMELINE ANALYSIS** [TIMER]

**OPERATIONAL TEMPO OPTIONS:**

${Object.entries(this.constructionIntel.timelineStrategies)
  .map(([key, value]) => value)
  .join('\n\n')}

**TACTICAL CONSIDERATIONS:**
• **Weather windows** for optimal operations
• **Permit acquisition timelines**
• **Material procurement schedules**
• **Contractor deployment availability**

**STRATEGIC PLANNING:** Timeline directly impacts **resource allocation** and **cost factors**.

**MISSION TIMELINE REQUEST:** What's your operational deadline?`
  }

  private getVeteranProtocols(input: string): string {
    const serviceDetected = Object.keys(
      this.constructionIntel.veteranProtocols
    ).find(service => input.includes(service))

    const greeting = serviceDetected
      ? this.constructionIntel.veteranProtocols[serviceDetected]
      : this.constructionIntel.veteranProtocols.general

    return `${greeting}

**VETERAN TACTICAL ADVANTAGE PACKAGE** [MILITARY_TECH]

**ACTIVE PROTOCOLS:**
• **12% Combat Veteran Discount** - Automatic activation
• **Priority Mission Status** - Expedited scheduling
• **Veteran Contractor Network** - Fellow service members
• **Military Precision Standards** - Built to exceed expectations
• **Battle Buddy Support** - Personal project liaison

**SPECIAL OPERATIONS:**
• **Accessibility compliance** for wounded warriors
• **Energy efficiency** for cost savings
• **Smart home integration** for modern veterans
• **Security enhancements** for peace of mind

**YOUR SERVICE MATTERS** - We build with the same honor you served with!

**How can we execute your construction mission today?**`
  }

  private getProjectIntelligence(input: string): string {
    const projectType = Object.keys(this.constructionIntel.projectTypes).find(
      type => input.includes(type)
    )

    if (projectType) {
      return `**PROJECT INTELLIGENCE BRIEFING** [ASSIGNMENT]

**MISSION TYPE:** ${this.constructionIntel.projectTypes[projectType]}

**TACTICAL EXECUTION PLAN:**
• **Reconnaissance Phase** - Site assessment and planning
• **Resource Acquisition** - Materials and permit coordination
• **Deployment Phase** - Tactical construction operations
• **Quality Assurance** - Military precision inspections
• **Mission Complete** - Final briefing and handover

**OPERATIONAL ADVANTAGES:**
• **Veteran-led project management**
• **Military-grade quality standards**
• **Precise timeline execution**
• **Strategic cost optimization**

**READY TO INITIATE MISSION PLANNING?**`
    }

    return `**CONSTRUCTION MISSION TYPES** [CONSTRUCTION]

**AVAILABLE OPERATIONS:**

${Object.entries(this.constructionIntel.projectTypes)
  .map(([key, value]) => `• ${value}`)
  .join('\n')}

**TACTICAL QUESTION:** What type of construction mission are you planning?`
  }

  private getEstimatorGuidance(input: string, context?: any): string {
    if (context) {
      const { projectType, location, size, materials, isVeteran } = context

      return `**ESTIMATOR TACTICAL GUIDANCE** [GPS_FIXED]

**CURRENT MISSION STATUS ANALYSIS:**

${
  projectType
    ? `[CHECK_CIRCLE] **Mission Type:** ${
        this.constructionIntel.projectTypes[projectType] ||
        projectType.toUpperCase()
      }`
    : '[WARNING] **Mission Type:** AWAITING ORDERS - Select your construction objective'
}

${
  location
    ? `[CHECK_CIRCLE] **Area of Operations:** ${
        this.constructionIntel.locationIntel[location.toLowerCase()] ||
        location.toUpperCase()
      }`
    : '[WARNING] **Location Intel:** REQUIRED - Specify your operational zone'
}

${
  size
    ? `[CHECK_CIRCLE] **Mission Scale:** ${size} square feet - Tactical scope confirmed`
    : '[WARNING] **Mission Scale:** PENDING - Define operational parameters'
}

${
  materials && materials.length > 0
    ? `[CHECK_CIRCLE] **Supply Chain:** ${materials.length} material(s) requisitioned`
    : '[WARNING] **Materials:** SUPPLY REQUEST NEEDED - Select tactical equipment'
}

${
  isVeteran
    ? '[MILITARY_TECH] **VETERAN STATUS CONFIRMED** - 12% combat discount activated'
    : '[FLAG] **Veteran Status:** Check if applicable for combat discount'
}

**NEXT TACTICAL OBJECTIVES:**
• Complete all mission parameters for precise intelligence
• Deploy **real-time pricing algorithms** for cost reconnaissance  
• Execute **veteran discount protocols** if applicable
• Generate **tactical cost assessment** with 95% accuracy

**ORDERS:** Continue with mission briefing to receive full tactical estimate!`
    }

    return `**ESTIMATOR COMMAND CENTER** [ASSIGNMENT]

**TACTICAL ESTIMATION SYSTEM READY** [GPS_FIXED]

Our **AI estimation algorithms** provide:

• **Real-time pricing intelligence** with location factors
• **Material database integration** with quality specifications
• **Seasonal cost adjustments** for optimal timing
• **Veteran discount protocols** automatically applied
• **Pacific Northwest specialization** for precise local intel

**MISSION EXECUTION STEPS:**
1. **Project Type Selection** - Define your construction objective
2. **Location Intelligence** - Specify area of operations  
3. **Scale Assessment** - Input tactical parameters (size, scope)
4. **Material Requisition** - Select quality grade and specifications
5. **Timeline Planning** - Define operational schedule
6. **Intelligence Report** - Receive precise cost reconnaissance

**STANDING BY FOR MISSION PARAMETERS** [MILITARY_TECH]

**What construction objective requires immediate tactical assessment?**`
  }

  private getOperationalGuidance(): string {
    return `**OPERATIONAL COMMAND CENTER** [GPS_FIXED]

**AVAILABLE TACTICAL OPERATIONS:**

[CONSTRUCTION] **PROJECT INTELLIGENCE** - Mission type analysis and planning
[ATTACH_MONEY] **COST RECONNAISSANCE** - Financial intelligence and estimates  
[INVENTORY_2] **SUPPLY CHAIN INTEL** - Material recommendations and specs
[LOCATION_ON] **LOCATION ANALYSIS** - Area of operations assessment
[TIMER] **TIMELINE STRATEGY** - Mission scheduling and planning
[MILITARY_TECH] **VETERAN PROTOCOLS** - Special service member operations

**DEPLOYMENT COMMAND:**
1. **State your mission objective**
2. **Provide operational parameters**
3. **Receive tactical intelligence**
4. **Execute with precision**

**REMEMBER:** The more **intel** you provide, the better I can **strategize** your mission success!

**WHAT CONSTRUCTION OBJECTIVE REQUIRES IMMEDIATE ATTENTION?**`
  }

  private getVeteranAccessibilityAdvice(input: string): string {
    return `**VETERAN ACCESSIBILITY OPERATIONS** [ACCESSIBLE]

**WOUNDED WARRIOR CONSTRUCTION PROTOCOLS** [MILITARY_TECH]

**TACTICAL ACCESSIBILITY ENHANCEMENTS:**

[HOME] **RESIDENTIAL FORTIFICATIONS:**
• **Zero-step entries** - Tactical ingress/egress solutions
• **Widened doorways** - Wheelchair deployment corridors (36" minimum)
• **Bathroom modifications** - ADA-compliant tactical facilities
• **Ramp installations** - Strategic access routes with proper grades
• **Lever-style hardware** - Easy-operation tactical controls

[BUILD] **SPECIALIZED EQUIPMENT:**
• **Roll-in showers** - Barrier-free sanitation facilities
• **Grab bar installations** - Strategic support positioning
• **Lower counter heights** - Accessible command surfaces
• **Voice-activated systems** - Smart home tactical integration

[ATTACH_MONEY] **FUNDING INTELLIGENCE:**
• **VA Specially Adapted Housing (SAH) Grant** - Up to $109,986
• **Special Housing Adaptation (SHA) Grant** - Up to $21,647  
• **Temporary Residence Adaptation (TRA)** - Available for temporary housing

**TACTICAL ADVANTAGE:** We coordinate with **VA representatives** and **accessibility specialists** for seamless operations.

**ORDERS:** Specify your accessibility mission requirements for detailed tactical planning!`
  }

  private getVeteranEnergyAdvice(input: string): string {
    return `**VETERAN ENERGY EFFICIENCY OPERATIONS** [BOLT]

**TACTICAL COST-SAVINGS MISSION** [LIGHTBULB]

**ENERGY WARFARE STRATEGIES:**

[HOME] **THERMAL FORTIFICATION:**
• **High-performance insulation** - R-49 attic, R-21 walls minimum
• **Energy-efficient windows** - Double/triple-pane tactical glazing
• **Air sealing protocols** - Eliminate energy infiltration points
• **Smart thermostats** - Tactical climate control systems

[BOLT] **POWER GENERATION OPERATIONS:**
• **Solar panel installations** - Energy independence missions
• **Battery backup systems** - Grid-down operational readiness
• **LED lighting conversion** - 75% reduction in power consumption
• **Energy Star appliances** - Maximum operational efficiency

[ATTACH_MONEY] **VETERAN ENERGY BENEFITS:**
• **Federal Solar Tax Credit** - 30% of installation costs
• **State energy rebates** - Additional tactical savings
• **Utility company incentives** - Local energy warfare support
• **VA Energy Efficient Mortgage** - Financing for green upgrades

[ANALYTICS] **OPERATIONAL SAVINGS:**
• **Average 30-50% utility cost reduction**
• **Increased property value** by $15,000-$25,000
• **Long-term mission sustainability**

**TACTICAL INTELLIGENCE:** Energy-efficient upgrades provide **immediate cost relief** and **long-term strategic advantage**.

**What energy efficiency mission requires tactical deployment?**`
  }

  private getVeteranSecurityAdvice(input: string): string {
    return `**VETERAN SECURITY OPERATIONS** [SECURITY]

**TACTICAL PERIMETER DEFENSE PLANNING** [LOCK]

**HOME SECURITY FORTIFICATION:**

[HOME] **PERIMETER DEFENSE:**
• **Security camera systems** - 360-degree tactical surveillance
• **Motion-activated lighting** - Automatic threat illumination
• **Reinforced entry points** - Steel doors with deadbolt systems
• **Window security film** - Anti-intrusion tactical glazing
• **Smart doorbell systems** - Real-time visitor intelligence

[BUILD] **ADVANCED TACTICAL SYSTEMS:**
• **Alarm system integration** - Multi-zone security protocols
• **Safe room construction** - Secure tactical retreat spaces
• **Garage security upgrades** - Vehicle protection operations
• **Landscape defensive positioning** - Strategic vegetation placement

[SMARTPHONE] **SMART HOME SECURITY:**
• **Mobile app control** - Remote tactical command
• **Automated security routines** - Scheduled defensive protocols
• **Integration with emergency services** - Rapid response connectivity
• **Veteran-friendly monitoring** - PTSD-aware security solutions

[ATTACH_MONEY] **VETERAN SECURITY BENEFITS:**
• **Home security tax deductions** - Business use qualifications
• **Insurance premium reductions** - Up to 20% tactical savings
• **Veteran installer networks** - Brother/sister contractor preference
• **Bulk pricing advantages** - Group procurement opportunities

**PSYCHOLOGICAL OPERATIONS:**
• **Peace of mind enhancement** - Reduced hypervigilance stress
• **Sleep quality improvement** - Secure environment protocols
• **Family protection assurance** - Tactical home defense

**ORDERS:** Specify your security mission requirements for comprehensive tactical assessment!`
  }

  private getDefaultResponse(): string {
    return `**MESSAGE RECEIVED AND ACKNOWLEDGED** [SIGNAL_CELLULAR_ALT]

**PROCESSING TACTICAL INTELLIGENCE...**

Your construction mission parameters are being analyzed through our **military-grade assessment systems**.

**REQUEST ADDITIONAL INTEL:** To provide precise **tactical guidance**, please clarify your construction objectives with more operational details.

**STRATEGIC ADVANTAGE:** The more mission parameters you provide, the better I can deploy appropriate **tactical solutions**!

    **STANDING BY FOR FURTHER ORDERS** [MILITARY_TECH]`
  }

  private getPageSpecificGuidance(currentPage: string, input: string): string {
    if (currentPage?.includes('/estimator')) {
      return `**ESTIMATOR PAGE TACTICAL BRIEFING** [GPS_FIXED]

**CURRENT OPERATIONAL ZONE:** AI Construction Estimator Command Center

**MISSION OBJECTIVES AVAILABLE:**
• **Real-time cost reconnaissance** - Get instant intelligent estimates
• **Material supply intelligence** - Advanced database with quality specs
• **Location-based pricing** - Pacific Northwest tactical adjustments
• **Veteran discount protocols** - 12% combat discount activation
• **Timeline strategic planning** - Optimal deployment scheduling

**TACTICAL ADVANTAGE:** You're in the **primary estimation facility**! Use the form above to input mission parameters and receive precise intelligence.

**ORDERS:** Specify your construction objective or ask about estimation procedures!`
    }

    if (currentPage === '/') {
      return `**HOME BASE INTELLIGENCE BRIEFING** [HOME]

**CURRENT OPERATIONAL ZONE:** MH Construction Command Headquarters

**AVAILABLE TACTICAL OPERATIONS:**
• **[GPS_FIXED] AI Estimator** - Navigate to /estimator for instant cost intelligence
• **[ASSIGNMENT] Services Intelligence** - Review our tactical capabilities
• **[CONSTRUCTION] Project Gallery** - Inspect completed military-grade operations
• **[GROUPS] Team Roster** - Meet your veteran construction officers
• **[PHONE] Mission Planning** - Book tactical consultation

**STRATEGIC ASSETS:**
• **Veteran-owned excellence** with military precision
• **30+ years Pacific Northwest operations**
• **Advanced AI estimation technology**
• **Military-grade quality standards**

**READY TO DEPLOY TO SPECIFIC OPERATIONAL ZONE?**`
    }

    if (currentPage?.includes('/services')) {
      return `**SERVICES TACTICAL CAPABILITIES** [BUILD]

**CURRENT OPERATIONAL ZONE:** Service Capabilities Command Center

**AVAILABLE MILITARY-GRADE OPERATIONS:**
• **Residential Fortifications** - Housing construction with tactical precision
• **Commercial Outposts** - Business facility tactical deployment
• **Renovation Missions** - Structure enhancement operations
• **Addition Campaigns** - Facility expansion protocols
• **Specialized Operations** - Custom tactical solutions

**DEPLOYMENT READINESS:**
• **Veteran-led project management**
• **Military precision standards**
• **Advanced equipment and techniques**
• **Strategic timeline execution**

**MISSION PLANNING:** Ready to discuss specific operational requirements!`
    }

    if (currentPage?.includes('/projects')) {
      return `**PROJECT GALLERY INTELLIGENCE** [PHOTO_CAMERA]

**CURRENT OPERATIONAL ZONE:** Completed Missions Archive

**TACTICAL REVIEW AVAILABLE:**
• **Residential operations** - Successful housing missions
• **Commercial deployments** - Business facility completions
• **Renovation campaigns** - Enhancement operation results
• **Before/after intelligence** - Tactical transformation documentation

**OPERATIONAL STANDARDS:**
• **Military-grade quality** demonstrated
• **Veteran precision** in execution
• **Client satisfaction** mission accomplished
• **Timeline adherence** tactical excellence

**TACTICAL QUESTION:** What type of completed operation interests you most?`
    }

    if (currentPage?.includes('/about')) {
      return `**ABOUT US INTELLIGENCE DOSSIER** [ASSIGNMENT]

**CURRENT OPERATIONAL ZONE:** Company Intelligence Archives

**COMMAND STRUCTURE:**
• **Veteran-owned and operated** construction battalion
• **30+ years Pacific Northwest** operational experience
• **Military precision standards** in all deployments
• **Advanced AI technology** integration

**CORE VALUES:**
• **Honor** - Veteran integrity in every operation
• **Excellence** - Military-grade quality standards
• **Innovation** - Advanced tactical construction methods
• **Service** - Commitment to mission success

**READY TO LEARN MORE** about our tactical capabilities or team roster?`
    }

    if (currentPage?.includes('/contact')) {
      return `**CONTACT OPERATIONS CENTER** [PHONE]

**CURRENT OPERATIONAL ZONE:** Communication Command Hub

**AVAILABLE COMMUNICATION CHANNELS:**
• **Direct tactical consultation** - Phone/email engagement
• **Mission planning sessions** - In-person strategic briefings
• **Emergency operations** - Rapid response protocols
• **Estimate requests** - AI or human intelligence options

**DEPLOYMENT PROTOCOLS:**
• **Response time:** 24-hour maximum
• **Service area:** Pacific Northwest operational theater
• **Consultation:** Free tactical assessment available
• **Follow-up:** Mission status updates provided

**STANDING BY** for your communication preferences and mission requirements!`
    }

    return `**NAVIGATION INTELLIGENCE** [MAP]

**CURRENT POSITION:** ${currentPage || 'Unknown operational zone'}

**AVAILABLE TACTICAL ZONES:**
• **[HOME] Home Base** - Main command center
• **[GPS_FIXED] AI Estimator** - Cost intelligence facility
• **[BUILD] Services** - Capability assessment center
• **[CONSTRUCTION] Projects** - Completed missions gallery
• **[GROUPS] About** - Company intelligence dossier
• **[PHONE] Contact** - Communication command hub

**ORDERS:** Specify which operational zone requires immediate deployment!`
  }

  /**
   * Contact Form Assistance - Enhanced tactical guidance for mission coordination
   */
  public getContactFormAssistance(input: string, context?: any): string {
    // Enhanced context awareness with intelligent analysis
    const formAnalysis = this.analyzeFormCompletion(context?.formData)
    const smartSuggestions = this.generateSmartSuggestions(
      input,
      context?.formData
    )
    const validationGuidance = this.getValidationGuidance(context?.formData)

    if (context?.formData) {
      const { name, email, phone, projectType, location, message } =
        context.formData

      return `**CONTACT FORM TACTICAL ASSISTANCE** [ASSIGNMENT]

**MISSION READINESS ASSESSMENT:** ${formAnalysis.completionRate}% Complete (${
        formAnalysis.quality
      })

**CURRENT FIELD STATUS:**

${
  name
    ? `[CHECK_CIRCLE] **Personnel ID:** ${name} - Identity confirmed`
    : '[WARNING] **Personnel ID:** REQUIRED - Enter your full name for mission briefing'
}

${
  email
    ? `[CHECK_CIRCLE] **Communication Channel:** ${email} - ${
        this.validateEmail(email)
          ? 'Secure email established'
          : '[ERROR] INVALID EMAIL FORMAT - Please verify'
      }`
    : '[WARNING] **Communication Channel:** REQUIRED - Provide tactical email for mission updates'
}

${
  phone
    ? `[CHECK_CIRCLE] **Direct Contact Line:** ${phone} - ${
        this.validatePhone(phone)
          ? 'Emergency communication ready'
          : '[ERROR] INVALID PHONE FORMAT - Use (XXX) XXX-XXXX'
      }`
    : '[WARNING] **Direct Contact Line:** RECOMMENDED - Phone for urgent mission coordination'
}

${
  projectType
    ? `[CHECK_CIRCLE] **Mission Type:** ${projectType} - Objective classified`
    : '[WARNING] **Mission Type:** REQUIRED - Select construction mission category'
}

${
  location
    ? `[CHECK_CIRCLE] **Area of Operations:** ${location} - Tactical zone identified`
    : '[WARNING] **Area of Operations:** REQUIRED - Specify project location for deployment planning'
}

${
  message
    ? `[CHECK_CIRCLE] **Mission Brief:** ${message.length} characters - ${
        message.length > 50
          ? 'Detailed intel received'
          : 'Brief message received'
      }`
    : '[WARNING] **Mission Brief:** RECOMMENDED - Provide detailed mission objectives and requirements'
}

${smartSuggestions}

${validationGuidance}

**TACTICAL RECOMMENDATIONS:**
• **Mission Success Rate:** Include specific project requirements and timeline
• **Resource Planning:** Mention budget range for optimal tactical planning  
• **Veteran Status:** Identify if you're a service member for **12% combat discount**
• **Urgency Level:** Specify if this is an emergency construction operation

**ORDERS:** Complete all required fields to initiate mission communication protocols!`
    }

    return `**CONTACT FORM COMMAND CENTER** [PHONE]

**MISSION COMMUNICATION PROTOCOLS** [ASSIGNMENT]

Ready to establish **direct communication** with MH Construction command! Our **contact form** is your **primary communication channel** for:

• **Mission Briefings** - Detailed project consultations
• **Tactical Questions** - Construction intelligence requests  
• **Resource Coordination** - Material and timeline planning
• **Veteran Services** - Specialized support for service members
• **Emergency Operations** - Urgent construction requirements

**STRATEGIC INTEL:**
• **Response Time:** All communications acknowledged within **24 hours**
• **Priority Processing:** Veteran leads receive **expedited handling**
• **Direct Line:** (509) 308-6489 for immediate tactical support
• **Secure Channel:** info@mhconstruction.com for detailed mission briefs

**INTELLIGENT FORM ASSISTANCE:**
• **Auto-completion suggestions** based on your input
• **Real-time validation** for optimal data quality
• **Smart recommendations** for project type selection
• **Context-aware guidance** throughout the form

**TACTICAL ADVANTAGE:** Provide complete mission parameters for optimal resource deployment and strategic planning.

**READY TO RECEIVE YOUR MISSION BRIEF!** [MILITARY_TECH]`
  }

  /**
   * Booking Form Assistance - Strategic consultation scheduling protocols
   */
  public getBookingFormAssistance(input: string, context?: any): string {
    // Enhanced booking form analysis
    const bookingAnalysis = this.analyzeBookingCompletion(context?.formData)
    const timeSlotSuggestions = this.generateTimeSlotSuggestions(
      context?.formData
    )
    const bookingValidation = this.getBookingValidationGuidance(
      context?.formData
    )

    if (context?.formData) {
      const {
        clientName,
        email,
        phone,
        projectType,
        selectedDate,
        selectedTime,
        budget,
        projectDescription,
        location,
      } = context.formData

      return `**BOOKING FORM TACTICAL ASSISTANCE** [EVENT]

**CONSULTATION READINESS:** ${
        bookingAnalysis.completionRate
      }% Mission Prep Complete (${bookingAnalysis.quality})

**DEPLOYMENT SCHEDULE STATUS:**

${
  clientName
    ? `[CHECK_CIRCLE] **Command Personnel:** ${clientName} - Identity confirmed`
    : '[WARNING] **Command Personnel:** REQUIRED - Enter full name for consultation briefing'
}

${
  email
    ? `[CHECK_CIRCLE] **Secure Communications:** ${email} - ${
        this.validateEmail(email)
          ? 'Channel established'
          : '[ERROR] INVALID EMAIL - Please verify format'
      }`
    : '[WARNING] **Secure Communications:** REQUIRED - Email for mission confirmation'
}

${
  phone
    ? `[CHECK_CIRCLE] **Direct Command Line:** ${phone} - ${
        this.validatePhone(phone)
          ? 'Ready for tactical coordination'
          : '[ERROR] INVALID PHONE - Use (XXX) XXX-XXXX format'
      }`
    : '[WARNING] **Direct Command Line:** RECOMMENDED - Phone for consultation coordination'
}

${
  projectType
    ? `[CHECK_CIRCLE] **Mission Category:** ${projectType} - Objective classified`
    : '[WARNING] **Mission Category:** REQUIRED - Select construction mission type'
}

${
  selectedDate
    ? `[CHECK_CIRCLE] **Operation Date:** ${selectedDate} - Mission scheduled`
    : '[WARNING] **Operation Date:** REQUIRED - Select consultation deployment date'
}

${
  selectedTime
    ? `[CHECK_CIRCLE] **Deployment Time:** ${selectedTime} - Tactical window secured`
    : '[WARNING] **Deployment Time:** REQUIRED - Choose optimal mission time'
}

${
  budget
    ? `[CHECK_CIRCLE] **Resource Allocation:** ${budget} - Budget parameters set`
    : '[WARNING] **Resource Allocation:** RECOMMENDED - Specify budget for strategic planning'
}

${
  location
    ? `[CHECK_CIRCLE] **Area of Operations:** ${location} - Zone identified`
    : '[WARNING] **Area of Operations:** RECOMMENDED - Project location for logistics'
}

${
  projectDescription
    ? `[CHECK_CIRCLE] **Mission Brief:** ${projectDescription.length} characters - ${
        projectDescription.length > 100
          ? 'Detailed intel received'
          : 'Basic intel logged'
      }`
    : '[WARNING] **Mission Brief:** RECOMMENDED - Project details for precise consultation'
}

${timeSlotSuggestions}

${bookingValidation}

**CONSULTATION PROTOCOLS:**
• **Duration:** 60-90 minutes tactical assessment
• **Preparation:** Site photos and requirements recommended
• **Veteran Advantage:** Service members receive priority scheduling
• **Follow-up:** Detailed estimate provided within 48 hours

**ORDERS:** Complete all deployment parameters for optimal consultation mission success!`
    }

    return `**CONSULTATION BOOKING COMMAND** [EVENT]

**TACTICAL CONSULTATION PROTOCOLS** [GPS_FIXED]

Ready to schedule **direct tactical consultation** with MH Construction command! Our **booking system** deploys expert assessment for:

• **Site Reconnaissance** - Professional property evaluation
• **Mission Planning** - Detailed project strategy development
• **Resource Assessment** - Material and timeline coordination
• **Cost Intelligence** - Precise budget and pricing analysis
• **Veteran Operations** - Specialized service member consultations

**DEPLOYMENT INTEL:**
• **Response Time:** Consultation confirmation within **2 hours**
• **Mission Duration:** 60-90 minutes comprehensive assessment
• **Priority Scheduling:** Veterans receive **expedited booking**
• **Direct Coordination:** (509) 308-6489 for schedule adjustments
• **Secure Briefing:** Detailed follow-up estimate within 48 hours

**INTELLIGENT BOOKING SYSTEM:**
• **Smart scheduling** with optimal time recommendations
• **Conflict detection** for seamless coordination
• **Automated confirmations** with tactical precision
• **Weather analysis** for outdoor consultations

**TACTICAL ADVANTAGE:** Schedule strategic consultation for professional project assessment and mission-critical planning.

**READY FOR CONSULTATION DEPLOYMENT!** [MILITARY_TECH]`
  }

  /**
   * Lead Qualification Guidance - Enhanced intelligence gathering for project assessment
   */
  public getLeadQualificationGuidance(input: string, context?: any): string {
    const leadIntelligence = this.performComprehensiveLeadAnalysis(
      input,
      context
    )

    return `**LEAD QUALIFICATION INTELLIGENCE COMMAND** [GPS_FIXED]

**COMPREHENSIVE TACTICAL ASSESSMENT:**

[SEARCH] **MISSION INTELLIGENCE SUMMARY:**
• **Lead Score:** ${leadIntelligence.totalScore}/100 (${leadIntelligence.scoreCategory})
• **Project Type:** ${leadIntelligence.projectType}
• **Urgency Level:** ${leadIntelligence.urgencyLevel}
• **Budget Classification:** ${leadIntelligence.budgetRange}
• **Veteran Status:** ${leadIntelligence.veteranStatus}
• **Contact Quality:** ${leadIntelligence.contactQuality}
• **Timeline Status:** ${leadIntelligence.timelineStatus}

[MILITARY_TECH] **ADVANCED LEAD CLASSIFICATION:**

${leadIntelligence.classification}

[ANALYTICS] **SCORING BREAKDOWN:**
${leadIntelligence.scoreBreakdown}

[ROCKET_LAUNCH] **DEPLOYMENT RECOMMENDATIONS:**
${leadIntelligence.actionPlan}

[REFRESH] **FOLLOW-UP PROTOCOLS:**
${leadIntelligence.followUpStrategy}

**STRATEGIC INTELLIGENCE:** Advanced qualification engine enables precision targeting and optimal resource deployment for maximum mission success rate!

**COMMAND READY FOR TACTICAL LEAD PROCESSING!** [MILITARY_TECH]`
  }

  /**
   * Advanced Lead Intelligence Analysis Engine
   */
  private performComprehensiveLeadAnalysis(input: string, context?: any): any {
    const keywords = input.toLowerCase()

    // Calculate comprehensive lead score (0-100)
    const scoring = {
      urgency: this.calculateUrgencyScore(keywords),
      budget: this.calculateBudgetScore(keywords),
      veteran: this.calculateVeteranScore(keywords),
      projectClarity: this.calculateProjectClarityScore(keywords),
      contactInfo: this.calculateContactInfoScore(context),
      timeline: this.calculateTimelineScore(keywords),
      engagement: this.calculateEngagementScore(keywords),
    }

    const totalScore = Object.values(scoring).reduce(
      (sum, score) => sum + score,
      0
    )
    const scoreCategory = this.categorizeLeadScore(totalScore)

    return {
      totalScore: Math.round(totalScore),
      scoreCategory,
      projectType: this.classifyProjectType(keywords),
      urgencyLevel: this.assessUrgencyLevel(keywords),
      budgetRange: this.estimateBudgetRange(keywords),
      veteranStatus: this.detectVeteranStatus(keywords),
      contactQuality: this.assessContactQuality(context),
      timelineStatus: this.assessTimelineStatus(keywords),
      classification: this.generateAdvancedLeadClassification(
        totalScore,
        scoring,
        keywords
      ),
      scoreBreakdown: this.generateScoreBreakdown(scoring),
      actionPlan: this.generateActionPlan(totalScore, scoring, keywords),
      followUpStrategy: this.generateFollowUpStrategy(
        totalScore,
        scoring,
        keywords
      ),
    }
  }

  /**
   * Advanced Scoring Methods for Lead Qualification Engine
   */
  private calculateUrgencyScore(keywords: string): number {
    let score = 0
    if (
      keywords.includes('emergency') ||
      keywords.includes('urgent') ||
      keywords.includes('asap')
    )
      score += 20
    if (
      keywords.includes('soon') ||
      keywords.includes('quickly') ||
      keywords.includes('fast')
    )
      score += 15
    if (keywords.includes('planning') || keywords.includes('considering'))
      score += 5
    return Math.min(score, 20) // Max 20 points for urgency
  }

  private calculateBudgetScore(keywords: string): number {
    let score = 0
    if (
      keywords.includes('luxury') ||
      keywords.includes('high-end') ||
      keywords.includes('premium')
    )
      score += 20
    if (keywords.includes('major') || keywords.includes('large')) score += 15
    if (
      keywords.includes('budget') ||
      keywords.includes('cost') ||
      keywords.includes('price')
    )
      score += 10
    if (keywords.includes('cheap') || keywords.includes('affordable'))
      score += 5
    return Math.min(score, 20) // Max 20 points for budget indicators
  }

  private calculateVeteranScore(keywords: string): number {
    const veteranAnalysis = this.analyzeVeteranStatus(keywords)

    // Enhanced scoring based on veteran analysis
    let score = 0
    if (veteranAnalysis.isVeteran) {
      score = 15 // Base veteran score

      // Service branch bonus points
      if (veteranAnalysis.serviceBranch !== 'Unknown') score += 3

      // Combat veteran bonus
      if (veteranAnalysis.isCombatVeteran) score += 5

      // Disabled veteran bonus
      if (veteranAnalysis.isDisabledVeteran) score += 7

      // Multiple tour bonus
      if (veteranAnalysis.hasMultipleTours) score += 3
    }

    return Math.min(score, 30) // Max 30 points for veterans (increased from 15)
  }

  private calculateProjectClarityScore(keywords: string): number {
    let score = 0
    const projectTypes = [
      'kitchen',
      'bathroom',
      'addition',
      'remodel',
      'renovation',
      'commercial',
      'custom',
    ]
    if (projectTypes.some(type => keywords.includes(type))) score += 10

    const detailWords = [
      'square',
      'feet',
      'size',
      'timeline',
      'materials',
      'requirements',
    ]
    detailWords.forEach(word => {
      if (keywords.includes(word)) score += 2
    })

    return Math.min(score, 15) // Max 15 points for project clarity
  }

  private calculateContactInfoScore(context?: any): number {
    if (!context?.formData) return 0

    let score = 0
    if (context.formData.name) score += 3
    if (context.formData.email && this.validateEmail(context.formData.email))
      score += 5
    if (context.formData.phone && this.validatePhone(context.formData.phone))
      score += 4
    if (context.formData.location) score += 3

    return Math.min(score, 15) // Max 15 points for contact info
  }

  private calculateTimelineScore(keywords: string): number {
    let score = 0
    if (keywords.includes('start') || keywords.includes('begin')) score += 5
    if (keywords.includes('month') || keywords.includes('week')) score += 8
    if (keywords.includes('year') || keywords.includes('someday')) score += 2
    return Math.min(score, 10) // Max 10 points for timeline clarity
  }

  private calculateEngagementScore(keywords: string): number {
    let score = 0
    const engagementWords = [
      'questions',
      'details',
      'information',
      'discuss',
      'consultation',
      'meeting',
    ]
    engagementWords.forEach(word => {
      if (keywords.includes(word)) score += 1
    })
    return Math.min(score, 5) // Max 5 points for engagement level
  }

  private categorizeLeadScore(score: number): string {
    if (score >= 80) return '[WHATSHOT] **PRIME TARGET** - Maximum Priority'
    if (score >= 65) return '[GPS_FIXED] **HIGH VALUE** - Priority Engagement'
    if (score >= 50) return '[THERMOSTAT] **WARM PROSPECT** - Active Follow-up'
    if (score >= 35) return '[AC_UNIT] **COLD LEAD** - Nurturing Required'
    return '[ASSIGNMENT] **INFORMATION SEEKER** - Educational Phase'
  }

  private assessContactQuality(context?: any): string {
    if (!context?.formData) return 'No contact data available'

    const data = context.formData
    if (data.name && data.email && data.phone && data.location) {
      return '[CHECK_CIRCLE] **COMPLETE** - Full tactical contact established'
    } else if (data.name && data.email) {
      return '[WARNING] **PARTIAL** - Basic communication channels secured'
    } else {
      return '[ERROR] **INCOMPLETE** - Contact intelligence insufficient'
    }
  }

  private assessTimelineStatus(keywords: string): string {
    if (keywords.includes('emergency') || keywords.includes('urgent')) {
      return '[ERROR] **IMMEDIATE** - Emergency deployment required'
    } else if (keywords.includes('soon') || keywords.includes('month')) {
      return '[PRIORITY_HIGH] **NEAR-TERM** - Active project timeline'
    } else if (keywords.includes('year') || keywords.includes('planning')) {
      return '[CHECK_CIRCLE] **LONG-TERM** - Strategic planning phase'
    }
    return '[HELP] **UNDEFINED** - Timeline intelligence needed'
  }

  private generateAdvancedLeadClassification(
    score: number,
    scoring: any,
    keywords: string
  ): string {
    if (score >= 80) {
      return `[WHATSHOT] **ALPHA PRIORITY LEAD** - Elite Deployment Required:
• **Immediate tactical response** within 2 hours
• **Senior project manager** assignment mandatory
• **Veteran fast-track** protocols if applicable
• **Full resource mobilization** authorized
• **Conversion probability:** 85-95%`
    } else if (score >= 65) {
      return `[GPS_FIXED] **BRAVO HIGH-VALUE TARGET** - Priority Engagement:
• **Response window:** 4-6 hours maximum
• **Experienced team lead** assignment
• **Comprehensive assessment** deployment
• **Resource allocation:** High priority
• **Conversion probability:** 70-85%`
    } else if (score >= 50) {
      return `[THERMOSTAT] **CHARLIE WARM PROSPECT** - Strategic Follow-up:
• **Response timeline:** 24-48 hours
• **Standard consultation** protocols
• **Information gathering** mission
• **Resource allocation:** Standard
• **Conversion probability:** 45-70%`
    } else if (score >= 35) {
      return `[AC_UNIT] **DELTA COLD CONTACT** - Nurturing Campaign:
• **Educational outreach** strategy
• **Long-term relationship** building
• **Information specialist** assignment
• **Resource allocation:** Minimal
• **Conversion probability:** 20-45%`
    }
    return `[ASSIGNMENT] **ECHO INFORMATION SEEKER** - Educational Support:
• **Informational resources** deployment
• **General guidance** provision
• **Future opportunity** tracking
• **Resource allocation:** Basic
• **Conversion probability:** 5-20%`
  }

  private generateScoreBreakdown(scoring: any): string {
    return `• **Urgency Factor:** ${scoring.urgency}/20 points
• **Budget Indicators:** ${scoring.budget}/20 points  
• **Veteran Bonus:** ${scoring.veteran}/15 points
• **Project Clarity:** ${scoring.projectClarity}/15 points
• **Contact Quality:** ${scoring.contactInfo}/15 points
• **Timeline Status:** ${scoring.timeline}/10 points
• **Engagement Level:** ${scoring.engagement}/5 points`
  }

  private generateActionPlan(
    score: number,
    scoring: any,
    keywords: string
  ): string {
    if (score >= 80) {
      return `[ROCKET_LAUNCH] **IMMEDIATE ACTION PROTOCOL:**
• **Step 1:** Senior PM contact within 2 hours
• **Step 2:** Same-day consultation scheduling
• **Step 3:** Comprehensive site assessment deployment
• **Step 4:** Detailed proposal delivery within 24 hours
• **Step 5:** Contract negotiation initialization`
    } else if (score >= 65) {
      return `[PHONE] **HIGH-PRIORITY ENGAGEMENT:**
• **Step 1:** Team lead contact within 6 hours
• **Step 2:** Consultation scheduling within 48 hours
• **Step 3:** Professional assessment deployment
• **Step 4:** Detailed estimate delivery
• **Step 5:** Follow-up and relationship building`
    } else if (score >= 50) {
      return `[ASSIGNMENT] **STANDARD FOLLOW-UP PROTOCOL:**
• **Step 1:** Initial contact within 24 hours
• **Step 2:** Information gathering and qualification
• **Step 3:** Consultation offer deployment
• **Step 4:** Educational resource provision
• **Step 5:** Ongoing relationship nurturing`
    }
    return `📚 **EDUCATIONAL OUTREACH STRATEGY:**
• **Step 1:** Informational response within 48 hours
• **Step 2:** Educational resource deployment
• **Step 3:** Newsletter subscription offer
• **Step 4:** Future project opportunity tracking
• **Step 5:** Long-term relationship cultivation`
  }

  private generateFollowUpStrategy(
    score: number,
    scoring: any,
    keywords: string
  ): string {
    if (score >= 80) {
      return `[MILITARY_TECH] **ELITE FOLLOW-UP PROTOCOLS:**
• **Immediate:** 2-hour response guarantee
• **Day 1:** Consultation scheduling confirmation
• **Day 2:** Pre-assessment intelligence gathering
• **Week 1:** Detailed proposal and timeline
• **Ongoing:** Weekly project status updates`
    } else if (score >= 65) {
      return `[GPS_FIXED] **PRIORITY FOLLOW-UP SEQUENCE:**
• **Immediate:** 6-hour response commitment
• **Day 1:** Project discussion and qualification
• **Day 3:** Consultation scheduling
• **Week 1:** Comprehensive estimate delivery
• **Ongoing:** Bi-weekly relationship maintenance`
    } else if (score >= 50) {
      return `[EVENT] **STANDARD FOLLOW-UP CADENCE:**
• **Day 1:** Initial contact and information
• **Week 1:** Project qualification discussion
• **Week 2:** Educational resource sharing
• **Month 1:** Consultation offer and relationship building
• **Ongoing:** Monthly check-ins and updates`
    }
    return `📚 **EDUCATIONAL NURTURING CYCLE:**
• **Week 1:** Informational resource delivery
• **Month 1:** Educational content sharing
• **Quarter 1:** Project planning guidance
• **Ongoing:** Seasonal newsletters and updates
• **Future:** Opportunity tracking and relationship maintenance`
  }

  /**
   * Advanced Form Analysis Methods for Enhanced Intelligence
   */
  private analyzeFormCompletion(formData: any): {
    completionRate: number
    missingFields: string[]
    quality: string
  } {
    if (!formData)
      return {
        completionRate: 0,
        missingFields: ['All fields'],
        quality: 'INSUFFICIENT',
      }

    const requiredFields = ['name', 'email', 'projectType', 'location']
    const optionalFields = ['phone', 'message']
    const allFields = [...requiredFields, ...optionalFields]

    const completedFields = allFields.filter(field =>
      formData[field]?.toString().trim()
    )
    const missingRequired = requiredFields.filter(
      field => !formData[field]?.toString().trim()
    )

    const completionRate = Math.round(
      (completedFields.length / allFields.length) * 100
    )

    let quality = 'INSUFFICIENT'
    if (completionRate >= 80 && missingRequired.length === 0)
      quality = 'MISSION READY'
    else if (completionRate >= 60) quality = 'TACTICAL PROGRESS'
    else if (completionRate >= 40) quality = 'OPERATIONAL'

    return { completionRate, missingFields: missingRequired, quality }
  }

  private analyzeBookingCompletion(bookingData: any): {
    completionRate: number
    missingFields: string[]
    quality: string
  } {
    if (!bookingData)
      return {
        completionRate: 0,
        missingFields: ['All fields'],
        quality: 'INSUFFICIENT',
      }

    const requiredFields = [
      'clientName',
      'email',
      'projectType',
      'selectedDate',
      'selectedTime',
    ]
    const optionalFields = ['phone', 'projectDescription', 'location', 'budget']
    const allFields = [...requiredFields, ...optionalFields]

    const completedFields = allFields.filter(field =>
      bookingData[field]?.toString().trim()
    )
    const missingRequired = requiredFields.filter(
      field => !bookingData[field]?.toString().trim()
    )

    const completionRate = Math.round(
      (completedFields.length / allFields.length) * 100
    )

    let quality = 'INSUFFICIENT'
    if (completionRate >= 80 && missingRequired.length === 0)
      quality = 'MISSION READY'
    else if (completionRate >= 60) quality = 'TACTICAL PROGRESS'
    else if (completionRate >= 40) quality = 'OPERATIONAL'

    return { completionRate, missingFields: missingRequired, quality }
  }

  private generateSmartSuggestions(input: string, formData: any): string {
    if (!formData) return ''

    const suggestions: string[] = []

    // Project type suggestions based on keywords
    if (!formData.projectType && input) {
      const keywords = input.toLowerCase()
      if (keywords.includes('kitchen'))
        suggestions.push(
          '[GPS_FIXED] **SUGGESTION:** Consider "Kitchen Remodel" for mission type'
        )
      if (keywords.includes('bathroom'))
        suggestions.push(
          '[GPS_FIXED] **SUGGESTION:** Consider "Bathroom Remodel" for mission type'
        )
      if (keywords.includes('addition') || keywords.includes('expand'))
        suggestions.push(
          '[GPS_FIXED] **SUGGESTION:** Consider "Home Addition" for mission type'
        )
      if (keywords.includes('commercial') || keywords.includes('business'))
        suggestions.push(
          '[GPS_FIXED] **SUGGESTION:** Consider "Commercial Building" for mission type'
        )
    }

    // Location suggestions for Pacific Northwest
    if (!formData.location && input) {
      const locationKeywords = input.toLowerCase()
      if (locationKeywords.includes('seattle'))
        suggestions.push(
          '[LOCATION_ON] **LOCATION INTEL:** Seattle area - Premium pricing zone'
        )
      if (locationKeywords.includes('spokane'))
        suggestions.push(
          '[LOCATION_ON] **LOCATION INTEL:** Spokane area - Standard operational zone'
        )
      if (locationKeywords.includes('tacoma'))
        suggestions.push(
          '[LOCATION_ON] **LOCATION INTEL:** Tacoma area - Active construction zone'
        )
    }

    // Veteran recognition
    if (
      input.toLowerCase().includes('veteran') ||
      input.toLowerCase().includes('military') ||
      input.toLowerCase().includes('service')
    ) {
      suggestions.push(
        '[MILITARY_TECH] **VETERAN DETECTED:** Mention your service branch for 12% combat discount!'
      )
    }

    // Budget guidance
    if (
      input.toLowerCase().includes('cost') ||
      input.toLowerCase().includes('budget') ||
      input.toLowerCase().includes('price')
    ) {
      suggestions.push(
        '[ATTACH_MONEY] **BUDGET INTEL:** Include budget range in message for tactical resource planning'
      )
    }

    return suggestions.length > 0
      ? `\n**[GPS_FIXED] TACTICAL SUGGESTIONS:**\n${suggestions.join('\n')}\n`
      : ''
  }

  private generateTimeSlotSuggestions(bookingData: any): string {
    if (!bookingData) return ''

    const suggestions: string[] = []

    // Morning vs afternoon recommendations
    if (!bookingData.selectedTime) {
      suggestions.push(
        '[ALARM] **OPTIMAL TIMES:** Morning slots (8-11 AM) for outdoor projects'
      )
      suggestions.push(
        '[ALARM] **STRATEGIC PLANNING:** Afternoon slots (1-4 PM) for interior consultations'
      )
    }

    // Date recommendations
    if (!bookingData.selectedDate) {
      const today = new Date()
      const tomorrow = new Date(today)
      tomorrow.setDate(tomorrow.getDate() + 1)
      suggestions.push(
        `[EVENT] **EARLIEST DEPLOYMENT:** ${tomorrow.toLocaleDateString()} or later recommended`
      )
    }

    return suggestions.length > 0
      ? `\n**[EVENT] SCHEDULING INTEL:**\n${suggestions.join('\n')}\n`
      : ''
  }

  private getValidationGuidance(formData: any): string {
    if (!formData) return ''

    const issues: string[] = []

    // Email validation guidance
    if (formData.email && !this.validateEmail(formData.email)) {
      issues.push(
        '[EMAIL] **EMAIL FORMAT:** Use standard format (example@domain.com)'
      )
    }

    // Phone validation guidance
    if (formData.phone && !this.validatePhone(formData.phone)) {
      issues.push(
        '[PHONE] **PHONE FORMAT:** Use (XXX) XXX-XXXX format for optimal communication'
      )
    }

    // Message length guidance
    if (formData.message) {
      if (formData.message.length < 20) {
        issues.push(
          '[EDIT_NOTE] **MESSAGE BRIEF:** Consider adding more project details for better tactical planning'
        )
      } else if (formData.message.length > 500) {
        issues.push(
          '[EDIT_NOTE] **MESSAGE LENGTH:** Consider summarizing key points for efficient processing'
        )
      }
    }

    return issues.length > 0
      ? `\n**[WARNING] OPTIMIZATION RECOMMENDATIONS:**\n${issues.join('\n')}\n`
      : ''
  }

  private getBookingValidationGuidance(bookingData: any): string {
    if (!bookingData) return ''

    const issues: string[] = []

    // Email validation
    if (bookingData.email && !this.validateEmail(bookingData.email)) {
      issues.push(
        '[EMAIL] **EMAIL FORMAT:** Use standard format (example@domain.com)'
      )
    }

    // Phone validation
    if (bookingData.phone && !this.validatePhone(bookingData.phone)) {
      issues.push(
        '[PHONE] **PHONE FORMAT:** Use (XXX) XXX-XXXX format for coordination'
      )
    }

    // Project description guidance
    if (bookingData.projectDescription) {
      if (bookingData.projectDescription.length < 30) {
        issues.push(
          '[EDIT_NOTE] **PROJECT BRIEF:** Add more details for better consultation preparation'
        )
      }
    }

    // Date validation
    if (bookingData.selectedDate) {
      const selectedDate = new Date(bookingData.selectedDate)
      const today = new Date()
      if (selectedDate <= today) {
        issues.push(
          '[EVENT] **DATE VALIDATION:** Select future date for consultation scheduling'
        )
      }
    }

    return issues.length > 0
      ? `\n**[WARNING] SCHEDULING OPTIMIZATION:**\n${issues.join('\n')}\n`
      : ''
  }

  private validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  private validatePhone(phone: string): boolean {
    // Accepts formats: (XXX) XXX-XXXX, XXX-XXX-XXXX, XXX.XXX.XXXX, XXXXXXXXXX
    const phoneRegex = /^(\(\d{3}\)\s?|\d{3}[-.]?)\d{3}[-.]?\d{4}$/
    return phoneRegex.test(phone.replace(/\s/g, ''))
  }

  /**
   * Lead Qualification Helper Methods
   */
  private assessUrgencyLevel(keywords: string): string {
    if (
      keywords.includes('emergency') ||
      keywords.includes('urgent') ||
      keywords.includes('asap') ||
      keywords.includes('immediately')
    ) {
      return '[ERROR] **CRITICAL** - Emergency deployment required'
    }
    if (
      keywords.includes('soon') ||
      keywords.includes('quickly') ||
      keywords.includes('fast')
    ) {
      return '[PRIORITY_HIGH] **HIGH** - Priority tactical response'
    }
    if (
      keywords.includes('planning') ||
      keywords.includes('considering') ||
      keywords.includes('thinking')
    ) {
      return '[CHECK_CIRCLE] **MEDIUM** - Strategic planning phase'
    }
    return '[INFO] **STANDARD** - Normal operational timeline'
  }

  private estimateBudgetRange(keywords: string): string {
    if (
      keywords.includes('luxury') ||
      keywords.includes('high-end') ||
      keywords.includes('premium')
    ) {
      return '[DIAMOND] **PREMIUM** ($150K+ operational budget)'
    }
    if (
      keywords.includes('major') ||
      keywords.includes('large') ||
      keywords.includes('addition')
    ) {
      return '[ATTACH_MONEY] **SUBSTANTIAL** ($75K-$150K mission scope)'
    }
    if (
      keywords.includes('remodel') ||
      keywords.includes('renovation') ||
      keywords.includes('update')
    ) {
      return '[PAYMENTS] **MODERATE** ($25K-$75K tactical budget)'
    }
    if (
      keywords.includes('repair') ||
      keywords.includes('fix') ||
      keywords.includes('small')
    ) {
      return '[MONETIZATION_ON] **STANDARD** (Under $25K operational cost)'
    }
    return '[HELP] **ASSESSMENT REQUIRED** - Budget intelligence needed'
  }

  private detectVeteranStatus(keywords: string): string {
    const veteranAnalysis = this.analyzeVeteranStatus(keywords)

    if (veteranAnalysis.isVeteran) {
      let statusMessage = `[MILITARY_TECH] **VETERAN CONFIRMED** - ${veteranAnalysis.serviceBranch}`

      if (veteranAnalysis.isCombatVeteran) {
        statusMessage += ' (Combat Veteran)'
      }

      if (veteranAnalysis.isDisabledVeteran) {
        statusMessage += ' (Service-Connected Disability)'
      }

      statusMessage += '\n• **Priority processing** with expedited response'
      statusMessage += '\n• **12% combat discount** applied automatically'
      statusMessage +=
        '\n• **Veteran liaison** assigned for specialized support'

      if (veteranAnalysis.eligibleForVABenefits) {
        statusMessage += '\n• **VA benefits consultation** available'
      }

      return statusMessage
    }

    return '👤 **CIVILIAN** - Standard processing protocols'
  }

  /**
   * Comprehensive Veteran Analysis System
   */
  analyzeVeteranStatus(keywords: string): {
    isVeteran: boolean
    serviceBranch: string
    isCombatVeteran: boolean
    isDisabledVeteran: boolean
    hasMultipleTours: boolean
    eligibleForVABenefits: boolean
    veteranRank: string
    serviceEra: string
  } {
    // Enhanced service branch detection
    const serviceBranches = {
      Army: [
        'army',
        'soldier',
        'hooah',
        'infantry',
        'artillery',
        'armor',
        'airborne',
        'ranger',
      ],
      Navy: [
        'navy',
        'sailor',
        'shipmate',
        'submarine',
        'destroyer',
        'carrier',
        'seabee',
      ],
      Marines: [
        'marines',
        'marine',
        'semper fi',
        'devil dog',
        'jarhead',
        'oorah',
        'usmc',
      ],
      'Air Force': [
        'air force',
        'airman',
        'pilot',
        'aircrew',
        'airbase',
        'squadron',
        'usaf',
      ],
      'Coast Guard': [
        'coast guard',
        'coastie',
        'semper paratus',
        'uscg',
        'cutter',
      ],
      'Space Force': ['space force', 'guardian', 'ussf', 'space operations'],
    }

    // Veteran keywords detection
    const veteranKeywords = [
      'veteran',
      'vet',
      'military',
      'service',
      'served',
      'retired',
      'active duty',
      'reserve',
      'national guard',
    ]
    const isVeteran =
      veteranKeywords.some(keyword => keywords.includes(keyword)) ||
      Object.values(serviceBranches)
        .flat()
        .some(keyword => keywords.includes(keyword))

    let serviceBranch = 'Unknown'
    if (isVeteran) {
      for (const [branch, branchKeywords] of Object.entries(serviceBranches)) {
        if (branchKeywords.some(keyword => keywords.includes(keyword))) {
          serviceBranch = branch
          break
        }
      }
    }

    // Combat veteran detection
    const combatKeywords = [
      'combat',
      'deployment',
      'iraq',
      'afghanistan',
      'oif',
      'oef',
      'gwot',
      'theater',
      'overseas',
    ]
    const isCombatVeteran = combatKeywords.some(keyword =>
      keywords.includes(keyword)
    )

    // Disabled veteran detection
    const disabilityKeywords = [
      'disabled',
      'disability',
      'va rating',
      'service connected',
      'ptsd',
      'tbi',
      'wounded',
    ]
    const isDisabledVeteran = disabilityKeywords.some(keyword =>
      keywords.includes(keyword)
    )

    // Multiple tours detection
    const tourKeywords = [
      'tours',
      'deployments',
      'multiple',
      'second tour',
      'third tour',
    ]
    const hasMultipleTours = tourKeywords.some(keyword =>
      keywords.includes(keyword)
    )

    // VA benefits eligibility
    const eligibleForVABenefits =
      isVeteran &&
      (isCombatVeteran || isDisabledVeteran || keywords.includes('va'))

    // Rank detection (simplified)
    const rankKeywords = {
      Officer: [
        'officer',
        'captain',
        'major',
        'colonel',
        'general',
        'lieutenant',
        'commander',
      ],
      'Senior NCO': ['sergeant', 'chief', 'master', 'senior', 'first sergeant'],
      NCO: ['corporal', 'specialist', 'petty officer'],
      Enlisted: ['private', 'seaman', 'airman', 'lance corporal'],
    }

    let veteranRank = 'Not Specified'
    for (const [rank, rankWords] of Object.entries(rankKeywords)) {
      if (rankWords.some(keyword => keywords.includes(keyword))) {
        veteranRank = rank
        break
      }
    }

    // Service era detection
    const eraKeywords = {
      'GWOT (2001-Present)': [
        'iraq',
        'afghanistan',
        'oif',
        'oef',
        'gwot',
        '2000s',
        '2010s',
      ],
      'Gulf War (1990-1991)': [
        'gulf war',
        'desert storm',
        'desert shield',
        '1990s',
      ],
      'Cold War Era': ['cold war', '1980s', '1970s', 'berlin', 'korea'],
      'Vietnam Era': ['vietnam', 'southeast asia', '1960s', '1970s'],
      'Korean War': ['korea', 'korean war', '1950s'],
    }

    let serviceEra = 'Not Specified'
    for (const [era, eraWords] of Object.entries(eraKeywords)) {
      if (eraWords.some(keyword => keywords.includes(keyword))) {
        serviceEra = era
        break
      }
    }

    return {
      isVeteran,
      serviceBranch,
      isCombatVeteran,
      isDisabledVeteran,
      hasMultipleTours,
      eligibleForVABenefits,
      veteranRank,
      serviceEra,
    }
  }

  private classifyProjectType(keywords: string): string {
    if (keywords.includes('kitchen')) return 'Kitchen Remodel'
    if (keywords.includes('bathroom')) return 'Bathroom Remodel'
    if (keywords.includes('addition') || keywords.includes('expand'))
      return 'Home Addition'
    if (keywords.includes('commercial') || keywords.includes('business'))
      return 'Commercial Building'
    if (keywords.includes('custom') && keywords.includes('home'))
      return 'Custom Home'
    if (keywords.includes('tenant')) return 'Tenant Improvement'
    if (keywords.includes('industrial')) return 'Industrial Facility'
    if (keywords.includes('medical')) return 'Medical Facility'
    if (keywords.includes('government')) return 'Government Project'
    return 'Project Classification Required'
  }

  private generateLeadClassification(keywords: string, context?: any): string {
    const urgency =
      keywords.includes('emergency') || keywords.includes('urgent')
    const budget = keywords.includes('budget') || keywords.includes('cost')
    const timeline = keywords.includes('when') || keywords.includes('schedule')
    const veteran =
      keywords.includes('veteran') || keywords.includes('military')

    if (veteran || urgency) {
      return `[WHATSHOT] **HOT LEAD** - Immediate Action Required:
• **High conversion probability**
• **Ready for project initiation**
• **Immediate tactical response recommended**
• **Resource deployment:** Senior project manager assignment`
    }

    if (budget && timeline) {
      return `[THERMOSTAT] **WARM LEAD** - Strategic Engagement:
• **Active project planning phase**
• **Budget considerations in progress**
• **48-72 hour follow-up protocol**
• **Resource deployment:** Project consultant assignment`
    }

    return `[AC_UNIT] **COLD LEAD** - Information Gathering:
• **Research phase inquiries**
• **Long-term planning discussions**
• **Educational nurturing required**
• **Resource deployment:** Information specialist assignment`
  }

  /**
   * Process veteran leads with priority handling and specialized protocols
   */
  processVeteranPriority(
    veteranAnalysis: any,
    leadData: any
  ): {
    priority: 'IMMEDIATE' | 'HIGH' | 'STANDARD'
    processingProtocol: string
    specialAssignment: string
    supportServices: string[]
    expeditedTimeline: string
  } {
    const {
      isVeteran,
      combatVeteran,
      disabledVeteran,
      vaBenefits,
      serviceBranch,
      rank,
      serviceEra,
    } = veteranAnalysis

    // Determine priority level
    let priority: 'IMMEDIATE' | 'HIGH' | 'STANDARD' = 'STANDARD'
    if (disabledVeteran || combatVeteran) {
      priority = 'IMMEDIATE'
    } else if (isVeteran && vaBenefits) {
      priority = 'HIGH'
    } else if (isVeteran) {
      priority = 'HIGH'
    }

    // Generate processing protocol
    const processingProtocol = this.generateVeteranProtocol(
      priority,
      veteranAnalysis
    )

    // Assign specialized personnel
    const specialAssignment = this.assignVeteranLiaison(veteranAnalysis)

    // Determine support services
    const supportServices = this.generateSupportServices(veteranAnalysis)

    // Set expedited timeline
    const expeditedTimeline = this.getExpeditedTimeline(
      priority,
      disabledVeteran
    )

    return {
      priority,
      processingProtocol,
      specialAssignment,
      supportServices,
      expeditedTimeline,
    }
  }

  /**
   * Generate veteran-specific processing protocol
   */
  private generateVeteranProtocol(
    priority: string,
    veteranAnalysis: any
  ): string {
    const { serviceBranch, rank, combatVeteran, disabledVeteran } =
      veteranAnalysis

    if (priority === 'IMMEDIATE') {
      return `[MILITARY_TECH] **IMMEDIATE VETERAN PRIORITY PROTOCOL**
• **Direct commander escalation** - Skip standard intake
• **24-hour response guarantee** 
• **Senior project manager assignment**
• **VA accessibility compliance review**
• **Specialized veteran construction team**
• **Branch: ${serviceBranch}** | **Rank: ${rank}**
• **Combat/Disabled veteran expedited processing**`
    }

    if (priority === 'HIGH') {
      return `🪖 **HIGH PRIORITY VETERAN PROTOCOL**
• **48-hour response commitment**
• **Veteran liaison direct assignment**
• **Military discount pre-approval**
• **Streamlined permit assistance**
• **Branch: ${serviceBranch}** | **Rank: ${rank}**
• **Thank you for your service priority handling**`
    }

    return `[FLAG] **VETERAN RECOGNITION PROTOCOL**
• **Military appreciation pricing**
• **Veteran-friendly scheduling**
• **Service branch acknowledgment**
• **Standard response with veteran respect**`
  }

  /**
   * Assign specialized veteran liaison
   */
  private assignVeteranLiaison(veteranAnalysis: any): string {
    const { serviceBranch, combatVeteran, disabledVeteran, serviceEra } =
      veteranAnalysis

    if (disabledVeteran) {
      return `[MEDICAL_SERVICES] **DISABLED VETERAN SPECIALIST**
• **ADA compliance expert**
• **VA accessibility coordinator**
• **Adaptive construction specialist**
• **Medical equipment accommodation**`
    }

    if (combatVeteran) {
      return `[MILITARY_TECH] **COMBAT VETERAN LIAISON**
• **Fellow combat veteran on staff**
• **Deployment experience understanding**
• **Tactical project planning approach**
• **Military precision execution**`
    }

    const branchSpecialist: { [key: string]: string } = {
      Army: '[ACCOUNT_BALANCE] **ARMY VETERAN SPECIALIST**',
      Navy: '[ANCHOR] **NAVY VETERAN SPECIALIST**',
      Marines: '[SPA] **MARINE VETERAN SPECIALIST**',
      'Air Force': '[FLIGHT] **AIR FORCE VETERAN SPECIALIST**',
      'Coast Guard': '[SAFETY_RING] **COAST GUARD VETERAN SPECIALIST**',
      'Space Force': '[ROCKET_LAUNCH] **SPACE FORCE VETERAN SPECIALIST**',
    }

    return (
      branchSpecialist[serviceBranch] ||
      `[FLAG] **VETERAN SERVICES COORDINATOR**
• **Multi-branch experience**
• **Military culture understanding**
• **Service-focused approach**`
    )
  }

  /**
   * Generate veteran support services
   */
  private generateSupportServices(veteranAnalysis: any): string[] {
    const { disabledVeteran, vaBenefits, combatVeteran, serviceEra } =
      veteranAnalysis
    const services: string[] = []

    // Always include for veterans
    services.push('Military Discount Application')
    services.push('Veteran Appreciation Pricing')
    services.push('Priority Scheduling')

    if (disabledVeteran) {
      services.push('ADA Compliance Consultation')
      services.push('Accessibility Modification Specialists')
      services.push('VA Grant Application Assistance')
      services.push('Adaptive Construction Solutions')
    }

    if (vaBenefits) {
      services.push('VA Home Loan Coordination')
      services.push('VA Disability Rating Accommodations')
      services.push('Benefits Navigation Support')
    }

    if (combatVeteran) {
      services.push('PTSD-Aware Construction Scheduling')
      services.push('Noise Sensitivity Accommodations')
      services.push('Veteran Mental Health Resources')
    }

    if (serviceEra?.includes('GWOT')) {
      services.push('Post-9/11 GI Bill Construction Benefits')
      services.push('Modern Veteran Support Network')
    }

    return services
  }

  /**
   * Get expedited timeline for veteran processing
   */
  private getExpeditedTimeline(
    priority: string,
    disabledVeteran: boolean
  ): string {
    if (priority === 'IMMEDIATE') {
      return `[BOLT] **IMMEDIATE RESPONSE TIMELINE**
• **Initial contact:** Within 4 hours
• **Site assessment:** Within 24 hours  
• **Project proposal:** Within 48 hours
• **Construction start:** Priority scheduling
• **Completion target:** Expedited delivery`
    }

    if (priority === 'HIGH') {
      return `[ROCKET_LAUNCH] **EXPEDITED VETERAN TIMELINE**
• **Initial contact:** Within 24 hours
• **Site assessment:** Within 72 hours
• **Project proposal:** Within 1 week
• **Construction start:** Veteran priority queue
• **Completion target:** Standard plus veteran care`
    }

    return `[FLAG] **VETERAN APPRECIATION TIMELINE**
• **Initial contact:** Within 48 hours
• **Veteran recognition throughout process**
• **Military-style communication and updates**
• **Service-focused project management**`
  }

  /**
   * Smart Form Auto-Completion with Predictive Intelligence
   * Phase 4.4: Advanced form assistance with intelligent field suggestions
   */
  generateSmartFormSuggestions(
    formData: any,
    currentField: string,
    userInput: string
  ): {
    suggestions: string[]
    autoComplete: string
    validation: {
      isValid: boolean
      feedback: string
    }
    militaryContext: {
      isVeteran: boolean
      suggestions: string[]
      discounts: string[]
    }
  } {
    const veteranAnalysis = this.analyzeVeteranStatus(userInput)

    return {
      suggestions: this.generateFieldSuggestions(
        currentField,
        userInput,
        formData
      ),
      autoComplete: this.generateAutoComplete(
        currentField,
        userInput,
        formData
      ),
      validation: this.validateField(currentField, userInput),
      militaryContext: {
        isVeteran: veteranAnalysis.isVeteran,
        suggestions: this.generateVeteranSuggestions(
          currentField,
          veteranAnalysis
        ),
        discounts: this.getApplicableVeteranDiscounts(veteranAnalysis),
      },
    }
  }

  /**
   * Generate intelligent field-specific suggestions
   */
  private generateFieldSuggestions(
    field: string,
    input: string,
    formData: any
  ): string[] {
    const suggestions: string[] = []

    switch (field) {
      case 'projectType':
        if (input.toLowerCase().includes('kitchen')) {
          suggestions.push(
            'Kitchen Remodel - Full Renovation',
            'Kitchen Remodel - Partial Update',
            'Kitchen Addition'
          )
        }
        if (input.toLowerCase().includes('bathroom')) {
          suggestions.push(
            'Bathroom Remodel - Master Bath',
            'Bathroom Remodel - Guest Bath',
            'Bathroom Addition'
          )
        }
        if (input.toLowerCase().includes('commercial')) {
          suggestions.push(
            'Commercial Building - New Construction',
            'Commercial Renovation',
            'Tenant Improvement'
          )
        }
        if (input.toLowerCase().includes('home')) {
          suggestions.push(
            'Custom Home - New Construction',
            'Home Addition',
            'Home Renovation'
          )
        }
        break

      case 'location':
        const triCitiesAreas = [
          'Pasco, WA',
          'Kennewick, WA',
          'Richland, WA',
          'West Richland, WA',
          'Benton City, WA',
          'Prosser, WA',
          'Finley, WA',
          'Burbank, WA',
        ]
        const matchingAreas = triCitiesAreas.filter(area =>
          area.toLowerCase().includes(input.toLowerCase())
        )
        suggestions.push(...matchingAreas)
        break

      case 'budget':
        if (input.includes('$') || input.match(/\d/)) {
          suggestions.push(
            '$10,000 - $25,000 (Minor Renovation)',
            '$25,000 - $50,000 (Major Renovation)',
            '$50,000 - $100,000 (Extensive Remodel)',
            '$100,000 - $250,000 (Addition/New Construction)',
            '$250,000+ (Custom/Commercial Project)'
          )
        }
        break

      case 'timeline':
        suggestions.push(
          'As soon as possible',
          'Within 2-4 weeks',
          'Within 1-3 months',
          'Within 3-6 months',
          'Flexible timeline'
        )
        break
    }

    return suggestions.slice(0, 5) // Limit to 5 suggestions
  }

  /**
   * Generate auto-completion text
   */
  private generateAutoComplete(
    field: string,
    input: string,
    formData: any
  ): string {
    const lowerInput = input.toLowerCase()

    // Project type auto-completion
    const projectMappings: { [key: string]: string } = {
      kit: 'Kitchen Remodel',
      bath: 'Bathroom Remodel',
      home: 'Custom Home',
      add: 'Home Addition',
      comm: 'Commercial Building',
      ten: 'Tenant Improvement',
      ind: 'Industrial Facility',
      med: 'Medical Facility',
      rel: 'Religious Facility',
      gov: 'Government Project',
    }

    // Location auto-completion
    const locationMappings: { [key: string]: string } = {
      pas: 'Pasco, WA',
      ken: 'Kennewick, WA',
      rich: 'Richland, WA',
      west: 'West Richland, WA',
      ben: 'Benton City, WA',
      pro: 'Prosser, WA',
    }

    if (field === 'projectType') {
      for (const [key, value] of Object.entries(projectMappings)) {
        if (lowerInput.includes(key)) {
          return value
        }
      }
    }

    if (field === 'location') {
      for (const [key, value] of Object.entries(locationMappings)) {
        if (lowerInput.includes(key)) {
          return value
        }
      }
    }

    return ''
  }

  /**
   * Validate field input with military-style feedback
   */
  private validateField(
    field: string,
    input: string
  ): { isValid: boolean; feedback: string } {
    switch (field) {
      case 'name':
        if (input.length < 2) {
          return {
            isValid: false,
            feedback:
              '[MILITARY_TECH] Name requires at least 2 characters, soldier!',
          }
        }
        return {
          isValid: true,
          feedback: '[CHECK_CIRCLE] Name confirmed and ready for action!',
        }

      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(input)) {
          return {
            isValid: false,
            feedback: '[EMAIL] Invalid email format - check your intel!',
          }
        }
        return {
          isValid: true,
          feedback:
            '[CHECK_CIRCLE] Email validated and ready for transmission!',
        }

      case 'phone':
        const phoneRegex = /^[\d\s\-\(\)\+\.]{10,}$/
        if (
          !phoneRegex.test(input.replace(/\D/g, '')) ||
          input.replace(/\D/g, '').length < 10
        ) {
          return {
            isValid: false,
            feedback: '[PHONE] Phone number requires 10 digits minimum!',
          }
        }
        return {
          isValid: true,
          feedback:
            '[CHECK_CIRCLE] Phone number confirmed - communications established!',
        }

      case 'projectType':
        if (input.length < 3) {
          return {
            isValid: false,
            feedback:
              '[CONSTRUCTION] Project type requires more detail for mission planning!',
          }
        }
        return {
          isValid: true,
          feedback:
            '[CHECK_CIRCLE] Project type identified - mission parameters set!',
        }

      case 'location':
        if (input.length < 3) {
          return {
            isValid: false,
            feedback:
              '[LOCATION_ON] Location requires more specific coordinates!',
          }
        }
        return {
          isValid: true,
          feedback:
            '[CHECK_CIRCLE] Location confirmed - deployment zone established!',
        }

      case 'budget':
        if (input.length < 3) {
          return {
            isValid: false,
            feedback:
              '[ATTACH_MONEY] Budget estimation needed for resource allocation!',
          }
        }
        return {
          isValid: true,
          feedback:
            '[CHECK_CIRCLE] Budget parameters received - financial logistics confirmed!',
        }

      default:
        return { isValid: true, feedback: '[CHECK_CIRCLE] Field validated!' }
    }
  }

  /**
   * Generate veteran-specific form suggestions
   */
  private generateVeteranSuggestions(
    field: string,
    veteranAnalysis: any
  ): string[] {
    const suggestions: string[] = []

    if (!veteranAnalysis.isVeteran) return suggestions

    switch (field) {
      case 'projectType':
        suggestions.push(
          'Accessible Bathroom Remodel (VA Approved)',
          'Wheelchair Accessible Home Modifications',
          'Military Workshop/Den Addition',
          'Flag Display Area Installation',
          'Security System Integration'
        )
        break

      case 'additionalNotes':
        suggestions.push(
          'Please apply veteran discount',
          'Requires ADA compliance',
          'VA benefits coordination needed',
          'Deployment schedule accommodation',
          'PTSD-friendly construction practices'
        )
        break

      case 'timeline':
        if (veteranAnalysis.combatVeteran || veteranAnalysis.disabledVeteran) {
          suggestions.push(
            'Veteran priority scheduling - ASAP',
            'Between deployments',
            'VA benefits approval pending'
          )
        }
        break
    }

    return suggestions
  }

  /**
   * Get applicable veteran discounts and benefits
   */
  private getApplicableVeteranDiscounts(veteranAnalysis: any): string[] {
    const discounts: string[] = []

    if (!veteranAnalysis.isVeteran) return discounts

    // Base veteran discount
    discounts.push(
      '[MILITARY_TECH] Military Discount: 10% off total project cost'
    )

    if (veteranAnalysis.disabledVeteran) {
      discounts.push(
        '[ACCESSIBLE] Disabled Veteran: 15% off accessibility modifications'
      )
      discounts.push(
        '🏥 VA Grant Assistance: Help applying for adaptation grants'
      )
    }

    if (veteranAnalysis.combatVeteran) {
      discounts.push(
        '[MILITARY_TECH] Combat Veteran: Priority scheduling + 5% additional discount'
      )
    }

    if (veteranAnalysis.vaBenefits) {
      discounts.push('[HOME] VA Home Loan: Specialized financing coordination')
      discounts.push('[ASSIGNMENT] VA Benefits: Compliance assistance included')
    }

    // Service branch specific
    if (veteranAnalysis.serviceBranch) {
      discounts.push(
        `${this.getBranchEmoji(veteranAnalysis.serviceBranch)} ${
          veteranAnalysis.serviceBranch
        } Veteran: Branch pride recognition`
      )
    }

    return discounts
  }

  /**
   * Get branch-specific emoji
   */
  private getBranchEmoji(branch: string): string {
    const branchEmojis: { [key: string]: string } = {
      Army: '[ACCOUNT_BALANCE]',
      Navy: '[ANCHOR]',
      Marines: '[SPA]',
      'Air Force': '[FLIGHT]',
      'Coast Guard': '[SAFETY_RING]',
      'Space Force': '[ROCKET_LAUNCH]',
    }
    return branchEmojis[branch] || '[FLAG]'
  }

  /**
   * Generate predictive form completion based on partial data
   */
  generatePredictiveCompletion(formData: any): {
    suggestions: { field: string; value: string; confidence: number }[]
    autoFillRecommendations: string[]
    nextStepGuidance: string
  } {
    const suggestions: { field: string; value: string; confidence: number }[] =
      []
    const autoFillRecommendations: string[] = []

    // Analyze existing form data for patterns
    if (formData.projectType?.toLowerCase().includes('kitchen')) {
      if (!formData.budget) {
        suggestions.push({
          field: 'budget',
          value: '$25,000 - $50,000',
          confidence: 0.8,
        })
      }
      if (!formData.timeline) {
        suggestions.push({
          field: 'timeline',
          value: 'Within 1-3 months',
          confidence: 0.7,
        })
      }
    }

    if (formData.projectType?.toLowerCase().includes('commercial')) {
      if (!formData.budget) {
        suggestions.push({
          field: 'budget',
          value: '$100,000+',
          confidence: 0.9,
        })
      }
    }

    // Location-based suggestions
    if (formData.location?.includes('Pasco')) {
      autoFillRecommendations.push(
        '[CHECK_CIRCLE] Service area confirmed - full MH Construction services available'
      )
    }

    // Generate next step guidance
    const nextStepGuidance = this.generateNextStepGuidance(formData)

    return {
      suggestions,
      autoFillRecommendations,
      nextStepGuidance,
    }
  }

  /**
   * Generate next step guidance based on form completion
   */
  private generateNextStepGuidance(formData: any): string {
    const completedFields = Object.values(formData).filter(
      value => value && typeof value === 'string' && value.trim().length > 0
    ).length

    const totalFields = Object.keys(formData).length
    const completionPercentage = Math.round(
      (completedFields / totalFields) * 100
    )

    if (completionPercentage < 30) {
      return `[GPS_FIXED] **MISSION STATUS: INITIAL DEPLOYMENT** (${completionPercentage}% complete)
• Focus on essential intel: Name, Contact, Project Type
• Quick deployment recommended for maximum efficiency
• Intelligence gathering phase - build the foundation!`
    }

    if (completionPercentage < 70) {
      return `[BOLT] **MISSION STATUS: TACTICAL ADVANCEMENT** (${completionPercentage}% complete)
• Core mission parameters established
• Advance to secondary objectives: Budget, Timeline, Location
• Strategic intelligence building - maintain momentum!`
    }

    if (completionPercentage < 90) {
      return `[ROCKET_LAUNCH] **MISSION STATUS: FINAL APPROACH** (${completionPercentage}% complete)
• Primary objectives secured - excellent work!
• Complete final details and additional notes
• Mission completion imminent - push forward!`
    }

    return `[MILITARY_TECH] **MISSION STATUS: READY FOR DEPLOYMENT** (${completionPercentage}% complete)
• All critical intel acquired - outstanding execution!
• Form ready for submission and immediate processing
• Victory achieved - deploy when ready, soldier!`
  }

  /**
   * Phase 6.1: Smart Project Recommendations Integration
   * Generate intelligent project recommendations using the advanced recommendation engine
   */
  async generateSmartProjectRecommendations(
    userProfile: UserProfile,
    context?: any
  ): Promise<ProjectRecommendation[]> {
    try {
      return await this.recommendationEngine.generateRecommendations(
        userProfile,
        context
      )
    } catch (error) {
      console.error('Error generating smart recommendations:', error)
      return []
    }
  }

  /**
   * Create user profile from form data and behavior
   */
  createUserProfileFromData(formData: any, sessionData?: any): UserProfile {
    const veteranAnalysis = this.analyzeVeteranStatus(
      `${formData.name || ''} ${formData.message || ''} ${formData.projectType || ''}`
    )

    const preferences = {
      budgetRange: this.extractBudgetRange(formData.budget),
      projectTypes: this.extractProjectTypes(formData.projectType),
      timeframe: formData.timeline || 'planned',
      priorities: this.extractPriorities(formData, veteranAnalysis),
      communicationStyle: veteranAnalysis.isVeteran
        ? ('military' as const)
        : ('casual' as const),
    }

    const profile: UserProfile = {
      id: sessionData?.userId || `user-${Date.now()}`,
      sessionId: sessionData?.sessionId || `session-${Date.now()}`,
      isVeteran: veteranAnalysis.isVeteran,
      veteranDetails: veteranAnalysis.isVeteran
        ? {
            serviceBranch: veteranAnalysis.serviceBranch,
            serviceEra: veteranAnalysis.serviceEra || 'modern',
            combatVeteran: veteranAnalysis.isCombatVeteran,
            disabilityRating: veteranAnalysis.isDisabledVeteran
              ? 30
              : undefined, // Default rating if disabled
            specialPrograms: veteranAnalysis.eligibleForVABenefits
              ? ['va_benefits']
              : [],
            preferredSpecialist: undefined, // Will be assigned during processing
          }
        : undefined,
      preferences,
      behaviorHistory: sessionData?.behaviorHistory || [],
      location: formData.location || undefined,
      previousProjects: sessionData?.previousProjects || [],
    }

    return profile
  }

  /**
   * Track user behavior for recommendations
   */
  trackUserBehavior(userId: string, action: string, data: any): void {
    try {
      const behavior = {
        timestamp: new Date(),
        action,
        page: typeof window !== 'undefined' ? window.location.pathname : '',
        data,
        conversionEvent: ['estimate', 'contact', 'booking'].includes(action),
      }

      this.recommendationEngine.trackUserBehavior(userId, behavior)
    } catch (error) {
      console.error('Error tracking user behavior:', error)
    }
  }

  /**
   * Get recommendation metrics and performance
   */
  getRecommendationMetrics() {
    try {
      return this.recommendationEngine.getMetrics()
    } catch (error) {
      console.error('Error getting recommendation metrics:', error)
      return null
    }
  }

  /**
   * Helper methods for profile creation
   */
  private extractBudgetRange(budget?: string): { min: number; max: number } {
    if (!budget) return { min: 10000, max: 100000 }

    // Extract numbers from budget string
    const numbers = budget.match(/\d+/g)?.map(Number) || []

    if (numbers.length >= 2) {
      return { min: numbers[0], max: numbers[1] }
    } else if (numbers.length === 1) {
      const value = numbers[0]
      if (value < 1000) {
        // Assume it's in thousands
        return { min: value * 1000, max: value * 1500 }
      }
      return { min: value * 0.8, max: value * 1.2 }
    }

    // Default based on budget keywords
    if (budget.toLowerCase().includes('budget'))
      return { min: 10000, max: 35000 }
    if (budget.toLowerCase().includes('premium'))
      return { min: 75000, max: 200000 }
    if (budget.toLowerCase().includes('luxury'))
      return { min: 150000, max: 500000 }

    return { min: 25000, max: 75000 }
  }

  private extractProjectTypes(projectType?: string): string[] {
    if (!projectType) return ['residential']

    const types = []
    const lowerType = projectType.toLowerCase()

    if (lowerType.includes('kitchen')) types.push('kitchen')
    if (lowerType.includes('bathroom')) types.push('bathroom')
    if (lowerType.includes('commercial')) types.push('commercial')
    if (lowerType.includes('renovation')) types.push('renovation')
    if (lowerType.includes('addition')) types.push('addition')
    if (lowerType.includes('deck')) types.push('deck')
    if (lowerType.includes('residential') || lowerType.includes('home'))
      types.push('residential')

    return types.length > 0 ? types : ['residential']
  }

  private extractPriorities(formData: any, veteranAnalysis: any): string[] {
    const priorities = []

    // Veteran-specific priorities
    if (veteranAnalysis.isVeteran) {
      priorities.push('veteran_benefits')
      if (veteranAnalysis.isDisabledVeteran) priorities.push('accessibility')
      if (veteranAnalysis.isCombatVeteran) priorities.push('security')
    }

    // Project-specific priorities
    const message = (formData.message || '').toLowerCase()
    if (message.includes('energy') || message.includes('efficient'))
      priorities.push('energy_efficiency')
    if (message.includes('accessible') || message.includes('disability'))
      priorities.push('accessibility')
    if (message.includes('security') || message.includes('safe'))
      priorities.push('security')
    if (message.includes('fast') || message.includes('quick'))
      priorities.push('speed')
    if (message.includes('quality') || message.includes('premium'))
      priorities.push('quality')

    return priorities
  }

  /**
   * Enhanced Construction Intelligence with Veteran Personalization
   * Phase 6.4-6.6 Integration
   */
  async generateEnhancedVeteranResponse(
    input: string,
    formData?: any,
    sessionId?: string
  ): Promise<{
    standardResponse: string
    veteranExperience?: ComprehensiveVeteranExperience
    enhancedResponse: string
    veteranBenefits?: any
    priorityHandling?: any
    nextSteps: string[]
  }> {
    // Generate standard AI response
    const standardResponse = this.generateResponse(input, formData)

    try {
      // Initialize veteran experience
      const veteranExperience =
        await this.veteranSystem.initializeVeteranExperience(
          input,
          formData,
          sessionId
        )

      // Enhance the response with veteran personalization
      const enhancedResponse = enhanceAIWithVeteranPersonalization(
        standardResponse,
        veteranExperience.profile
      )

      // Extract veteran benefits if applicable
      let veteranBenefits
      let priorityHandling
      if (veteranExperience.profile.isVeteran) {
        veteranBenefits = {
          discounts: veteranExperience.benefitsPackage.discounts,
          vaBenefits: veteranExperience.benefitsPackage.vaBenefits,
          specialOffers:
            veteranExperience.personalizedContent.pricing.specialOffers,
        }

        if (
          veteranExperience.profile.priorityLevel === 'IMMEDIATE' ||
          veteranExperience.profile.priorityLevel === 'HIGH'
        ) {
          priorityHandling = {
            level: veteranExperience.profile.priorityLevel,
            responseTime:
              veteranExperience.benefitsPackage.timeline.initialResponse,
            specialistAssigned:
              veteranExperience.benefitsPackage.specialistAssignment
                .assignedSpecialist,
            emergencyAvailable:
              veteranExperience.benefitsPackage.timeline.emergency.available,
          }
        }
      }

      // Generate enhanced next steps
      const nextSteps = this.generateEnhancedNextSteps(veteranExperience)

      return {
        standardResponse,
        veteranExperience,
        enhancedResponse: enhancedResponse.veteranEnhanced
          ? this.formatEnhancedResponse(enhancedResponse, veteranExperience)
          : standardResponse,
        veteranBenefits,
        priorityHandling,
        nextSteps,
      }
    } catch (error) {
      // Fallback to standard response if veteran system fails
      console.error('Veteran personalization error:', error)

      return {
        standardResponse,
        enhancedResponse: standardResponse,
        nextSteps: [
          'Our team will review your request and contact you within 48 hours',
          'Free consultation will be scheduled at your convenience',
          'Detailed project proposal will be provided',
        ],
      }
    }
  }

  /**
   * Format enhanced response with veteran personalization
   */
  private formatEnhancedResponse(
    enhancedResponse: any,
    veteranExperience: ComprehensiveVeteranExperience
  ): string {
    const profile = veteranExperience.profile
    const content = veteranExperience.personalizedContent

    let response = `${content.greeting}\n\n`

    // Add veteran-specific messaging
    if (profile.isVeteran) {
      response += `${content.messaging.respectMessage}\n\n`

      // Priority handling message
      if (profile.priorityLevel === 'IMMEDIATE') {
        response += `[EMERGENCY] **IMMEDIATE PRIORITY STATUS ACTIVATED**\n`
        response += `Your status as a ${profile.disabledVeteran ? 'disabled' : 'combat'} veteran qualifies you for our highest priority response within 4 hours.\n\n`
      } else if (profile.priorityLevel === 'HIGH') {
        response += `[BOLT] **HIGH PRIORITY STATUS ACTIVATED**\n`
        response += `As a veteran, you receive priority response within 24 hours and expedited project scheduling.\n\n`
      }

      // Discount information
      if (content.pricing.baseDiscount > 0) {
        response += `[ATTACH_MONEY] **VETERAN BENEFITS ACTIVATED**\n`
        response += `${content.pricing.totalSavings} automatically applied to your project.\n`
        response += `Discounts include: ${content.pricing.additionalDiscounts.map(d => d.description).join(', ')}\n\n`
      }

      // Specialist assignment
      const specialist =
        veteranExperience.benefitsPackage.specialistAssignment
          .assignedSpecialist
      response += `[PERSON] **VETERAN SPECIALIST ASSIGNED**\n`
      response += `${specialist.name} (${specialist.title}) - ${specialist.branch} Veteran\n`
      response += `Specializations: ${specialist.specializations.join(', ')}\n\n`

      // Branch-specific message
      if (content.messaging.branchSpecificMessage) {
        response += `${content.messaging.branchSpecificMessage}\n\n`
      }
    }

    // Add standard AI response content
    response += enhancedResponse.message || enhancedResponse

    // Add veteran notifications
    if (veteranExperience.notifications.length > 0) {
      response += `\n\n[ASSIGNMENT] **IMPORTANT NOTIFICATIONS:**\n`
      veteranExperience.notifications.slice(0, 3).forEach(notification => {
        const priorityIcon =
          notification.priority === 'urgent'
            ? '[EMERGENCY]'
            : notification.priority === 'high'
              ? '[BOLT]'
              : notification.priority === 'medium'
                ? '📌'
                : '[INFO]'
        response += `${priorityIcon} ${notification.title}: ${notification.message}\n`
      })
    }

    return response
  }

  /**
   * Generate enhanced next steps with veteran considerations
   */
  private generateEnhancedNextSteps(
    veteranExperience: ComprehensiveVeteranExperience
  ): string[] {
    const profile = veteranExperience.profile
    const steps: string[] = []

    if (!profile.isVeteran) {
      return [
        'Our team will review your request and contact you within 48 hours',
        'Free consultation will be scheduled at your convenience',
        'Detailed project proposal will be provided',
      ]
    }

    // Veteran-specific next steps
    if (profile.priorityLevel === 'IMMEDIATE') {
      steps.push(
        '[EMERGENCY] IMMEDIATE: Veteran specialist will contact you within 4 hours'
      )
      steps.push('Emergency accessibility assessment will be prioritized')
      if (profile.disabledVeteran) {
        steps.push('VA benefits coordination will be initiated immediately')
      }
    } else if (profile.priorityLevel === 'HIGH') {
      steps.push(
        '[BOLT] PRIORITY: Veteran specialist will contact you within 24 hours'
      )
      steps.push('Priority project scheduling will be arranged')
    } else {
      steps.push('[FLAG] Veteran specialist will contact you within 48 hours')
    }

    // Benefits-related steps
    if (profile.disabledVeteran) {
      steps.push('Free accessibility compliance assessment will be scheduled')
      steps.push('VA grant application assistance will be provided')
    }

    if (profile.combatVeteran) {
      steps.push('Security enhancement consultation will be offered')
    }

    // Standard steps
    steps.push(
      'Veteran discounts will be automatically applied to your estimate'
    )
    steps.push(
      'Detailed project proposal with veteran benefits will be provided'
    )
    steps.push('Your assigned specialist will coordinate all veteran services')

    return steps
  }

  /**
   * Get veteran discount estimate for a project
   */
  calculateVeteranDiscountEstimate(
    baseEstimate: number,
    veteranProfile?: VeteranProfile
  ): {
    originalAmount: number
    discountedAmount: number
    totalSavings: number
    discountBreakdown: string[]
  } {
    if (!veteranProfile || !veteranProfile.isVeteran) {
      return {
        originalAmount: baseEstimate,
        discountedAmount: baseEstimate,
        totalSavings: 0,
        discountBreakdown: [],
      }
    }

    // Use the veteran benefits system to calculate discounts
    const benefitsEngine = VeteranBenefitsAutomation.getInstance()
    const discountResult = benefitsEngine.applyAutomaticDiscounts(
      veteranProfile,
      baseEstimate
    )

    return {
      originalAmount: baseEstimate,
      discountedAmount: discountResult.discountedAmount,
      totalSavings: discountResult.totalSavings,
      discountBreakdown: discountResult.appliedDiscounts.map(
        (d: any) => `${d.name}: ${d.percentage}% (${d.description})`
      ),
    }
  }

  /**
   * Enhanced form processing with veteran personalization
   */
  async processEnhancedForm(
    formType: 'contact' | 'estimate' | 'booking',
    formData: any,
    sessionId?: string
  ): Promise<{
    response: any
    veteranHandling?: any
    discounts?: any
    nextSteps: string[]
  }> {
    try {
      // Process with veteran system if session exists
      if (sessionId) {
        const result = this.veteranSystem.processVeteranFormSubmission(
          sessionId,
          formType,
          formData
        )

        return {
          response: result.response,
          veteranHandling: result.priorityHandling,
          discounts: result.veteranBenefits,
          nextSteps: result.nextSteps,
        }
      }

      // Fallback to standard processing
      return {
        response: this.generateResponse(
          `${formData.name || ''} ${formData.message || ''} ${formData.projectType || ''}`,
          formData
        ),
        nextSteps: [
          'Our team will review your request and contact you within 48 hours',
          'Free consultation will be scheduled',
          'Detailed proposal will be provided',
        ],
      }
    } catch (error) {
      console.error('Enhanced form processing error:', error)

      // Fallback to standard processing
      return {
        response: this.generateResponse(
          `${formData.name || ''} ${formData.message || ''} ${formData.projectType || ''}`,
          formData
        ),
        nextSteps: [
          'Our team will review your request and contact you within 48 hours',
          'Free consultation will be scheduled',
          'Detailed proposal will be provided',
        ],
      }
    }
  }
}

export const militaryConstructionAI = new MilitaryConstructionAI()
